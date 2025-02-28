import { PsychologicalConcept } from "../../types/PsychologicalConcept";
import { RecommendationType } from "../../types/RecommendationType";

export type Recommendation = {
  id: string;
  type: RecommendationType;
  title: string;
  userNickname: string;
  userId: string;
  rating: number;
  psychologicalConcept: PsychologicalConcept;
  psychologicalImpact: string;
  createdAt: Date;
};
