import { useState } from "react";
import useFetchRecommendations from "../../hooks/useFetchRecommendations";
import { PAGE_CONTAINER } from "../../styles/shared";
import { PsychologicalConcept } from "../../types/PsychologicalConcept";
import useSelectedType from "../../hooks/useSelectedType";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { showTypeLabel } from "@/utils/stringUtils";

const Recommendations = () => {
  const navigate = useNavigate();

  const { recommendations } = useFetchRecommendations();

  const { selectedType } = useSelectedType();

  const [search, setSearch] = useState("");

  const filteredRecommendations = recommendations?.filter((recommendation) =>
    recommendation.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClick = () =>
    navigate(`/recommendations/add?type=${selectedType}`);

  return (
    <div className={PAGE_CONTAINER}>
      <h1>{`Recomendações de ${showTypeLabel(
        selectedType
      ).toLowerCase()}s`}</h1>
      <div>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busque recomendação..."
        />
        <Button className="cursor-pointer" onClick={handleAddClick}>
          <Plus /> Nova recomendação
        </Button>
      </div>

      {filteredRecommendations?.map((recommendation, index) => (
        <div key={index}>
          <h1>{recommendation.title}</h1>
          <p>{`Recomendado por: ${recommendation.username}`}</p>
          <p>{`Conceito psicológico: ${
            PsychologicalConcept[
              // @ts-expect-error expecting any type
              recommendation.psychologicalConcept as keyof typeof PsychologicalConcept
            ]
          }`}</p>
          <p>{recommendation.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
