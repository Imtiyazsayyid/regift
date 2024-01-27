"use client";
import { Flex, Heading } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { Category } from "@/app/interfaces/CategoryInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    categoryId: string;
  };
}

const EditCategoryPage = ({ params }: Props) => {
  const [category, setCategory] = useState<Category>();
  const router = useRouter();

  const getSingleCategory = async () => {
    const res = await AdminServices.getSingleDonor(params.categoryId);
    if (!res.status) {
      toast.error("Could Not Get Category.");
      router.back();
    }
    setCategory(res.data.data);
  };

  useEffect(() => {
    getSingleCategory();
  }, []);

  return (
    <Flex
      className="w-full p-10 overflow-hidden overflow-y-auto"
      direction={"column"}
      gap={"5"}
      align={"center"}
    >
      <Heading align={"center"}>Edit Category</Heading>
      <Seperator />
      <Form
        id={category?.id}
        name={category?.name}
        key={category?.key || ""}
        description={category?.description || ""}
      />
    </Flex>
  );
}

export default EditCategoryPage;