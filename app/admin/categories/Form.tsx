"use client";
import { Avatar, Button, Flex, Select, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { categorySchema } from "../../validationSchemas";
import * as AdminServices from "../../Services/AdminServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Category } from "../../interfaces/CategoryInterface";

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

interface Props {
  id?: number;
  name?: string;
  categoryKey?: string;
  description?: string;
}

const CategoryForm = ({ id, name, categoryKey: key, description }: Props) => {
  const router = useRouter();

  const [categoryDetails, setCategoryDetails] = useState({
    id: null as number | undefined | null,
    name: "",
    key: "",
    description: "",
  });

  useEffect(() => {
    setCategoryDetails({
      id: id,
      name: name || "",
      key: key || "",
      description: description || "",
    });
  }, [id, name, key, description]);

  const [errors, setErrors] = useState({
    name: "",
    key: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      name: "",
      key: "",
    }));

    const validation = categorySchema.safeParse(categoryDetails);

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

    const res = await AdminServices.saveCategory(categoryDetails);

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
        {/* <Flex className="w-full" justify={"center"} gap={"1"}>
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
                setCategoryDetails({
                  ...categoryDetails,
                  key: info.public_id,
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
                src={categoryDetails.key} // Assuming 'key' is the URL of the image
                className="cursor-pointer"
                />
                </button>
              )}
            </CldUploadWidget>
          </Flex>
        </Flex> */}
      </Flex>

      {/* row 2 */}
      <Flex className="w-full" gap={"4"} align={"end"}>
        {/* Category name*/}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Name</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <TextField.Root>
            <TextField.Input
              value={categoryDetails.name}
              size={"2"}
              onChange={(e) =>
                setCategoryDetails({
                  ...categoryDetails,
                  name: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Category Key */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Key</Text>
          <Text className="text-xs text-red-400">{errors.key}</Text>
          <TextField.Root>
            <TextField.Input
              value={categoryDetails.key}
              size={"2"}
              onChange={(e) =>
                setCategoryDetails({
                  ...categoryDetails,
                  key: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Category Description */}
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Description</Text>
          {/* <Text className="text-xs text-red-400">{errors.description}</Text> */}
          <TextField.Root>
            <TextField.Input
              value={categoryDetails.description}
              onChange={(e) =>
                setCategoryDetails({
                  ...categoryDetails,
                  description: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
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

export default CategoryForm;
