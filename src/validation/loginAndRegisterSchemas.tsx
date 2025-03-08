"use client";

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

export const registerSchema = z
  .object({
    username: z.string({
      required_error: "O nome de usuário deve ter mais de 1 caractere",
    }),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z.string({ required_error: "Digite uma senha válida" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });
