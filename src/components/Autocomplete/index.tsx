import { Dispatch, SetStateAction, useState } from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";

interface AutocompleteProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  results: any[];
}

const Autocomplete = (props: AutocompleteProps) => {
  const { value, setValue, placeholder, results } = props;
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
                  }}
                >
                  <img src={result?.volumeInfo?.imageLinks?.smallThumbnail} />
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
