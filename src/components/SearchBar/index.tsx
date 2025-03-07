import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import useSelectedType from "@/hooks/useSelectedType";

interface SearchBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchBar = (props: SearchBarProps) => {
  const { search, setSearch } = props;

  const { selectedType } = useSelectedType();
  const navigate = useNavigate();

  const handleAddClick = () =>
    navigate(`/recommendations/add?type=${selectedType}`);

  return (
    <div className="w-[99vw] flex content-start items-center  justify-center gap-2 pl-8 pr-8">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Busque recomendação..."
        className="min-w-[40%] max-w-[400px]"
      />
      <Button className="cursor-pointer" onClick={handleAddClick}>
        <Plus /> <p className="hidden sm:block">Nova recomendação</p>
      </Button>
    </div>
  );
};

export default SearchBar;
