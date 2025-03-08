import axios from "axios";
import { API_BASE_URL } from "../recommendationApiProvider";
import { RecommendationType } from "../../types/RecommendationType";
import { NewRecommendationDTO, Recommendation } from "./Recommendation";

const CONTROLLER_URL = `${API_BASE_URL}/recommendations`;

const recommendationApi = {
  createRecommendation: (newRecommendationDTO: NewRecommendationDTO) =>
    axios
      .post(`${CONTROLLER_URL}`, newRecommendationDTO)
      .then((response) => response.data),
  getAllRecommendations: () =>
    axios.get(`${CONTROLLER_URL}/all`).then((response) => response.data),
  getAllRecommendationsFromAType: (type: RecommendationType) =>
    axios
      .get(`${CONTROLLER_URL}?type=${type}`)
      .then((response) => response.data),
  getAllRecommendationsFromAUserId: (userId: string) =>
    axios
      .get(`${CONTROLLER_URL}/user?userId=${userId}`)
      .then((response) => response.data),
  getRecommendationsQuantityByType: () =>
    axios
      .get(`${CONTROLLER_URL}/quantity-by-type`)
      .then((response) => response.data),
  updateRecommendationRating: (
    recommendationId: string,
    userId: string
  ): Promise<Recommendation> =>
    axios
      .patch(`${CONTROLLER_URL}/${recommendationId}/${userId}`)
      .then((response) => response.data),
  deleteRecommendation: (id: string) =>
    axios.delete(`${CONTROLLER_URL}/${id}`).then((response) => response.data),
};

export default recommendationApi;
