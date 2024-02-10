"use client";
import { Flex, Grid, Heading, Text, Avatar } from "@radix-ui/themes";
import Form from "../../Form";
import Seperator from "@/app/components/Seperator";
import { useEffect, useState } from "react";
import * as AdminServices from "../../../../Services/AdminServices";
import { Organisation } from "@/app/interfaces/OrganisationInterface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { humanize, breakLines, abbreviate } from "../../../../helpers/formatting";
import { CldImage } from "next-cloudinary";

interface Props {
  params: {
    organisationId: string;
  };
}

const ViewOrganisationPage = ({ params }: Props) => {
  const [organisation, setOrganisation] = useState<Organisation>();
  const router = useRouter();

  const getSingleOrganisation = async () => {
    const res = await AdminServices.getSingleOrganisation(params.organisationId);
    console.log(res);

    if (!res.status) {
      toast.error("Could Not Get Organisation");
      router.back();
    }
    setOrganisation(res.data.data);
  };

  useEffect(() => {
    getSingleOrganisation();
  }, []);

  return (
    <Flex className="w-full p-10 overflow-hidden overflow-y-auto" direction={"column"} gap={"5"} align={"center"}>
      {/* logo */}
      <Flex className="w-40 h-40" gap={"4"} align={"center"}>
        <Avatar
          fallback={organisation?.acronym || "?"}
          className="cursor-pointer text-3xl"
          size={"9"}
          my={"9"}
          src={organisation?.logo || ""}
        />
      </Flex>

      <Flex direction={"column"} align={"center"} gap={"2"}>
        <Heading align={"center"}>{organisation?.name}</Heading>
        <Text className="text-sm text-slate-500">Organisation</Text>
      </Flex>
      <Seperator />
      <Grid columns={"3"} className="w-full" gapY={"9"} p={"9"}>
        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Name</Text>
          <Text className="text-center">{organisation?.name || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Acronym</Text>
          <Text className="text-center">{organisation?.acronym || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Email</Text>
          <Text className="text-center">{organisation?.email || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Approval Status</Text>
          <Text className="text-center">{humanize(organisation?.approvalStatus) || "-"} </Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Website Url</Text>
          <Text className="text-center">{organisation?.websiteUrl || "-"}</Text>
        </Flex>

        <Flex direction={"column"} gap="2">
          <Text className="text-sm text-slate-500 text-center">Address</Text>
          <Flex direction={"column"} align={"center"}>
            {breakLines(organisation?.address, Text) || "-"}{" "}
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default ViewOrganisationPage;
