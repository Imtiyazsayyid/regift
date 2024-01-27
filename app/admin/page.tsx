import { Flex, Heading, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Flex
        align={"center"}
        justify={"center"}
        className="h-full w-full p-8"
        direction={"column"}
        gap={"2"}
      >
        <Heading size={{ initial: "4", md: "9" }} align={"center"}>
          Welcome To <span className="text-blue-600">ReGift</span> Admin.
        </Heading>
        <Text
          className="md:w-1/4 text-slate-600"
          size={{ initial: "1", md: "3" }}
          align={"center"}
        >
          The place where you can donate freely while being assured it goes to
          the right person.
        </Text>
      </Flex>
    </main>
  );
}
