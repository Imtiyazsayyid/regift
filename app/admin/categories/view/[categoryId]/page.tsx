"use client";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { Category } from "@/app/interfaces/CategoryInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { humanize, breakLines } from "../../../../helpers/formatting";


interface Props{
  params: {
    categoryId: string,
  }
}

const ViewCategoryPage = ({ params }: Props) => {
  const router = useRouter();
  const [category, setCategory] = useState<Category>();

  const getSingleCategory = async () => {
    const res = await AdminServices.getSingleCategory(params.categoryId);
    console.log(res);

    if(!res.status) {
       toast.error("Could Not Get Category");
       router.back();
    }
    setCategory(res.data.data);
  };

  useEffect(() => {
    getSingleCategory();
  }, []);

  return (
    <Flex className="w-full p-10 overflow-hidden overflow-y-auto" direction={"column"} gap={"5"} align={"center"}>
      <Flex direction={"column"} align={"center"} gap={"2"}>
        <Heading align={"center"}>
          {category?.name}
        </Heading>
        <Text className="text-sm text-slate-500">Category</Text>
      </Flex>
      <Seperator />
      <Grid columns={"3"} className="w-full" gapY={"9"} p={"9"}>
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Name</Text>
          <Text className="text-center">{category?.name || "-"}</Text>
        </Flex>

        {/* <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Last Name</Text>
          <Text className="text-center">{donor?.lastName || "-"}</Text>
        </Flex> */}

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Key</Text>
          <Text className="text-center">{category?.key || "-"}</Text>
        </Flex>

        {/* <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Gender</Text>
          <Text className="text-center">{humanize(donor?.gender) || "-"} </Text>
        </Flex> */}

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Description</Text>
          <Flex direction={"column"} align={"center"}>
            {breakLines(category?.description, Text) || "-"}{" "}
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default ViewCategoryPage;
