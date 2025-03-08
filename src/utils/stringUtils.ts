import { RecommendationType } from "@/types/RecommendationType";

export const showTypeLabel = (type: RecommendationType) =>
  type === RecommendationType.BOOK
    ? "LIVRO"
    : type === RecommendationType.MOVIE
    ? "FILME"
    : "MÚSICA";

export const LOADING_LABEL = "Carregando...";

export const LOADING_RECOMMENDATIONS_LABEL = "Carregando recomendações...";
