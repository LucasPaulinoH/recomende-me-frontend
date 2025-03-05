import { Recommendation } from "@/services/Recommendation/Recommendation";
import { PsychologicalConcept } from "@/types/PsychologicalConcept";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleDeleteRecommendation, handleUpdateRating } from "./functions";
import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import { Heart } from "lucide-react";
import { useState } from "react";

interface RecommendationCardProps {
  recommendation: Recommendation;
  hideRecommendedBy?: boolean;
  editMode?: boolean;
  refetch?: VoidFunction;
}

const RecommendationCard = (props: RecommendationCardProps) => {
  const { recommendation, hideRecommendedBy, editMode, refetch } = props;

  const [recommendationRatings, setRecommendationRatings] = useState(
    recommendation.ratings
  );

  const { currentUser } = FIREBASE_AUTH;

  const hasMoreThanAnAuthor = (authors: string[]) => authors.length > 1;

  const hasUserRated = () => recommendationRatings.includes(currentUser!.uid);

  return (
    <div className="flex flex-col gap-5 cursor-pointer hover:scale-110 transition-all">
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

      <img
        src={recommendation.cover}
        alt={`${recommendation.title} cover`}
        className="w-[250px] h-[300px] object-fill"
        loading="lazy"
      />

      <div>
        <h1 className="font-bold">{recommendation.title}</h1>
        <p>
          {hasMoreThanAnAuthor(recommendation.authors)
            ? "Autores: "
            : "Autor: "}
          {recommendation.authors}
        </p>
        {!hideRecommendedBy && (
          <p>{`Recomendado por: ${recommendation.username}`}</p>
        )}
        <p>{`Conceito psicológico: ${
          PsychologicalConcept[
            // @ts-expect-error expecting any type
            recommendation.psychologicalConcept as keyof typeof PsychologicalConcept
          ]
        }`}</p>
      </div>

      {recommendation.userId !== currentUser?.uid ? (
        <Button
          className="cursor-pointer"
          onClick={() =>
            handleUpdateRating(recommendation.id, currentUser!.uid).then(
              (ratingsResponse) => setRecommendationRatings(ratingsResponse!)
            )
          }
        >
          <Heart className={hasUserRated() ? "fill-[#fff]" : ""} />
          {recommendationRatings.length}
        </Button>
      ) : (
        <Button variant="ghost">
          <Heart />
          {recommendationRatings.length}
        </Button>
      )}
    </div>
  );
};

export default RecommendationCard;
