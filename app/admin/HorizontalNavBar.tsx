"use client";

import { Avatar, DropdownMenu, Flex, Heading, Text } from "@radix-ui/themes";
import { IoLogOutOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import * as AdminServices from "../Services/AdminServices";
import { Admin } from "../interfaces/AdminInterface";
import { TokenService } from "../Services/StorageService";
import { useRouter } from "next/navigation";

const HorizontalNavBar = () => {
  const [adminDetails, setAdminDetails] = useState<Admin>();
  const router = useRouter();

  const getAdminDetails = async () => {
    const res = await AdminServices.getAdminDetails();
    setAdminDetails(res.data.data);
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  const signOut = () => {
    TokenService.removeAccessToken();
    router.push("/auth/login");
  };

  return (
    <Flex
      className="min-h-[80px] w-full"
      px={"5"}
      align={"center"}
      justify={"between"}
    >
      <Flex className="pl-3">
        <GoBack />
      </Flex>
      <Flex gap={"3"} align={"center"} className="">
        <Flex direction={"column"} align={"end"}>
          <Heading size={"2"}>
            {adminDetails?.firstName} {adminDetails?.lastName}
          </Heading>
          <Text className="text-sm text-slate-500">Admin</Text>
        </Flex>
        <Flex>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Flex>
                <Avatar
                  fallback={"?"}
                  radius="full"
                  className="cursor-pointer"
                />
              </Flex>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <Flex gap={"2"} align={"center"}>
                  <GearIcon /> Settings
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Flex gap={"2"} align={"center"}>
                  <PersonIcon /> Profile
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => signOut()}>
                <Flex gap={"2"} align={"center"}>
                  <IoLogOutOutline /> Logout
                </Flex>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HorizontalNavBar;
