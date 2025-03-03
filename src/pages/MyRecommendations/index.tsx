import useFetchMyRecommendations from "@/hooks/useFetchMyRecommendations";
import { PAGE_CONTAINER } from "../../styles/shared";

const MyRecommendations = () => {
  const { myRecommendations } = useFetchMyRecommendations();

  console.log(myRecommendations);

  return <div className={PAGE_CONTAINER}></div>;
};

export default MyRecommendations;
