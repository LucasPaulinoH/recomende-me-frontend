import { RecommendationType } from "../../types/RecommendationType";
import { Book } from "lucide-react";
import { Clapperboard } from "lucide-react";
import { Music } from "lucide-react";

import {
  BOOK_ICON_COLOR,
  ICON_STYLES,
  MOVIE_ICON_COLOR,
  SONG_ICON_COLOR,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { LOADING_LABEL } from "@/utils/stringUtils";

interface RecommendationTypeCardProps {
  type: RecommendationType;
  recommendationsQuantity: number;
}

const RecommendationTypeCard = (props: RecommendationTypeCardProps) => {
  const { type, recommendationsQuantity } = props;
  const navigate = useNavigate();

  const recommendationsQuantityLabel = `${recommendationsQuantity} ${
    recommendationsQuantity !== 1 ? "recomendações" : "recomendação"
  }`;

  const handleClick = () => navigate(`/recommendations?type=${type}`);

  const typeLabel =
    type === RecommendationType.BOOK
      ? "Livros"
      : type === RecommendationType.MOVIE
      ? "Filmes"
      : "Músicas";

  return (
    <div
      className="border rounded-[10px] p-10 flex flex-row items-center gap-8 cursor-pointer hover:scale-110 transition-all"
      onClick={handleClick}
    >
      {type === RecommendationType.BOOK ? (
        <Book color={BOOK_ICON_COLOR} className={ICON_STYLES} />
      ) : type === RecommendationType.MOVIE ? (
        <Clapperboard color={MOVIE_ICON_COLOR} className={ICON_STYLES} />
      ) : (
        <Music color={SONG_ICON_COLOR} className={ICON_STYLES} />
      )}

      <div>
        <h1 className="font-bold">{typeLabel}</h1>
        <p>{recommendationsQuantity !== undefined ? recommendationsQuantityLabel : LOADING_LABEL}</p>
      </div>
    </div>
  );
};

export default RecommendationTypeCard;
