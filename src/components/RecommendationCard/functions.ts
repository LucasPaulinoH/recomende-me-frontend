import recommendationApi from "@/services/Recommendation";

export const handleDeleteRecommendation = async (id: string) => {
  if (confirm("Tem certeza que deseja deletar esta recomendação?")) {
    try {
      await recommendationApi.deleteRecommendation(id);
    } catch (error) {
      console.error("Error deleting recommendation: ", error);
    }
  }
};

export const handleUpdateRating = async (
  recommendationId: string,
  userId: string
) => {
  try {
    const updatedRatingsResponse =
      await recommendationApi.updateRecommendationRating(
        recommendationId,
        userId
      );
    return updatedRatingsResponse.ratings;
  } catch (error) {
    console.error("Error updating rating: ", error);
  }
};
