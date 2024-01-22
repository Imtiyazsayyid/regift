"use client";

import { CaretDownIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaBoxOpen, FaDonate } from "react-icons/fa";
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { RiLayout2Fill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { useState } from "react";

const VerticalNavbar = () => {
  const [ListItems, setListItems] = useState([
    {
      link: "/",
      icon: <AiFillHome className="text-2xl" />,
      isOpen: false,
      label: "Home",
    },
    {
      link: "/masters",
      icon: <FaGift className="text-2xl" />,
      label: "Masters",
      isOpen: false,
      subLinks: [
        {
          link: "/categories",
          icon: <BiSolidCategory className="text-2xl" />,
          label: "Categories",
        },
      ],
    },
    {
      link: "/donors",
      isOpen: false,
      icon: <FaUserLarge className="text-xl" />,
      label: "Donors",
    },
    {
      link: "/organisations",
      isOpen: false,
      icon: <FaDonate className="text-2xl" />,
      label: "Charitable Organisations",
    },
    {
      link: "/donated-items",
      isOpen: false,
      icon: <FaBoxOpen className="text-2xl" />,
      label: "Donated Items",
    },
    {
      link: "/orders",
      isOpen: false,
      icon: <FaCartShopping className="text-2xl" />,
      label: "Orders",
    },
  ]);

  const router = useRouter();
  const currentPath = usePathname();

  const handleOpen = (link: string) => {
    const updatedListItems = ListItems.map((item) =>
      item.link === link ? { ...item, isOpen: !item.isOpen } : item
    );
    setListItems(updatedListItems);
  };

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
                justify={"between"}
                onClick={() => {
                  if (item.subLinks) return;
                  router.push(item.link);
                }}
              >
                <Flex gap={"3"}>
                  <Flex className="w-[20px]">{item.icon}</Flex>
                  <Text className="">{item.label}</Text>
                </Flex>
                {item.subLinks && item.subLinks?.length > 0 && (
                  <Flex>
                    <CaretDownIcon onClick={() => handleOpen(item.link)} />
                  </Flex>
                )}
              </Flex>
              {item.isOpen &&
                item.subLinks &&
                item.subLinks?.length > 0 &&
                item.subLinks.map((item) => (
                  <Flex className="ml-10">
                    <Flex
                      className={
                        "h-[40px] w-full px-5 cursor-pointer rounded-lg " +
                        (isCurrentPath(item.link) && "bg-blue-600 text-white")
                      }
                      align={"center"}
                      justify={"between"}
                      onClick={() => {
                        router.push(item.link);
                      }}
                    >
                      <Flex gap={"3"}>
                        <Flex className="w-[20px]">{item.icon}</Flex>
                        <Text className="">{item.label}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              <Flex className="border-b w-full" />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerticalNavbar;
