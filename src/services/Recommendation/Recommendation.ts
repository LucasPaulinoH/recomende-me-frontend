import { PsychologicalConcept } from "../../types/PsychologicalConcept";
import { RecommendationType } from "../../types/RecommendationType";

export type Recommendation = {
  id: string;
  type: RecommendationType;
  title: string;
  username: string;
  cover: string;
  authors: string[];
  userId: string;
  ratings: string[];
  psychologicalConcept: PsychologicalConcept;
  psychologicalImpact: string;
  createdAt: Date;
};

export type NewRecommendationDTO = {
  type: RecommendationType;
  title: string;
  cover: string;
  authors: string[];
  username: string;
  userId: string;
  psychologicalConcept: PsychologicalConcept;
  psychologicalImpact: string;
};
