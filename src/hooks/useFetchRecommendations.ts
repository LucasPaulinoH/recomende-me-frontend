import { useEffect, useState } from "react";
import { Recommendation } from "../services/Recommendation/Recommendation";
import recommendationApi from "../services/Recommendation";
import useSelectedType from "./useSelectedType";

const useFetchRecommendations = () => {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const { selectedType } = useSelectedType();

  const fetchRecommendations = async () => {
    try {
      const recommendationsResponse =
        await recommendationApi.getAllRecommendationsFromAType(selectedType);

      setRecommendations(recommendationsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return { recommendations };
};

export default useFetchRecommendations;
