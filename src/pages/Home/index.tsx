import RecommendationTypeCard from "../../components/RecommendationTypeCard";
import { LoggedContainer } from "../../styles/shared";
import { RecommendationType } from "../../types/RecommendationType";
import useFetchRecommendationsQuantity from "../../hooks/useFetchRecommendationsQuantity";

const Home = () => {
  const { recommendationsQuantity } = useFetchRecommendationsQuantity();

  return (
    <LoggedContainer>
      <h1 className="font-bold">Selecione uma categoria</h1>

      <div className="w-full flex flex-col items-center justify-center gap-8 md:flex-row px-8 8">
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
