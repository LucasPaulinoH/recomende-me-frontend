import { useEffect, useState } from "react";
import { Recommendation } from "../services/Recommendation/Recommendation";
import recommendationApi from "../services/Recommendation";
import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import LinkedList, {
  getRecommendationsListFromRecommendationsArray,
} from "@/utils/data-structures/linkedList";

const useFetchMyRecommendations = () => {
  const [myRecommendations, setMyRecommendations] =
    useState<LinkedList<Recommendation> | null>(null);

  const { currentUser } = FIREBASE_AUTH;

  const fetchMyRecommendations = async () => {
    try {
      const recommendationsResponse =
        await recommendationApi.getAllRecommendationsFromAUserId(
          currentUser!.uid
        );

      setMyRecommendations(
        getRecommendationsListFromRecommendationsArray(recommendationsResponse)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyRecommendations();
  }, []);

  return { myRecommendations, fetchMyRecommendations };
};

export default useFetchMyRecommendations;
