import { RecommendationType } from "../../types/RecommendationType";
import { FaBook } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { SiApplemusic } from "react-icons/si";
import {
  BOOK_ICON_COLOR,
  ICON_STYLES,
  MOVIE_ICON_COLOR,
  SONG_ICON_COLOR,
} from "./styles";
import { useNavigate } from "react-router-dom";

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

  const handleClick = () => {
    localStorage.setItem("category", JSON.stringify(type));
    navigate("/recommendations");
  };

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
        <FaBook fill={BOOK_ICON_COLOR} className={ICON_STYLES} />
      ) : type === RecommendationType.MOVIE ? (
        <MdMovie fill={MOVIE_ICON_COLOR} className={ICON_STYLES} />
      ) : (
        <SiApplemusic fill={SONG_ICON_COLOR} className={ICON_STYLES} />
      )}

      <div>
        <h1 className="font-bold">{typeLabel}</h1>
        <p>{recommendationsQuantityLabel}</p>
      </div>
    </div>
  );
};

export default RecommendationTypeCard;
