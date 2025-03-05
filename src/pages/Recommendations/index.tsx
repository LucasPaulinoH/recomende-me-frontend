import { useState } from "react";
import useFetchRecommendations from "../../hooks/useFetchRecommendations";
import {
  LoggedContainer,
  RECOMMENDATIONS_CARD_GRID,
} from "../../styles/shared";
import RecommendationCard from "@/components/RecommendationCard";
import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";

const Recommendations = () => {
  const { recommendations } = useFetchRecommendations();

  const [search, setSearch] = useState("");

  const filteredRecommendations = recommendations?.filter((recommendation) =>
    recommendation.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LoggedContainer>
      <div className="flex flex-col items-center gap-5">
        <SearchBar search={search} setSearch={setSearch} />

        {search.length > 0 && (
          <p className="font-bold">
            Resultados encontrados ({filteredRecommendations?.length}):{" "}
          </p>
        )}
      </div>
      {filteredRecommendations && filteredRecommendations?.length > 0 ? (
        <div className={RECOMMENDATIONS_CARD_GRID}>
          {filteredRecommendations?.map((recommendation) => (
            <RecommendationCard recommendation={recommendation} />
          ))}
        </div>
      ) : (
        <div className="w-full flex-1"></div>
      )}
    </LoggedContainer>
  );
};

export default Recommendations;
