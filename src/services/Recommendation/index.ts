import axios from "axios";
import { API_BASE_URL } from "../apiProvider";
import { RecommendationType } from "../../types/RecommendationType";

const CONTROLLER_URL = `${API_BASE_URL}/recommendations`;

const recommendationApi = {
  getAllRecommendations: () =>
    axios.get(`${CONTROLLER_URL}/all`).then((response) => response.data),
  getAllRecommendationsFromAType: (type: RecommendationType) =>
    axios
      .get(`${CONTROLLER_URL}?type=${type}`)
      .then((response) => response.data),
  getRecommendationsQuantityByType: () =>
    axios
      .get(`${CONTROLLER_URL}/quantity-by-type`)
      .then((response) => response.data),
};

export default recommendationApi;
