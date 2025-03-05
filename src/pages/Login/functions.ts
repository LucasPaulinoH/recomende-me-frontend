import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FormEvent } from "react";

export const handleLogin = async (
  e: FormEvent<HTMLFormElement>,
  email: string,
  password: string
) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Preencha as credenciais corretamente");
    return;
  }

  try {
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  } catch (error) {
    alert("Erro no login: " + error);
  }
};
