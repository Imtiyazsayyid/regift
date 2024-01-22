"use client";

import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import * as AdminServices from "../../Services/AdminServices";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    user_role: "admin",
  });

  const handleSubmit = async () => {
    const res = await AdminServices.login(userDetails);
    console.log({ res });
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
