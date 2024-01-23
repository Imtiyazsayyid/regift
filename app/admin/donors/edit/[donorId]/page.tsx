"use client";
import { Flex, Heading } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { Donor } from "@/app/interfaces/DonorInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    donorId: string;
  };
}

const EditDonorPage = ({ params }: Props) => {
  const [donor, setDonor] = useState<Donor>();
  const router = useRouter();

  const getSingleDonor = async () => {
    const res = await AdminServices.getSingleDonor(params.donorId);
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
    <Flex
      className="w-full p-10 overflow-hidden overflow-y-auto"
      direction={"column"}
      gap={"5"}
      align={"center"}
    >
      <Heading align={"center"}>Edit Donor</Heading>
      <Seperator />
      <Form
        id={donor?.id}
        profileImg={donor?.profileImg || ""}
        firstName={donor?.firstName}
        lastName={donor?.lastName}
        email={donor?.email}
        password={donor?.password}
        address={donor?.address || ""}
        gender={donor?.gender}
      />
    </Flex>
  );
};

export default EditDonorPage;
