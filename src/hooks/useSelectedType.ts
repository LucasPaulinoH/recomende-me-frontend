import { useSearchParams } from "react-router-dom";
import { RecommendationType } from "../types/RecommendationType";

const useSelectedType = () => {
  return {
    selectedType:
      (useSearchParams()[0].get("type") as RecommendationType) ??
      RecommendationType.BOOK,
  };
};

export default useSelectedType;
