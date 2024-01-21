"use client";
import { Flex, Heading } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../Services/AdminServices";
import { Organisation } from "@/app/interfaces/OrganisationInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    organisationId: string;
  };
}

const page = ({ params }: Props) => {
  const [organisation, setOrganisation] = useState<Organisation>();
  const router = useRouter();

  const getSingleOrganisation = async () => {
    const res = await AdminServices.getSingleOrganisation(
      params.organisationId
    );
    if (!res.status) {
      toast.error("Could Not Get Organisation.");
      router.back();
    }
    setOrganisation(res.data.data);
  };

  useEffect(() => {
    getSingleOrganisation();
  }, []);

  return (
    <Flex
      className="w-full p-10 overflow-hidden overflow-y-auto"
      direction={"column"}
      gap={"5"}
      align={"center"}
    >
      <Heading align={"center"}>Edit Organisation</Heading>
      <Seperator />
      <Form
        id={organisation?.id}
        name={organisation?.name}
        acronym={organisation?.acronym || ""}
        email={organisation?.email}
        password={organisation?.password}
        websiteUrl={organisation?.websiteUrl || ""}
        logo={organisation?.logo || ""}
        address={organisation?.address || ""}
        approvalStatus={organisation?.approvalStatus}
      />
    </Flex>
  );
};

export default page;
