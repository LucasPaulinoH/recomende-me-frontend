import { useState } from "react";
import useFetchRecommendations from "../../hooks/useFetchRecommendations";
import { PAGE_CONTAINER } from "../../styles/shared";
import { PsychologicalConcept } from "../../types/PsychologicalConcept";

const Recommendations = () => {
  const { recommendations } = useFetchRecommendations();

  localStorage.clear();

  const [search, setSearch] = useState("");

  const filteredRecommendations = recommendations?.filter((recommendation) =>
    recommendation.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={PAGE_CONTAINER}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
        className="border "
        placeholder="Busque recomendação..."
      />

      {filteredRecommendations?.map((recommendation, index) => (
        <div key={index}>
          <h1>{recommendation.title}</h1>
          <p>{`Recomendado por: ${recommendation.userNickname}`}</p>
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
