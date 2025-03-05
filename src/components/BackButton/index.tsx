import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} variant="ghost" className="cursor-pointer">
      <ArrowLeft />
    </Button>
  );
};

export const BackButtonContainer = () => (
  <div className="self-start absolute top-0">
    <BackButton />
  </div>
);

export default BackButton;
