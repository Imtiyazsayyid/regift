"use client";

import { CaretDownIcon, CaretUpIcon, Cross2Icon, DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text, Tooltip } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaBoxOpen, FaDonate } from "react-icons/fa";
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { RiLayout2Fill } from "react-icons/ri";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import { useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";

import { motion } from "framer-motion";

interface Props {
  isActive: boolean;
  setActive: (isActive: boolean) => void;
}

const VerticalNavbar = ({ isActive, setActive }: Props) => {
  // const [isActive, setActive] = useState(false);
  const [ListItems, setListItems] = useState([
    {
      link: "/admin",
      icon: <AiFillHome className="text-2xl" />,
      isOpen: false,
      label: "Home",
    },
    {
      link: "/admin/masters",
      icon: <FaGift className="text-2xl" />,
      label: "Masters",
      isOpen: false,
      subLinks: [
        {
          link: "/admin/categories",
          icon: <BiSolidCategory className="text-2xl" />,
          label: "Categories",
        },
      ],
    },
    {
      link: "/admin/users",
      icon: <FaUserLarge className="text-xl" />,
      isOpen: false,
      label: "Users",
      subLinks: [
        {
          link: "/admin/donors",
          isOpen: false,
          icon: <FaHandHoldingHeart className="text-xl" />,
          label: "Donors",
        },
        {
          link: "/admin/organisations",
          isOpen: false,
          icon: <FaDonate className="text-xl" />,
          label: "Charitable Organisations",
        },
      ],
    },
    {
      link: "/admin/operations",
      isOpen: false,
      icon: <FaSuitcase className="text-2xl" />,
      label: "Operations",
      subLinks: [
        {
          link: "/admin/donated-items",
          isOpen: false,
          icon: <FaBoxOpen className="text-2xl" />,
          label: "Donated Items",
        },
        {
          link: "/admin/inventory",
          isOpen: false,
          icon: <MdOutlineInventory className="text-2xl" />,
          label: "Inventory",
        },
        {
          link: "/admin/orders",
          isOpen: false,
          icon: <FaCartShopping className="text-2xl" />,
          label: "Orders",
        },
        {
          link: "/admin/transactions",
          isOpen: false,
          icon: <FaMoneyCheckAlt className="text-2xl" />,
          label: "Transactions",
        },
      ],
    },
  ]);

  const router = useRouter();
  const currentPath = usePathname();

  const handleOpen = (link: string) => {
    const updatedListItems = ListItems.map((item) => (item.link === link ? { ...item, isOpen: !item.isOpen } : item));
    setListItems(updatedListItems);
  };

  const isCurrentPath = (itemLink: string) => {
    if (itemLink === "/admin" && currentPath === "/admin") {
      return true; // Exact match for home
    } else if (itemLink !== "/admin" && currentPath.substring(6).startsWith(itemLink.substring(6))) {
      return true; // Starts with for other links
    } else {
      return false;
    }
  };

  return (
    <Flex className="z-50">
      {!isActive && (
        <Tooltip content="Open Navigation Menu">
          <Flex
            className="h-24 w-8 border absolute top-[46%] bg-black rounded-e-lg cursor-pointer shadow-2xl text-white text-xs opacity-50"
            direction={"column"}
            onClick={() => setActive(true)}
            align={"center"}
            justify={"center"}
          >
            <DoubleArrowLeftIcon />
          </Flex>
        </Tooltip>
      )}
      <motion.div
        className="bg-white overflow-hidden fixed border rounded-e-xl h-full shadow-2xl"
        animate={isActive ? { width: "350px" } : { width: "0px" }}
      >
        <Flex className="w-full" p={"2"}>
          <Flex className="absolute top-8 right-5 cursor-pointer" onClick={() => setActive(false)}>
            <Cross2Icon className="h-5 w-5" />
          </Flex>
          <Flex className="w-full rounded-lg" direction={"column"}>
            <Flex className="p-4 pb-8 pt-0 border-b mt-16" gap={"2"} align={"center"}>
              <BsGlobe2 className="text-5xl" />
              <Heading className="text-nowrap" size={"8"}>
                <span className="text-blue-600">ReGift</span> Admin
              </Heading>
            </Flex>
            <Flex py={"1"} gap={"1"} direction={"column"}>
              {ListItems.map((item) => (
                <Flex key={item.link} direction={"column"} gap={"1"} className="text-nowrap">
                  <Flex
                    className={
                      "h-[60px] w-full px-5 cursor-pointer rounded-lg " +
                      (isCurrentPath(item.link) && "bg-blue-600 text-white")
                    }
                    align={"center"}
                    justify={"between"}
                    onClick={() => {
                      if (item.subLinks) {
                        handleOpen(item.link);
                        return;
                      }
                      router.push(item.link);
                    }}
                  >
                    <Flex gap={"3"}>
                      <Flex className="w-[20px]">{item.icon}</Flex>
                      <Text className="">{item.label}</Text>
                    </Flex>
                    {item.subLinks && item.subLinks?.length > 0 && (
                      <Flex>{!item.isOpen ? <CaretDownIcon /> : <CaretUpIcon />}</Flex>
                    )}
                  </Flex>

                  <motion.div
                    className="overflow-hidden"
                    animate={item.isOpen ? { height: "fit-content" } : { height: 0 }}
                  >
                    <Flex direction={"column"} className="mb-5">
                      {item.subLinks &&
                        item.subLinks?.length > 0 &&
                        item.subLinks.map((item) => (
                          <Flex className="ml-10" key={item.link}>
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
                    </Flex>
                  </motion.div>

                  <Flex className="border-b w-full" />
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default VerticalNavbar;
