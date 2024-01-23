import { Flex, Heading } from "@radix-ui/themes";
import Form from "../Form";
import Seperator from "@/app/components/Seperator";

const DonorsPage = () => {
  return (
    <Flex
      className="w-full p-10 overflow-hidden overflow-y-auto"
      direction={"column"}
      gap={"5"}
      align={"center"}
    >
      <Heading align={"center"}>Add New Donor</Heading>
      <Seperator />
      <Form />
    </Flex>
  );
};

export default DonorsPage;
