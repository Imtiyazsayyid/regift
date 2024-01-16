import { Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  className?: string;
}
const Seperator = ({ className }: Props) => {
  return (
    <Flex justify={"center"} className={"w-full " + className}>
      <Flex className="border-b-[1px] w-full"></Flex>
    </Flex>
  );
};

export default Seperator;
