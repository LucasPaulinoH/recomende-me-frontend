import { useRef, useState } from "react";
import { PAGE_CONTAINER } from "../../styles/shared";
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

const AddRecommendation = () => {
  const navigate = useNavigate();

  const [psychologicalConcept, setPsychologicalConcept] =
    useState<PsychologicalConcept>();
  const psychologicalImpactRef = useRef(null);

  const { currentUser } = FIREBASE_AUTH;
  const { selectedType } = useSelectedType();

  const { title, setTitle, results } =
    useSearchRecommendationMedia(selectedType);

  const handleAddRecommendationClick = async () => {
    handleAddRecommendation({
      title,
      type: selectedType,
      psychologicalConcept: psychologicalConcept,
      psychologicalImpact: psychologicalImpactRef.current.value,
      userId: currentUser?.uid,
      username: currentUser?.displayName,
    } as NewRecommendationDTO).then(() =>
      navigate(`recommendations?type=${selectedType}`)
    );
  };

  return (
    <div className={PAGE_CONTAINER}>
      <h1>Nova recomendação de {showTypeLabel(selectedType).toLowerCase()}</h1>
      <div>
        <Autocomplete
          value={title}
          setValue={setTitle}
          placeholder="Livro..."
          results={results}
        />
        <Select
          onValueChange={(e: PsychologicalConcept) =>
            setPsychologicalConcept(e)
          }
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Conceito psicológico *" />
          </SelectTrigger>
          <SelectContent className="bg-[#242424]">
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
          Adicionar recomendação
        </Button>
      </div>
    </div>
  );
};

export default AddRecommendation;
