import { useRef, useState } from "react";
import { LoggedContainer, UNLOGGED_CONTAINER } from "../../styles/shared";
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
import { Plus } from "lucide-react";

const AddRecommendation = () => {
  const navigate = useNavigate();

  const [psychologicalConcept, setPsychologicalConcept] =
    useState<PsychologicalConcept>();
  const psychologicalImpactRef = useRef<HTMLTextAreaElement>(null);

  const { currentUser } = FIREBASE_AUTH;
  const { selectedType } = useSelectedType();

  const { search, setSearch, results, selectedMedia, setSelectedMedia } =
    useSearchRecommendationMedia(selectedType);

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
      <div className="flex flex-col items-center justify-center ">
        <h1 className="font-bold">
          Nova recomendação de {showTypeLabel(selectedType).toLowerCase()}
        </h1>
        <div className="max-w-[400px] w-full flex flex-col gap-5 p-10">
          <Autocomplete
            value={search}
            setValue={setSearch}
            placeholder="Livro..."
            results={results}
            setSelectedMedia={setSelectedMedia}
          />

          <Select
            onValueChange={(e: PsychologicalConcept) =>
              setPsychologicalConcept(e)
            }
          >
            <SelectTrigger className="w-[280px]">
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
            className="border"
            placeholder="Impacto psicológico *"
            ref={psychologicalImpactRef}
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
