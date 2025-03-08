import { useEffect, useState } from "react";
import { Recommendation } from "../services/Recommendation/Recommendation";
import recommendationApi from "../services/Recommendation";
import useSelectedType from "./useSelectedType";
import LinkedList, {
  getRecommendationsListFromRecommendationsArray,
} from "@/utils/data-structures/linkedList";

const useFetchRecommendations = () => {
  const [recommendations, setRecommendations] =
    useState<LinkedList<Recommendation> | null>(null);

  const { selectedType } = useSelectedType();

  const fetchRecommendations = async () => {
    try {
      const recommendationsResponse =
        await recommendationApi.getAllRecommendationsFromAType(selectedType);

      setRecommendations(
        getRecommendationsListFromRecommendationsArray(recommendationsResponse)
      );
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
