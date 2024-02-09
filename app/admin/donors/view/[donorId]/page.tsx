"use client";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { Donor } from "@/app/interfaces/DonorInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { humanize, breakLines } from "../../../../helpers/formatting";

interface Props {
  params: {
    donorId: string;
  };
}

const ViewDonorPage = ({ params }: Props) => {
  const [donor, setDonor] = useState<Donor>();
  const router = useRouter();

  const getSingleDonor = async () => {
    const res = await AdminServices.getSingleDonor(params.donorId);
    console.log(res);

    if (!res.status) {
      toast.error("Could Not Get Donor.");
      router.back();
    }
    setDonor(res.data.data);
  };

  useEffect(() => {
    getSingleDonor();
  }, []);

  return (
    <Flex className="w-full p-10 overflow-hidden overflow-y-auto" direction={"column"} gap={"5"} align={"center"}>
      <Flex direction={"column"} align={"center"} gap={"2"}>
        <Heading align={"center"}>
          {donor?.firstName} {donor?.lastName}
        </Heading>
        <Text className="text-sm text-slate-500">Donor</Text>
      </Flex>
      <Seperator />
      <Grid columns={"3"} className="w-full" gapY={"9"} p={"9"}>
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">First Name</Text>
          <Text className="text-center">{donor?.firstName || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Last Name</Text>
          <Text className="text-center">{donor?.lastName || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Email</Text>
          <Text className="text-center">{donor?.email || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Gender</Text>
          <Text className="text-center">{humanize(donor?.gender) || "-"} </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Address</Text>
          <Flex direction={"column"} align={"center"}>
            {breakLines(donor?.address, Text) || "-"}{" "}
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default ViewDonorPage;
