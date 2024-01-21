"use client";
import {
  Avatar,
  Button,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { donorSchema } from "../validationSchemas";
import * as AdminServices from "../Services/AdminServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

interface Props {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
  profileImg?: string;
  address?: string;
}

const DonorForm = ({
  id,
  firstName,
  lastName,
  email,
  password,
  gender,
  profileImg,
  address,
}: Props) => {
  const router = useRouter();

  const [donorDetails, setDonorDetails] = useState({
    id: null as number | undefined | null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    profileImg: "",
    address: "",
  });

  useEffect(() => {
    setDonorDetails({
      id: id,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      gender: gender || "",
      profileImg: profileImg || "",
      address: address || "",
    });
  }, [id, firstName, lastName, email, password, gender, profileImg, address]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
    }));

    const validation = donorSchema.safeParse(donorDetails);

    if (!validation.success) {
      console.log(validation.error.errors);
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await AdminServices.saveDonor(donorDetails);

    if (!res.data.status) {
      toast.error("Failed To Save");
      return;
    }

    toast.success("Saved Successfully");
    router.back();
  };

  return (
    <Flex className="w-full h-full px-10" direction={"column"} gap={"5"}>
      {/* row 1 */}
      <Flex className="w-full" gap={"4"} align={"end"}>
        <Flex className="w-full" justify={"center"} gap={"1"}>
          <Flex className="w-40">
            <CldUploadWidget
              options={{
                sources: ["local", "url"],
                multiple: false,
                cropping: true,
                styles: {
                  palette: {
                    window: "#ffffff",
                    sourceBg: "#f4f4f5",
                    windowBorder: "#90a0b3",
                    tabIcon: "#000000",
                    inactiveTabIcon: "#555a5f",
                    menuIcons: "#555a5f",
                    link: "#0433ff",
                    action: "#339933",
                    inProgress: "#0433ff",
                    complete: "#339933",
                    error: "#cc0000",
                    textDark: "#000000",
                    textLight: "#fcfffd",
                  },
                  fonts: {
                    default: null,
                    "sans-serif": {
                      url: null,
                      active: true,
                    },
                  },
                },
              }}
              uploadPreset="oekh1dfb"
              onUpload={(result) => {
                if (result.event !== "success") return;
                const info = result.info as CloudinaryResult;
                setDonorDetails({
                  ...donorDetails,
                  profileImg: info.url,
                });
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => {
                    open();
                  }}
                >
                  <Avatar
                    fallback={"?"}
                    radius="full"
                    size={"9"}
                    mb={"9"}
                    src={donorDetails.profileImg}
                    className="cursor-pointer"
                  />
                </button>
              )}
            </CldUploadWidget>
          </Flex>
        </Flex>
      </Flex>

      {/* row 2 */}
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* student first name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">First Name</Text>
          <Text className="text-xs text-red-400">{errors.firstName}</Text>
          <TextField.Root>
            <TextField.Input
              value={donorDetails.firstName}
              size={"2"}
              onChange={(e) =>
                setDonorDetails({
                  ...donorDetails,
                  firstName: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* student last name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Last Name</Text>
          <Text className="text-xs text-red-400">{errors.lastName}</Text>
          <TextField.Root>
            <TextField.Input
              value={donorDetails.lastName}
              size={"2"}
              onChange={(e) =>
                setDonorDetails({
                  ...donorDetails,
                  lastName: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Student email */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Email</Text>
          <Text className="text-xs text-red-400">{errors.email}</Text>
          <TextField.Root>
            <TextField.Input
              value={donorDetails.email}
              onChange={(e) =>
                setDonorDetails({
                  ...donorDetails,
                  email: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
      </Flex>

      {/* row 3 */}
      <Flex className="w-full" gap={"4"} align={"end"}>
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Password</Text>
          <Text className="text-xs text-red-400">{errors.password}</Text>
          <TextField.Root>
            <TextField.Input
              value={donorDetails.password}
              size={"2"}
              onChange={(e) =>
                setDonorDetails({
                  ...donorDetails,
                  password: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Gender</Text>
          <Text className="text-xs text-red-400">{errors.gender}</Text>
          <Select.Root
            value={donorDetails.gender}
            onValueChange={(val) =>
              setDonorDetails({
                ...donorDetails,
                gender: val,
              })
            }
          >
            <Select.Trigger className="w-full" />
            <Select.Content position="popper">
              <Select.Item value="male">Male</Select.Item>
              <Select.Item value="female">Female</Select.Item>
              <Select.Item value="other">Other</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Placeholder Field</Text>
          <TextField.Root>
            <TextField.Input />
          </TextField.Root>
        </Flex>
      </Flex>

      {/* row 4 */}
      <Flex className="w-full" gap={"4"} align={"end"}>
        <Flex direction={"column"} className="w-1/3 h-40" gap={"1"}>
          <Text className="text-xs text-slate-400">Address</Text>
          <TextArea
            className="h-full w-full"
            value={donorDetails.address}
            onChange={(e) =>
              setDonorDetails({
                ...donorDetails,
                address: e.target.value,
              })
            }
          />
        </Flex>
        <Flex className="w-1/3"></Flex>
        <Flex className="w-1/3"></Flex>
      </Flex>

      <Flex justify={"center"} mt={"9"}>
        <Flex className="w-1/3" gap={"2"}>
          <Button onClick={() => handleSave()} className="w-1/2">
            Save
          </Button>
          <Button onClick={() => router.back()} className="w-1/2" color="red">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DonorForm;
