import { Flex, Select, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  orderStatus: string;
  setOrderStatus: (orderStatus: string) => void;
}

const ApprovalStatusFilter = ({ orderStatus, setOrderStatus }: Props) => {
  return (
    <Flex direction={"column"} className="w-full" gap={"1"}>
      <Text className="text-xs text-slate-500">Order Status</Text>
      <Select.Root value={orderStatus} onValueChange={(val) => setOrderStatus(val)}>
        <Select.Trigger className="w-full" />
        <Select.Content position="popper">
          <Select.Item value={"all"}>All</Select.Item>
          <Select.Item value="pending">Pending</Select.Item>
          <Select.Item value="processing">Processing</Select.Item>
          <Select.Item value="confirmed">Confirmed</Select.Item>
          <Select.Item value="shipped">Shipped</Select.Item>
          <Select.Item value="delivered">Delivered</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default ApprovalStatusFilter;
