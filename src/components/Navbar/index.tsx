import { FIREBASE_AUTH } from "@/utils/firebaseConfig";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { LibraryBig } from "lucide-react";
import { handleSignout } from "./functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const Navbar = () => {
  const { currentUser } = FIREBASE_AUTH;

  const navigate = useNavigate();

  const navbarOptions = [
    {
      icon: <LibraryBig />,
      label: "Minhas recomendações",
      function: () => navigate("/recommendations/my"),
    },
    { icon: <LogOut />, label: "Sair", function: handleSignout },
  ];

  return (
    <div className="w-full h-[60px] flex flex-row items-center justify-between pl-8 pr-8">
      <h1 className="font-bold cursor-pointer" onClick={() => navigate("/")}>
        RecomendeMe
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="font-bold cursor-pointer">
            {currentUser?.displayName}
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {navbarOptions.map((option, index) => (
              <>
                {index !== 0 && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  className={`cursor-pointer w-full self-start`}
                  onClick={option.function}
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              </>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
