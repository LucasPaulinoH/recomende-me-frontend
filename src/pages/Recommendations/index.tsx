import { useState } from "react";
import useFetchRecommendations from "../../hooks/useFetchRecommendations";
import {
  LoggedContainer,
  RECOMMENDATIONS_CARD_GRID,
} from "../../styles/shared";
import RecommendationCard from "@/components/RecommendationCard";
import SearchBar from "@/components/SearchBar";

import { Book } from "lucide-react";
import { Clapperboard } from "lucide-react";
import { Music } from "lucide-react";

import { RecommendationType } from "@/types/RecommendationType";
import useSelectedType from "@/hooks/useSelectedType";
import {
  BOOK_ICON_COLOR,
  MOVIE_ICON_COLOR,
  SONG_ICON_COLOR,
} from "@/components/RecommendationTypeCard/styles";
import {
  LOADING_RECOMMENDATIONS_LABEL,
  showTypeLabel,
} from "@/utils/stringUtils";
import NotFound from "@/components/NotFound";
import BackButton from "@/components/BackButton";

const Recommendations = () => {
  const { recommendations } = useFetchRecommendations();

  const [search, setSearch] = useState("");

  const filteredRecommendations = recommendations
    ?.toArray()
    .filter((recommendation) =>
      recommendation.title.toLowerCase().includes(search.toLowerCase())
    );

  const { selectedType } = useSelectedType();

  return (
    <LoggedContainer>
      <div className="flex flex-col items-center gap-5">
        <div><SearchBar search={search} setSearch={setSearch} /></div>

        {recommendations && recommendations.size() > 0 && search.length > 0 && (
          <p className="font-bold">
            Resultados encontrados ({filteredRecommendations?.length}):{" "}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-10 w-full flex-1 items-center">
        <div className="flex items-center gap-2">
          {selectedType === RecommendationType.BOOK ? (
            <Book color={BOOK_ICON_COLOR} />
          ) : selectedType === RecommendationType.MOVIE ? (
            <Clapperboard color={MOVIE_ICON_COLOR} />
          ) : (
            <Music color={SONG_ICON_COLOR} />
          )}
          <h1 className="font-bold text-lg">{`Recomendações de ${showTypeLabel(
            selectedType
          ).toLowerCase()}s`}</h1>
        </div>

        {!filteredRecommendations ? (
          <p>{LOADING_RECOMMENDATIONS_LABEL}</p>
        ) : filteredRecommendations?.length > 0 ? (
          <div className={RECOMMENDATIONS_CARD_GRID}>
            {filteredRecommendations?.map((recommendation) => (
              <div className="max-w-[300px]">
                <RecommendationCard
                  recommendation={recommendation}
                  key={recommendation.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center mt-4">
            <NotFound label="Nenhum resultado encontrado" />
          </div>
        )}
      </div>
    </LoggedContainer>
  );
};

export default Recommendations;
