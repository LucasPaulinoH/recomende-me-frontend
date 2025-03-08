import useFetchMyRecommendations from "@/hooks/useFetchMyRecommendations";
import {
  LoggedContainer,
  RECOMMENDATIONS_CARD_GRID,
} from "../../styles/shared";
import RecommendationCard from "@/components/RecommendationCard";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import NotFound from "@/components/NotFound";

const MyRecommendations = () => {
  const { myRecommendations, fetchMyRecommendations } =
    useFetchMyRecommendations();

  const [search, setSearch] = useState("");

  const filteredRecommendations = myRecommendations
    ?.toArray()
    .filter((recommendation) =>
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

      <div className="flex flex-col gap-10 w-full flex-1 items-center">
        <h1 className="font-bold text-lg">Minhas recomendações</h1>
        {!filteredRecommendations ? null : filteredRecommendations?.length >
          0 ? (
          <div className={RECOMMENDATIONS_CARD_GRID}>
            {filteredRecommendations?.map((recommendation) => (
              <RecommendationCard
                recommendation={recommendation}
                hideRecommendedBy
                editMode
                refetch={fetchMyRecommendations}
                showTypeCard
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center mt-4">
            <NotFound label="Nenhuma recomendação" />
          </div>
        )}
      </div>
    </LoggedContainer>
  );
};

export default MyRecommendations;
