"use client";

import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import * as AdminServices from "../../Services/AdminServices";
import { TokenService } from "../../Services/StorageService";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    user_role: "admin",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await AdminServices.login(userDetails);

    if (res.data.status) {
      const refreshToken = res.data.data;

      const accessTokenResponse = await AdminServices.getAccessToken(
        refreshToken
      );

      console.log({ accessTokenResponse });

      if (!accessTokenResponse.data.status) {
        throw new Error("status false in getting Access Token");
      }
      TokenService.saveAccessToken(accessTokenResponse.data.data);
      router.push("/admin");
    }
  };

  return (
    <Flex
      direction={"column"}
      gap={"2"}
      justify={"center"}
      align={"center"}
      className="h-full w-full"
    >
      <TextField.Root className="w-96">
        <TextField.Slot>
          <PersonIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              email: e.target.value,
            })
          }
        />
      </TextField.Root>

      <TextField.Root className="w-96">
        <TextField.Slot>
          <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Password"
          type="password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              password: e.target.value,
            })
          }
        />
      </TextField.Root>

      <Button variant="surface" className="w-96" onClick={handleSubmit}>
        Login
      </Button>
    </Flex>
  );
};

export default LoginPage;
