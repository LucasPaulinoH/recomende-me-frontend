import RecommendationTypeCard from "../../components/RecommendationTypeCard";
import { LoggedContainer } from "../../styles/shared";
import { RecommendationType } from "../../types/RecommendationType";
import useFetchRecommendationsQuantity from "../../hooks/useFetchRecommendationsQuantity";
import { LOADING_LABEL } from "@/utils/stringUtils.ts";

const Home = () => {
  const { recommendationsQuantity } = useFetchRecommendationsQuantity();

  return (
    <LoggedContainer>
      <h1 className="font-bold">Selecione uma categoria</h1>

      <div className="w-full flex flex-col items-center justify-center gap-10 md:flex-row pl-8 pr-8">
        <RecommendationTypeCard
          type={RecommendationType.BOOK}
          recommendationsQuantity={recommendationsQuantity[0]}
        />
        <RecommendationTypeCard
          type={RecommendationType.MOVIE}
          recommendationsQuantity={recommendationsQuantity[1]}
        />
        <RecommendationTypeCard
          type={RecommendationType.SONG}
          recommendationsQuantity={recommendationsQuantity[2]}
        />
      </div>
    </LoggedContainer>
  );
};

export default Home;
