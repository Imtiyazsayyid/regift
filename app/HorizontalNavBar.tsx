import { Avatar, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

const HorizontalNavBar = () => {
  return (
    <Flex
      className="h-[70px] w-full border shadow-md rounded-lg"
      px={"5"}
      align={"center"}
      justify={"between"}
    >
      <Flex>{/* <Heading size={"5"}></Heading> */}</Flex>
      <Flex gap={"3"} align={"center"}>
        <Flex direction={"column"} align={"end"}>
          <Heading size={"2"}>Imtiyaz Sayyid</Heading>
          <Text className="text-sm text-slate-500">Admin</Text>
        </Flex>
        <Flex>
          <Avatar fallback={"?"} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HorizontalNavBar;
