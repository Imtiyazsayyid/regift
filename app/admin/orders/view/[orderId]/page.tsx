"use client";
import { Flex, Grid, Heading, Text, Avatar } from "@radix-ui/themes";
// import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { Order } from "@/app/interfaces/OrderInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { humanize, breakLines } from "../../../../helpers/formatting";

interface Props {
  params: {
    orderId: string;
  };
}
const ViewOrderPage = ({ params }: Props) => {
  const [order, setOrder] = useState<Order>();
  const router = useRouter();

  const getSingleOrder = async () => {
    const res = await AdminServices.getSingleOrder(params.orderId);
    console.log(res);

    if (!res.status) {
      toast.error("Could Not Get Order");
      router.back();
    }
    setOrder(res.data.data);
  };

  useEffect(() => {
    getSingleOrder();
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
          {order?.donatedItem?.image && (
            <Avatar
              fallback={"?"}
              className="cursor-pointer"
              size={"9"}
              my={"9"}
              src={order?.donatedItem?.image}
              alt={`Image of ${order?.donatedItem?.title}`}
            />
          )}
      </Flex>

      <Flex direction={"column"} align={"center"} gap={"2"}>
        <Heading align={"center"}>{order?.id}</Heading>
        <Text className="text-sm text-slate-500">Order</Text>
      </Flex>
      <Seperator />
      <Grid columns={"3"} className="w-full" gapY={"9"} p={"9"}>
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">
            Donated Item
          </Text>
          <Text className="text-center">
            {"#"} {order?.donatedItemId} {"-"}{" "}
            {order?.donatedItem?.title || "-"}
          </Text>
        </Flex>
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">
            Order Id
          </Text>
          <Text className="text-center">
            {"#"} {order?.id}
          </Text>
        </Flex>
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">
            Organisation Name
          </Text>
          <Text className="text-center">
            {"#"} {order?.organisationId} {"-"}{" "}
            {order?.organisation?.name || "-"}
          </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Order Date</Text>
          <Text className="text-center">
            {order?.created_at
              ? new Date(order.created_at).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Description</Text>
          <Flex direction={"column"} align={"center"}>
            {order?.donatedItem?.description || "-"}{" "}
          </Flex>
        </Flex>
        
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">
            Order Status
          </Text>
          <Text className="text-center">
            {humanize(order?.orderStatus) || "-"}{" "}
          </Text>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default ViewOrderPage;
