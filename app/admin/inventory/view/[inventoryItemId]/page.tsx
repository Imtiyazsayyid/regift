"use client";
import { Flex, Grid, Heading, Text, Avatar } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { ReactNode, useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";
import { Donor } from "@/app/interfaces/DonorInterface";
import { Category } from "@/app/interfaces/CategoryInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { humanize, breakLines } from "../../../../helpers/formatting";

interface Props {
  params: {
    inventoryItemId: string;
  };
}

const ViewInventoryPage = ({ params }: Props) => {
  const [donatedItem, setDonatedItem] = useState<DonatedItem>();
  const [donor, setDonor] = useState<Donor>();
  const [category, setCategory] = useState<Category>();

  const router = useRouter();

  const getSingleDonatedItem = async () => {
    const res = await AdminServices.getSingleDonatedItem(
      params.inventoryItemId,
    );
    console.log(res);

    if (!res.status) {
      toast.error("Could Not Get DonatedItem");
      router.back();
    }
    setDonatedItem(res.data.data);

    // Making a API call for Donor and Category
    const donorRes = await AdminServices.getSingleDonor(res.data.data.donorId);
    const categoryRes = await AdminServices.getSingleCategory(res.data.data.categoryId);

    if(categoryRes.status) {
      setCategory(categoryRes.data.data);
    }
    if(donorRes.status) {
      setDonor(donorRes.data.data);
    }
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
      {/* logo */}
      <Flex className="w-40 h-40" gap={"4"} align={"center"}>
          {donatedItem?.image && (
            <Avatar
              fallback={"?"}
              className="cursor-pointer"
              size={"9"}
              my={"9"}
              src={donatedItem?.image}
              alt={`Image of ${donatedItem.title}`}
            />
          )}
      </Flex>

      <Flex direction={"column"} align={"center"} gap={"2"}>
        <Heading align={"center"}>{donatedItem?.title}</Heading>
        <Text className="text-sm text-slate-500">Donated Item</Text>
      </Flex>
      <Seperator />
      <Grid columns={"3"} className="w-full" gapY={"9"} p={"9"}>
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Title</Text>
          <Text className="text-center">{donatedItem?.title || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Category</Text>
          <Text className="text-center">
            {category?.name || "-"}
          </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Donated By</Text>
          <Text className="text-center">
            {donor?.firstName || "-"} {" "} {donor?.lastName || "-"}
          </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Condition</Text>
          <Text className="text-center">{humanize(donatedItem?.condition) || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">
            Approval Status
          </Text>
          <Text className="text-center">{humanize(donatedItem?.approvalStatus) || "-"} </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Picked Up</Text>
          <Text className="text-center">{donatedItem?.isPickedUp ? "Yes" : "No" || "-"} </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Available</Text>
          <Text className="text-center">{donatedItem?.isAvailable ? "Yes" : "No" || "-"} </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">
            Description
          </Text>
          <Flex direction={"column"} align={"center"}>
            {donatedItem?.description || "-"}{" "}
          </Flex>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">
            Pick Up Address
          </Text>
          <Flex direction={"column"} align={"center"}>
            {breakLines(donatedItem?.pickupAddress, Text) || "-"}{" "}
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default ViewInventoryPage;
