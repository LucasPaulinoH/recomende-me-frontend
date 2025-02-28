import { MdLogout } from "react-icons/md";
import { FIREBASE_AUTH } from "../../utils/firebaseConfig";

const SignOutButton = () => (
  <MdLogout
    onClick={() => FIREBASE_AUTH.signOut()}
    className="w-[30px] h-[30px] cursor-pointer"
  />
);

export default SignOutButton;
