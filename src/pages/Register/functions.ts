import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FormEvent } from "react";

export const handleRegister = async (
  e: FormEvent<HTMLFormElement>,
  username: string,
  email: string,
  password: string
) => {
  e.preventDefault();
  if (!username || !email || !password) return;

  try {
    const registerResponse = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    await updateProfile(registerResponse.user, {
      displayName: username,
    });

    alert("Conta criada com sucesso!");
  } catch (error) {
    alert("Falha no cadastro: " + error);
  }
};
