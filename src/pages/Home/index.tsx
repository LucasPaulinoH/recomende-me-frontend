import RecommendationTypeCard from "../../components/RecommendationTypeCard";
import { PAGE_CONTAINER } from "../../styles/shared";
import { RecommendationType } from "../../types/RecommendationType";
import useFetchRecommendationsQuantity from "../../hooks/useFetchRecommendationsQuantity";
import SignOutButton from "../../components/SignOutButton.tsx";
import { FIREBASE_AUTH } from "../../utils/firebaseConfig.ts";

const Home = () => {
  const { recommendationsQuantity } = useFetchRecommendationsQuantity();

  const {currentUser} = FIREBASE_AUTH

  return (
    <div className={PAGE_CONTAINER}>
     <div>{`Bem-vindo, ${currentUser.email}!`} <SignOutButton /></div>
      <h1 className="font-bold">Recomendações</h1>

      <div className="flex gap-20">
        <RecommendationTypeCard
          type={RecommendationType.BOOK}
          recommendationsQuantity={
            recommendationsQuantity[0] ?? "Carregando..."
          }
        />
        <RecommendationTypeCard
          type={RecommendationType.MOVIE}
          recommendationsQuantity={
            recommendationsQuantity[1] ?? "Carregando..."
          }
        />
        <RecommendationTypeCard
          type={RecommendationType.SONG}
          recommendationsQuantity={
            recommendationsQuantity[2] ?? "Carregando..."
          }
        />
      </div>
    </div>
  );
};

export default Home;
