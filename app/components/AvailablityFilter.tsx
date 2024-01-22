import { Flex, Select, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  availability: string;
  setAvailability: (condition: string) => void;
}

const ApprovalStatusFilter = ({ availability, setAvailability }: Props) => {
  return (
    <Flex direction={"column"} className="w-fit" gap={"1"}>
      <Text className="text-xs text-slate-500">Availability</Text>
      <Select.Root
        value={availability}
        onValueChange={(val) => setAvailability(val)}
      >
        <Select.Trigger className="w-40" />
        <Select.Content position="popper">
          <Select.Item value="all">All</Select.Item>
          <Select.Item value="available">Available</Select.Item>
          <Select.Item value="unavailable">Unavailable</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default ApprovalStatusFilter;
