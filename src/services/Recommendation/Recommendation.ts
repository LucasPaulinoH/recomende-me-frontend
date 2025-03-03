import { PsychologicalConcept } from "../../types/PsychologicalConcept";
import { RecommendationType } from "../../types/RecommendationType";

export type Recommendation = {
  id: string;
  type: RecommendationType;
  title: string;
  username: string;
  userId: string;
  rating: number;
  psychologicalConcept: PsychologicalConcept;
  psychologicalImpact: string;
  createdAt: Date;
};

export type NewRecommendationDTO = {
  type: RecommendationType;
  title: string;
  username: string;
  userId: string;
  psychologicalConcept: PsychologicalConcept;
  psychologicalImpact: string;
};
