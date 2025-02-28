import { useEffect, useState } from "react";
import recommendationApi from "../services/Recommendation";

const useFetchRecommendationsQuantity = () => {
  const [recommendationsQuantity, setRecommendationsQuantity] = useState<
    number[]
  >([]);

  const fetchRecommendationsQuantity = async () => {
    try {
      const quantityResponse =
        await recommendationApi.getRecommendationsQuantityByType();
      setRecommendationsQuantity(quantityResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecommendationsQuantity();
  }, []);

  return { recommendationsQuantity };
};

export default useFetchRecommendationsQuantity;
