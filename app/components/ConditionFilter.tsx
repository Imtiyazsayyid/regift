import { Flex, Select, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  condition: string;
  setCondition: (condition: string) => void;
}

const ApprovalStatusFilter = ({ condition, setCondition }: Props) => {
  return (
    <Flex direction={"column"} className="w-fit" gap={"1"}>
      <Text className="text-xs text-slate-500">Condition</Text>
      <Select.Root value={condition} onValueChange={(val) => setCondition(val)}>
        <Select.Trigger className="w-40" />
        <Select.Content position="popper">
          <Select.Item value="all">All</Select.Item>
          <Select.Item value="new">New</Select.Item>
          <Select.Item value="like_new">Like New</Select.Item>
          <Select.Item value="used_good">Good</Select.Item>
          <Select.Item value="used_fair">Fair</Select.Item>
          <Select.Item value="used_poor">Poor</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default ApprovalStatusFilter;
