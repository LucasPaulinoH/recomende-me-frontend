import { FIREBASE_AUTH } from "../../utils/firebaseConfig";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => (
  <Button
    variant="link"
    size="icon"
    onClick={() =>
      confirm("Tem certeza que deseja sair?") && FIREBASE_AUTH.signOut()
    }
  >
    <LogOut />
  </Button>
);

export default SignOutButton;
