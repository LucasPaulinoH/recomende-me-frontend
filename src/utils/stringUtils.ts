import { RecommendationType } from "@/types/RecommendationType";

export const showTypeLabel = (type: RecommendationType) =>
  type === RecommendationType.BOOK
    ? "LIVRO"
    : type === RecommendationType.MOVIE
    ? "FILME"
    : "MÚSICA";
