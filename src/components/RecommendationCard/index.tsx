import { Recommendation } from "@/services/Recommendation/Recommendation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleDeleteRecommendation, handleUpdateRating } from "./functions";
import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import { Heart } from "lucide-react";
import { useState } from "react";
import { RecommendationType } from "@/types/RecommendationType";
import RecommendationTypeBadge from "../RecommendationTypeBadge";
import { showAuthors } from "../Autocomplete/functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PsychologicalConcept } from "@/types/PsychologicalConcept";
import unknownCover from "@/assets/unknown-cover.png"

interface RecommendationCardProps {
  recommendation: Recommendation;
  hideRecommendedBy?: boolean;
  editMode?: boolean;
  refetch?: VoidFunction;
  showTypeCard?: boolean;
}

const RecommendationCard = (props: RecommendationCardProps) => {
  const { recommendation, hideRecommendedBy, editMode, refetch, showTypeCard } =
    props;

  const [recommendationRatings, setRecommendationRatings] = useState(
    recommendation.ratings
  );

  const { currentUser } = FIREBASE_AUTH;

  const hasRated = () => recommendationRatings.includes(currentUser!.uid);

  const RatingButton = () => (
    <Button
      className={`w-full cursor-pointer ${
        hasRated() ? "bg-[#CC2B52]" : ""
      } hover:bg-`}
      onClick={() =>
        handleUpdateRating(recommendation.id, currentUser!.uid).then(
          (ratingsResponse) => setRecommendationRatings(ratingsResponse!)
        )
      }
    >
      <Heart className={hasRated() ? "fill-white" : ""} />
      {recommendationRatings.length}
    </Button>
  );

  const isRecommendationFromCurrentUser = () =>
    currentUser?.uid === recommendation.userId;

  const renderRecommendationCard = (
    <div className="flex flex-col gap-2">
      <img
        src={recommendation.cover || unknownCover}
        alt={`${recommendation.title} cover`}
        className="h-[350px] object-fill"
        loading="lazy"
      />

      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-justify">{recommendation.title}</h1>

        {recommendation.type !== RecommendationType.MOVIE && (
          <p className="opacity-[.45]">{showAuthors(recommendation.authors)}</p>
        )}

        {showTypeCard && <RecommendationTypeBadge type={recommendation.type} />}
      </div>

      {!hideRecommendedBy && (
        <p className="text-sm">{`Recomendado por ${
          isRecommendationFromCurrentUser() ? "você" : recommendation.username
        }`}</p>
      )}
    </div>
  );

  return (
    <Dialog>
      <div className="flex flex-col gap-2 cursor-pointer hover:scale-[1.05] transition-all">
        {editMode && (
          <Button
            className="cursor-pointer"
            onClick={() =>
              handleDeleteRecommendation(recommendation.id).then(
                () => refetch && refetch()
              )
            }
            variant="ghost"
          >
            <Trash2 className="text-destructive" />
          </Button>
        )}

        <DialogTrigger asChild>{renderRecommendationCard}</DialogTrigger>

        {!isRecommendationFromCurrentUser() ? (
          <RatingButton />
        ) : (
          <Button variant="ghost" className="hover:bg-">
            <Heart />
            {recommendationRatings.length}
          </Button>
        )}
      </div>

      <DialogContent className="max-w-full max-h-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {recommendation.title.toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            {recommendation.type !== RecommendationType.MOVIE && (
              <p>{showAuthors(recommendation.authors)}</p>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-row gap-10">
          <img
            src={recommendation.cover || unknownCover}
            alt={`${recommendation.title} cover`}
            className="max-h-[350px] w-[50%] object-fill"
            loading="lazy"
          />

          <div className="w-[50%] flex flex-col gap-2">
            <div>
              <p className="text-sm font-bold">Conceito psicológico</p>
              <p>{PsychologicalConcept[recommendation.psychologicalConcept]}</p>
            </div>

            <div className="max-w-full">
              <p className="text-sm font-bold">Impacto psicológico </p>
              <p>{recommendation.psychologicalImpact}</p>
            </div>

            {!hideRecommendedBy && (
              <p className="text-sm my-4">{`Recomendado por ${
                isRecommendationFromCurrentUser()
                  ? "você"
                  : recommendation.username
              }`}</p>
            )}

            <div className="mt-4">
              {recommendation.userId !== currentUser?.uid ? (
                <RatingButton />
              ) : (
                <div className="flex gap-2 items-center">
                  <Heart />
                  {recommendationRatings.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationCard;
