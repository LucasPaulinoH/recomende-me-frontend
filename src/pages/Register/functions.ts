import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const handleRegister = async (
  username: string,
  email: string,
  password: string
) => {
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
