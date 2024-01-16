import { Flex, Heading, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <main className="p-10 h-full">
      <Flex
        align={"center"}
        justify={"center"}
        className="h-full"
        direction={"column"}
        gap={"2"}
      >
        <Heading className="text-title">Welcome To ReGift</Heading>
        <Text className="w-full" align={"center"}>
          The place where you can donate freely while being assured it goes to
          the right person.
        </Text>
      </Flex>
    </main>
  );
}
