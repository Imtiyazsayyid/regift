import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  placeholder: string;
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar = ({ placeholder, setSearchText, searchText }: Props) => {
  return (
    <Flex direction={"column"} className="w-1/3" gap={"1"}>
      <Text className="text-xs text-slate-500">Search</Text>
      <TextField.Root className="h-fit" size={"2"}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder={placeholder}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
      </TextField.Root>
    </Flex>
  );
};

export default SearchBar;
