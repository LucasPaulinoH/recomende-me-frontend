import recommendationApi from "../services/Recommendation";
import useSelectedType from "./useSelectedType";
import { getRecommendationsListFromRecommendationsArray } from "@/utils/data-structures/linkedList";
import { useQuery } from "@tanstack/react-query";

const useFetchRecommendations = () => {
  const { selectedType } = useSelectedType();

  const fetchRecommendations = async () => {
    const recommendationsResponse =
      await recommendationApi.getAllRecommendationsFromAType(selectedType);

    return getRecommendationsListFromRecommendationsArray(
      recommendationsResponse
    );
  };

  const { data: recommendations } = useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendations,
    retry: 2,
  });

  return { recommendations };
};

export default useFetchRecommendations;
