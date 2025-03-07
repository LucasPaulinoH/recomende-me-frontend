import { useRef, useState } from "react";
import { LoggedContainer } from "../../styles/shared";
import { FIREBASE_AUTH } from "../../utils/firebaseConfig";
import useSelectedType from "@/hooks/useSelectedType";
import { showTypeLabel } from "@/utils/stringUtils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PsychologicalConcept } from "@/types/PsychologicalConcept";
import { handleAddRecommendation } from "./functions";
import { NewRecommendationDTO } from "@/services/Recommendation/Recommendation";
import { useNavigate } from "react-router-dom";
import useSearchRecommendationMedia from "@/hooks/useSearchRecommendationMedia";
import Autocomplete from "@/components/Autocomplete";
import { Book, Clapperboard, Music, Plus } from "lucide-react";
import Media from "@/types/SelectedMedia";
import { RecommendationType } from "@/types/RecommendationType";
import {
  BOOK_ICON_COLOR,
  MOVIE_ICON_COLOR,
  SONG_ICON_COLOR,
} from "@/components/RecommendationTypeCard/styles";

const AddRecommendation = () => {
  const navigate = useNavigate();

  const [psychologicalConcept, setPsychologicalConcept] =
    useState<PsychologicalConcept>();
  const psychologicalImpactRef = useRef<HTMLTextAreaElement>(null);

  const { currentUser } = FIREBASE_AUTH;
  const { selectedType } = useSelectedType();

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const [search, setSearch] = useState("");

  const { results } = useSearchRecommendationMedia(selectedType, search);

  const handleAddRecommendationClick = async () => {
    if (!psychologicalConcept || search.replace(" ", "").length === 0) return;

    handleAddRecommendation({
      title: selectedMedia?.title,
      type: selectedType,
      psychologicalConcept: psychologicalConcept,
      psychologicalImpact: psychologicalImpactRef?.current?.value,
      userId: currentUser?.uid,
      username: currentUser?.displayName,
      authors: selectedMedia?.authors,
      cover: selectedMedia?.cover,
    } as NewRecommendationDTO).then(() => navigate(`/recommendations/my`));
  };

  return (
    <LoggedContainer>
      <div className="w-full flex flex-col items-center justify-center max-w-[400px]">
        <div className="flex items-center gap-2">
          {selectedType === RecommendationType.BOOK ? (
            <Book color={BOOK_ICON_COLOR} />
          ) : selectedType === RecommendationType.MOVIE ? (
            <Clapperboard color={MOVIE_ICON_COLOR} />
          ) : (
            <Music color={SONG_ICON_COLOR} />
          )}
          <h1 className="font-bold">{`Nova recomendação de ${showTypeLabel(
            selectedType
          ).toLowerCase()}`}</h1>
        </div>
        <div className="max-w-[400px] w-full flex flex-col gap-5 p-10">
          <Autocomplete
            search={search}
            setSearch={setSearch}
            results={results}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
          />

          <Select
            onValueChange={(e: PsychologicalConcept) =>
              setPsychologicalConcept(e)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Conceito psicológico *" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PsychologicalConcept).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            className="border max-h-[140px] "
            placeholder="Impacto psicológico *"
            ref={psychologicalImpactRef}
            maxLength={255}
          />

          <Button
            className="cursor-pointer"
            type="submit"
            onClick={handleAddRecommendationClick}
          >
            <Plus />
            Adicionar recomendação
          </Button>
        </div>
      </div>
    </LoggedContainer>
  );
};

export default AddRecommendation;
