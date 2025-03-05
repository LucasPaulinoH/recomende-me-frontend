import { FIREBASE_AUTH } from "@/utils/firebaseConfig";

export const handleSignout = () =>
  confirm("Tem certeza que deseja sair?") && FIREBASE_AUTH.signOut();
