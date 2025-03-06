import { RecommendationType } from "@/types/RecommendationType";
import { Badge } from "../ui/badge";
import { showTypeLabel } from "@/utils/stringUtils";
import {
  BOOK_ICON_COLOR,
  MOVIE_ICON_COLOR,
  SONG_ICON_COLOR,
} from "../RecommendationTypeCard/styles";

interface RecommendationTypeBadge {
  type: RecommendationType;
}

const RecommendationTypeBadge = (props: RecommendationTypeBadge) => {
  const { type } = props;

  const backgroundColor =
    type === RecommendationType.BOOK
      ? BOOK_ICON_COLOR
      : type === RecommendationType.MOVIE
      ? MOVIE_ICON_COLOR
      : SONG_ICON_COLOR;

  return <Badge style={{ backgroundColor }}>{showTypeLabel(type)}</Badge>;
};

export default RecommendationTypeBadge;
