import { Flex, Select, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { Category } from "../interfaces/CategoryInterface";
import * as AdminServices from "../Services/AdminServices";
import toast from "react-hot-toast";

interface Props {
  category: string;
  setCategory: (approvalStatus: string) => void;
}

const ApprovalStatusFilter = ({ category, setCategory }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllCategories = async () => {
    const res = await AdminServices.getAllCategories();
    if (!res.status) {
      toast.error("Could Not Get Categories");
      return;
    }
    setCategories(res.data.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  if (categories.length === 0) return null;

  return (
    <Flex direction={"column"} className="w-fit" gap={"1"}>
      <Text className="text-xs text-slate-500">Category</Text>
      <Select.Root value={category} onValueChange={(val) => setCategory(val)}>
        <Select.Trigger className="w-40" />
        <Select.Content position="popper">
          <Select.Item value={"all"}>All</Select.Item>
          {categories.map((category) => (
            <Select.Item value={category.id.toString()} key={category.id}>
              {category.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default ApprovalStatusFilter;
