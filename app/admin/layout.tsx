import { Flex } from "@radix-ui/themes";
import HorizontalNavBar from "./HorizontalNavBar";
import VerticalNavbar from "./VerticalNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex className="w-full h-full" gap={"2"}>
      {/*  className="min-w-[350px] bg-white border rounded-e-lg overflow-hidden shadow-md fixed h-full" */}
      <Flex>
        <VerticalNavbar />
      </Flex>
      <Flex className="w-full p-2" direction={"column"} gap={"2"}>
        <Flex className="bg-white border rounded-lg overflow-hidden shadow-sm">
          <HorizontalNavBar />
        </Flex>
        <Flex className="h-full w-full rounded-lg border overflow-hidden bg-white p-5 shadow-sm">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
