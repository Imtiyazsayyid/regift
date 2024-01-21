import { Flex, Select, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  approvalStatus: string;
  setApprovalStatus: (approvalStatus: string) => void;
}

const ApprovalStatusFilter = ({ approvalStatus, setApprovalStatus }: Props) => {
  return (
    <Flex direction={"column"} className="w-fit" gap={"1"}>
      <Text className="text-xs text-slate-500">Approval Status</Text>
      <Select.Root
        value={approvalStatus}
        onValueChange={(val) => setApprovalStatus(val)}
      >
        <Select.Trigger className="w-40" />
        <Select.Content position="popper">
          <Select.Item value={"all"}>All</Select.Item>
          <Select.Item value="pending">Pending</Select.Item>
          <Select.Item value="approved">Approved</Select.Item>
          <Select.Item value="rejected">Rejected</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default ApprovalStatusFilter;
