import { Dispatch, SetStateAction, useState } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";
import Media from "@/types/SelectedMedia";
import useSelectedType from "@/hooks/useSelectedType";
import { RecommendationType } from "@/types/RecommendationType";
import { getHandledSelectedMedia, showAuthors } from "./functions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { showTypeLabel } from "@/utils/stringUtils";
import unknownCover from "@/assets/unknown-cover.png"

interface AutocompleteProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  results: any[];
  selectedMedia: Media | null;
  setSelectedMedia: Dispatch<SetStateAction<Media | null>>;
}

const Autocomplete = (props: AutocompleteProps) => {
  const { search, setSearch, results, selectedMedia, setSelectedMedia } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { selectedType } = useSelectedType();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={isOpen}
          className="flex flex-row items-center rounded-[10px] gap-4 border justify-between cursor-pointer p-5"
        >
          {selectedMedia ? (
            <div className="max-w-full flex gap-4 items-center">
              <img
                src={selectedMedia.cover || unknownCover}
                alt={`${selectedMedia.cover} cover`}
                className="w-[60px]"
              />
              <div className="flex flex-col items-start">
                <p className="font-bold">{selectedMedia.title}</p>
                <p>{showAuthors(selectedMedia.authors)}</p>
              </div>
            </div>
          ) : (
            `Buscar ${showTypeLabel(selectedType).toLowerCase()}`
          )}

          <ChevronsUpDown className="opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={`${showTypeLabel(selectedType)
              .toLowerCase()
              .replace(/^./, (char) => char.toUpperCase())}...`}
            aria-expanded={isOpen}
          />

          <CommandList>
            <CommandGroup>
              {results?.map((result, index) => {
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
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Autocomplete;
