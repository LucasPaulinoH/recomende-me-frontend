import recommendationApi from "../services/Recommendation";
import { useQuery } from "@tanstack/react-query";

const useFetchRecommendationsQuantity = () => {
  const fetchRecommendationsQuantity = async () => {
    const quantityResponse =
      await recommendationApi.getRecommendationsQuantityByType();
    return quantityResponse;
  };

  const { data: recommendationsQuantity = [] } = useQuery({
    queryKey: ["recommendationsQuantity"],
    queryFn: fetchRecommendationsQuantity,

    retry: 2,
  });

  return { recommendationsQuantity };
};

export default useFetchRecommendationsQuantity;
