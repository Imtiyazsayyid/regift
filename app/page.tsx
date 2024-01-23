"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/admin");
  }

  return (
    <main className="h-full w-full">
      <Flex
        align={"center"}
        justify={"center"}
        className="h-full w-full"
        direction={"column"}
        gap={"4"}
      >
        <Heading size={"9"}>
          Welcome To <span className="text-blue-600">ReGift</span> Admin.
        </Heading>
        <Text className="w-1/4 text-slate-600" align={"center"}>
          The place where you can donate freely while being assured it goes to
          the right person.
        </Text>
      </Flex>
    </main>
  );
}
