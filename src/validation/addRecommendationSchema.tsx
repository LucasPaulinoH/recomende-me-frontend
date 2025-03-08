"use client";

import { z } from "zod";

const addRecommendationSchema = z.object({
  psychologicalImpact: z
    .string({ required_error: "Este campo é obrigatório" })
    .min(1, "Este campo é obrigatório")
    .max(256, "Máximo de 256 caracteres"),
  psychologicalConcept: z.string({
    required_error: "Este campo é obrigatório",
  }),
});

export default addRecommendationSchema;
