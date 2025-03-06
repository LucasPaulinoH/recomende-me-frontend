import { Dispatch, SetStateAction, useState } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";
import Media from "@/types/SelectedMedia";
import useSelectedType from "@/hooks/useSelectedType";
import { RecommendationType } from "@/types/RecommendationType";
import { getHandledSelectedMedia, showAuthors } from "./functions";

interface AutocompleteProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder: string;
  results: any[];
  selectedMedia: Media | null;
  setSelectedMedia: Dispatch<SetStateAction<Media | null>>;
}

const Autocomplete = (props: AutocompleteProps) => {
  const { search, setSearch, placeholder, results, setSelectedMedia } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { selectedType } = useSelectedType();

  return (
    <Command>
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(!!e.target.value);
        }}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      {isOpen && (
        <CommandList className="border">
          <CommandGroup>
            {results &&
              results?.map((result, index) => {
                const handledMedia = getHandledSelectedMedia(
                  result,
                  selectedType
                );

                return (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setSearch(handledMedia.title);
                      setSelectedMedia(handledMedia);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <img
                      src={handledMedia.cover}
                      className="max-h-[100px]"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold p-0">{handledMedia.title}</p>

                      {(selectedType === RecommendationType.BOOK ||
                        selectedType === RecommendationType.SONG) && (
                        <p>{showAuthors(handledMedia.authors)}</p>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default Autocomplete;
