"use client";

import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaBoxOpen } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaDonate } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";

const ListItems = [
  {
    link: "/",
    icon: <AiFillHome className="text-2xl" />,
    label: "Home",
  },
  {
    link: "/donors",
    icon: <FaUserLarge className="text-xl" />,
    label: "Donors",
  },
  {
    link: "/organisations",
    icon: <FaDonate className="text-2xl" />,
    label: "Charitable Organisations",
  },
  {
    link: "/inventory",
    icon: <FaBoxOpen className="text-2xl" />,
    label: "Inventory",
  },
];

const VerticalNavbar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const isCurrentPath = (itemLink: string) => {
    if (itemLink === "/" && currentPath === "/") {
      return true; // Exact match for home
    } else if (itemLink !== "/" && currentPath.startsWith(itemLink)) {
      return true; // Starts with for other links
    } else {
      return false;
    }
  };

  return (
    <Flex className="w-full" p={"2"}>
      <Flex className="w-full rounded-lg" direction={"column"}>
        <Flex className="h-[100px] w-full p-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Avicii_-_Logo.png"
            className="h-full w-fit object-cover"
          />
        </Flex>
        <Flex className="p-4 pb-8 border-b">
          <Heading>
            <span className="text-blue-600">ReGift</span> Admin
          </Heading>
        </Flex>
        <Flex py={"1"} gap={"1"} direction={"column"}>
          {ListItems.map((item) => (
            <Flex key={item.link} direction={"column"} gap={"1"}>
              <Flex
                className={
                  "h-[60px] w-full px-5 cursor-pointer rounded-lg " +
                  (isCurrentPath(item.link) && "bg-blue-600 text-white")
                }
                align={"center"}
                gap={"3"}
                onClick={() => {
                  router.push(item.link);
                }}
              >
                <Flex className="w-[20px]">{item.icon}</Flex>
                <Text className="">{item.label}</Text>
              </Flex>
              <Flex className="border-b w-full" />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerticalNavbar;
