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
import { organisationSchema } from "../validationSchemas";
import * as AdminServices from "../Services/AdminServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

interface Props {
  id?: number;
  name?: string;
  acronym?: string;
  email?: string;
  password?: string;
  websiteUrl?: string;
  logo?: string;
  address?: string;
  approvalStatus?: string;
}

const OrganisationForm = ({
  id,
  name,
  acronym,
  email,
  password,
  websiteUrl,
  logo,
  address,
  approvalStatus,
}: Props) => {
  const router = useRouter();

  const [organisationDetails, setOrganisationDetails] = useState({
    id: null as number | undefined | null,
    name: "",
    acronym: "",
    email: "",
    password: "",
    websiteUrl: "",
    logo: "",
    address: "",
    approvalStatus: "pending",
  });

  useEffect(() => {
    setOrganisationDetails({
      id: id,
      name: name || "",
      acronym: acronym || "",
      email: email || "",
      password: password || "",
      websiteUrl: websiteUrl || "",
      logo: logo || "",
      address: address || "",
      approvalStatus: approvalStatus || "pending",
    });
  }, [id, name, acronym, email, password, websiteUrl, logo, address]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    websiteUrl: "",
    address: "",
    approvalStatus: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      name: "",
      email: "",
      password: "",
      websiteUrl: "",
      address: "",
      approvalStatus: "",
    }));

    const validation = organisationSchema.safeParse(organisationDetails);

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

    const res = await AdminServices.saveOrganisation(organisationDetails);

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
                setOrganisationDetails({
                  ...organisationDetails,
                  logo: info.url,
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
                    src={organisationDetails.logo}
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
        {/* Organisation name */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Name</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <TextField.Root>
            <TextField.Input
              value={organisationDetails.name}
              size={"2"}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  name: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Acronym</Text>
          <TextField.Root>
            <TextField.Input
              value={organisationDetails.acronym}
              size={"2"}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  acronym: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Organisation email */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Email</Text>
          <Text className="text-xs text-red-400">{errors.email}</Text>
          <TextField.Root>
            <TextField.Input
              value={organisationDetails.email}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
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
              value={organisationDetails.password}
              size={"2"}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  password: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">WebsiteUrl</Text>
          <Text className="text-xs text-red-400">{errors.websiteUrl}</Text>
          <Select.Root
            value={organisationDetails.websiteUrl}
            onValueChange={(e) =>
              setOrganisationDetails({
                ...organisationDetails,
                websiteUrl: e.target.value,
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
        </Flex> */}

        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Website Url</Text>
          <Text className="text-xs text-red-400">{errors.websiteUrl}</Text>
          <TextField.Root>
            <TextField.Input
              type="url" // Set the input type to "url"
              value={organisationDetails.websiteUrl}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  websiteUrl: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Approval Status</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <Select.Root
            value={organisationDetails.approvalStatus}
            onValueChange={(val) =>
              setOrganisationDetails({
                ...organisationDetails,
                approvalStatus: val,
              })
            }
          >
            <Select.Trigger className="w-full" />
            <Select.Content position="popper">
              <Select.Item value="pending">Pending</Select.Item>
              <Select.Item value="approved">Approved</Select.Item>
              <Select.Item value="rejected">Rejected</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>

      {/* row 4 */}
      <Flex className="w-full" gap={"4"} align={"end"}>
        <Flex direction={"column"} className="w-1/3 h-40" gap={"1"}>
          <Text className="text-xs text-slate-400">Address</Text>
          <Text className="text-xs text-red-400">{errors.address}</Text>
          <TextArea
            className="h-full w-full"
            value={organisationDetails.address}
            onChange={(e) =>
              setOrganisationDetails({
                ...organisationDetails,
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

export default OrganisationForm;
