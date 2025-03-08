import recommendationApi from "@/services/Recommendation";
import { NewRecommendationDTO } from "@/services/Recommendation/Recommendation";

export const handleAddRecommendation = async (
  newRecommendationDTO: NewRecommendationDTO
) => {
  try {
    await recommendationApi.createRecommendation(newRecommendationDTO);
  } catch (error) {
    console.error("Error adding recommendation: ", error);
  }
};
