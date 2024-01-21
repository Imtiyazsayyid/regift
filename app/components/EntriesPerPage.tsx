import { Flex, Select, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  entriesPerPage: number;
  setEntriesPerPage: (entriesPerPage: number) => void;
}

const EntriesPerPage = ({ entriesPerPage, setEntriesPerPage }: Props) => {
  return (
    <Flex direction={"column"} className="w-fit" gap={"1"}>
      <Text className="text-xs text-slate-500">Entries Per Page</Text>
      <Select.Root
        value={entriesPerPage.toString()}
        onValueChange={(val) => setEntriesPerPage(parseInt(val))}
      >
        <Select.Trigger className="w-full" />
        <Select.Content position="popper">
          <Select.Item value="5">5</Select.Item>
          <Select.Item value="7">7</Select.Item>
          <Select.Item value="10">10</Select.Item>
          <Select.Item value="15">15</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default EntriesPerPage;
