import { Flex, Heading, Text } from "@radix-ui/themes";
import MonthlyOrderChart from "./charts/MonthlyOrderChart";
import MonthlyDonorChart from "./charts/MonthlyDonorChart";
import MonthlyOrganisationChart from "./charts/MonthlyOrganisationChart";
import MonthlyDonationChart from "./charts/MonthlyDonationsChart";

export default function Home() {
  return (
    <main className="h-full w-full p-10 overflow-hidden overflow-y-auto">
      <Flex direction={"column"} gap={"2"}>
        <Flex className="h-fit w-full" gap={"2"}>
          <Flex className="w-1/2 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyOrganisationChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
          <Flex className="w-1/2 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyDonorChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
        </Flex>
        <Flex className="h-fit w-full" gap={"2"}>
          <Flex className="w-1/2 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyOrderChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
          <Flex className="w-1/2 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyDonationChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
}
