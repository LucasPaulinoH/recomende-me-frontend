import { useEffect, useState } from "react";
import { Recommendation } from "../services/Recommendation/Recommendation";
import recommendationApi from "../services/Recommendation";
import { RecommendationType } from "../types/RecommendationType";

const useFetchRecommendations = () => {
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);

  const selectedCategory =
    JSON.parse(localStorage.getItem("category")!) ?? RecommendationType.MOVIE;

  const fetchRecommendations = async () => {
    try {
      const recommendationsResponse =
        await recommendationApi.getAllRecommendationsFromAType(
          selectedCategory
        );

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
