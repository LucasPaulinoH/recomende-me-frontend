import { Dispatch, SetStateAction, useState } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";
import Media from "@/types/SelectedMedia";

interface AutocompleteProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  results: any[];
  setSelectedMedia: Dispatch<SetStateAction<Media>> ;
}

const Autocomplete = (props: AutocompleteProps) => {
  const { value, setValue, placeholder, results, setSelectedMedia } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Command>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
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
              results.map((result, index) => (
                <CommandItem
                  key={index}
                  onSelect={(currentValue) => {
                    setValue(currentValue.split("Autor:")[0]);
                    setIsOpen(false);
                    setSelectedMedia({
                      title: result?.volumeInfo?.title,
                      authors: result?.volumeInfo?.authors ?? ["Desconhecido"],
                      cover: result?.volumeInfo?.imageLinks?.thumbnail ?? "",
                    } as Media);
                  }}
                >
                  <img src={result?.volumeInfo?.imageLinks?.smallThumbnail} loading="lazy"/>
                  <div>
                    <p className="font-bold p-0">{result?.volumeInfo?.title}</p>
                    <p>
                      {`Autor: ${
                        result?.volumeInfo?.authors
                          ? result?.volumeInfo?.authors[0] ||
                            result?.volumeInfo?.authors[1]
                          : "Desconhecido"
                      }`}
                    </p>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default Autocomplete;
