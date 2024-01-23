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
import { donatedItemSchema } from "../../validationSchemas";
import CategoryFilter from "../../components/CategoryFilter";
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
  title?: string;
  quantity?: number;
  categoryId?: number;
  image?: string;
  condition?: string;
  approvalStatus?: string;
  description?: string;
  donorId?: number;
}

const DonatedItemForm = ({
  id,
  title,
  quantity,
  image,
  categoryId,
  description,
  condition,
  approvalStatus,
  donorId,
}: Props) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllCategories = async () => {
    const res = await AdminServices.getAllCategories();
    if (!res.status) {
      toast.error("Could Not Get Categories");
      return;
    }
    setCategories(res.data.data);
  };

  const [donatedItemDetails, setDonatedItemDetails] = useState({
    id: null as number | undefined | null,
    quantity: null as number | null,
    title: "",
    condition: "",
    approvalStatus: "",
    categoryId: null as number | null,
    image: "",
    description: "",
    donorId: null as number | null,
  });

  useEffect(() => {
    setDonatedItemDetails({
      id: id,
      title: title || "",
      image: image || "",
      condition: condition || "",
      approvalStatus: approvalStatus || "",
      categoryId: categoryId || null,
      donorId: donorId || null,
      quantity: quantity || null,
      description: description || "",
    });

    getAllCategories();
  }, [
    id,
    title,
    image,
    quantity,
    description,
    donorId,
    condition,
    approvalStatus,
    categoryId,
  ]);

  const [errors, setErrors] = useState({
    title: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      title: "",
    }));

    const validation = donatedItemSchema.safeParse(donatedItemDetails);

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

    const res = await AdminServices.saveDonatedItem(donatedItemDetails);

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
                setDonatedItemDetails({
                  ...donatedItemDetails,
                  image: info.url,
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
                    size={"9"}
                    my={"9"}
                    src={donatedItemDetails.image}
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
        <Flex direction={"column"} className="w-1/3" gap={"1"}>
          <Text className="text-xs text-slate-400">Title</Text>
          <Text className="text-xs text-red-400">{errors.title}</Text>
          <TextField.Root>
            <TextField.Input
              value={donatedItemDetails.title}
              size={"2"}
              onChange={(e) =>
                setDonatedItemDetails({
                  ...donatedItemDetails,
                  title: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        <Flex direction={"column"} className="w-1/6" gap={"1"}>
          <Text className="text-xs text-slate-400">Quantity</Text>
          <Text className="text-xs text-red-400">{errors.title}</Text>
          <TextField.Root>
            <TextField.Input
              value={donatedItemDetails.quantity?.toString()}
              size={"2"}
              type="number"
              onChange={(e) =>
                setDonatedItemDetails({
                  ...donatedItemDetails,
                  quantity: parseInt(e.target.value),
                })
              }
            />
          </TextField.Root>
        </Flex>

        <Flex direction={"column"} className="w-1/6" gap={"1"}>
          <Text className="text-xs text-slate-400">Category</Text>
          <Text className="text-xs text-red-400">{errors.title}</Text>

          <Select.Root
            value={donatedItemDetails.categoryId?.toString()}
            onValueChange={(val) =>
              setDonatedItemDetails({
                ...donatedItemDetails,
                categoryId: parseInt(val),
              })
            }
          >
            <Select.Trigger />
            <Select.Content position="popper">
              {categories.map((category) => (
                <Select.Item value={category.id.toString()} key={category.id}>
                  {category.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction={"column"} className="w-1/6" gap={"1"}>
          <Text className="text-xs text-slate-400">Condition</Text>
          <Text className="text-xs text-red-400">{errors.title}</Text>

          <Select.Root
            value={donatedItemDetails.condition}
            onValueChange={(val) =>
              setDonatedItemDetails({
                ...donatedItemDetails,
                condition: val,
              })
            }
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Item value="new">New</Select.Item>
              <Select.Item value="like_new">Like New</Select.Item>
              <Select.Item value="used_good">Good</Select.Item>
              <Select.Item value="used_fair">Fair</Select.Item>
              <Select.Item value="used_poor">Poor</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction={"column"} className="w-1/6" gap={"1"}>
          <Text className="text-xs text-slate-400">Approval Status</Text>
          <Text className="text-xs text-red-400">{errors.title}</Text>
          <Select.Root
            value={donatedItemDetails.approvalStatus}
            onValueChange={(val) =>
              setDonatedItemDetails({
                ...donatedItemDetails,
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
        <Flex direction={"column"} className="w-full h-40" gap={"1"}>
          <Text className="text-xs text-slate-400">Description</Text>
          <TextArea
            className="h-full w-full"
            value={donatedItemDetails.description}
            onChange={(e) =>
              setDonatedItemDetails({
                ...donatedItemDetails,
                description: e.target.value,
              })
            }
          />
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

export default DonatedItemForm;
