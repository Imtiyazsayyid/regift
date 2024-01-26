"use client";
import { Flex, Heading } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    inventoryItemId: string;
  };
}

const EditInventoryItem = ({ params }: Props) => {
  const [donatedItem, setDonatedItem] = useState<DonatedItem>();
  const router = useRouter();

  const getSingleDonatedItem = async () => {
    const res = await AdminServices.getSingleDonatedItem(
      params.inventoryItemId
    );
    if (!res.status) {
      toast.error("Could Not Get Donated Item.");
      router.back();
    }
    setDonatedItem(res.data.data);
  };

  useEffect(() => {
    getSingleDonatedItem();
  }, []);

  return (
    <Flex
      className="w-full p-10 overflow-hidden overflow-y-auto"
      direction={"column"}
      gap={"5"}
      align={"center"}
    >
      <Heading align={"center"}>Edit Donated Item</Heading>
      <Seperator />
      <Form
        id={donatedItem?.id}
        title={donatedItem?.title}
        image={donatedItem?.image}
        isPickedUp={donatedItem?.isPickedUp}
        description={donatedItem?.description || ""}
        categoryId={donatedItem?.categoryId}
        approvalStatus={donatedItem?.approvalStatus || ""}
        condition={donatedItem?.condition}
        donorId={donatedItem?.donorId}
      />
    </Flex>
  );
};

export default EditInventoryItem;
