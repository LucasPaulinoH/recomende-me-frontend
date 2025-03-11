import recommendationApi from "../services/Recommendation";
import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import {
  getRecommendationsListFromRecommendationsArray,
} from "@/utils/data-structures/linkedList";
import { useQuery } from "@tanstack/react-query";

const useFetchMyRecommendations = () => {
  const { currentUser } = FIREBASE_AUTH;

  const fetchMyRecommendations = async () => {
    const recommendationsResponse =
      await recommendationApi.getAllRecommendationsFromAUserId(
        currentUser!.uid
      );

    return getRecommendationsListFromRecommendationsArray(
      recommendationsResponse
    );
  };

  const { data: myRecommendations, refetch } = useQuery({
    queryKey: ["myRecommendations"],
    queryFn: fetchMyRecommendations,
    retry: 2,
  });

  return { myRecommendations, fetchMyRecommendations: refetch };
};

export default useFetchMyRecommendations;
