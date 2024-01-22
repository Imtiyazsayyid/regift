"use client";

import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as AdminServices from "../../Services/AdminServices";
import { TokenService } from "../../Services/StorageService";
import { loginSchema } from "@/app/validationSchemas";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    user_role: "admin",
  });

  const [errors, setErrors] = useState({
    invalidCredentials: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const resetErrors = () => {
    setErrors({ email: "", password: "", invalidCredentials: "" });
  };

  const handleSubmit = async () => {
    resetErrors();
    const validation = loginSchema.safeParse(userDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

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
    } else {
      setErrors({
        email: "",
        password: "",
        invalidCredentials: "Invalid Credentials.",
      });
    }
  };

  return (
    <Flex className="h-full w-full">
      <Flex className="w-2/3 h-full">
        <img
          src="https://images.pexels.com/photos/4252167/pexels-photo-4252167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="object-cover"
        />
      </Flex>
      <Flex
        direction={"column"}
        gap={"1"}
        justify={"center"}
        align={"center"}
        className="h-full w-1/3 bg-white"
      >
        <Heading size={"8"} mb={"4"} align={"center"}>
          Welcome To Regift <span className="text-blue-700">Admin</span>.
        </Heading>

        <Text className="text-xs text-red-400" my={"2"}>
          {errors.invalidCredentials}
        </Text>

        <Flex direction={"column"} gap={"1"}>
          {errors.email && (
            <Text className="text-xs text-red-400">{errors.email}</Text>
          )}
          <TextField.Root className="w-96">
            <TextField.Slot>
              <EnvelopeClosedIcon height="16" width="16" />
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
        </Flex>

        <Flex direction={"column"} gap={"1"} mb={"4"}>
          {errors.password && (
            <Text className="text-xs text-red-400" mt={"2"}>
              {errors.password}
            </Text>
          )}
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
        </Flex>

        <Button variant="surface" className="w-96" onClick={handleSubmit}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
