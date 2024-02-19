"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import MonthlyOrderChart from "./charts/MonthlyOrderChart";
import MonthlyDonorChart from "./charts/MonthlyDonorChart";
import MonthlyOrganisationChart from "./charts/MonthlyOrganisationChart";
import MonthlyDonationChart from "./charts/MonthlyDonationsChart";
import { useEffect, useState } from "react";

import * as AdminServices from "../Services/AdminServices";
import toast from "react-hot-toast";
import Seperator from "../components/Seperator";
import CountUp from "react-countup";
import OrdersByCategory from "./charts/OrdersByCategory";
import DonationsByCategory from "./charts/DonationsByCategory";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [countData, setCountData] = useState({
    donorsCount: 0,
    organisationsCount: 0,
    ordersCount: 0,
    donationsCount: 0,
    totalUsersCount: 0,
  });

  const getCountData = async () => {
    const res = await AdminServices.chartCounts();

    if (!res.data.status) {
      toast.error("Could Not Fetch Details");
      return;
    }

    setCountData(res.data.data);
  };

  useEffect(() => {
    getCountData();
  }, []);

  return (
    <main className="h-full w-full p-10 overflow-hidden overflow-y-auto">
      <Flex direction={"column"} gap={"2"}>
        <Flex className="mt-10" justify={"center"}>
          <Heading size={"9"}>ReGift Analytics.</Heading>
        </Flex>
        <Flex justify={"center"}>
          <Flex className="w-1/2">
            <Seperator className="my-10" />
          </Flex>
        </Flex>
        <Flex gap={"2"}>
          <Flex
            className="h-40 border w-1/5 shadow-md rounded-xl"
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={"1"}
          >
            <Text className="text-sm text-slate-500">All Users</Text>
            <Heading size={"9"}>
              <CountUp end={countData.totalUsersCount} />
            </Heading>
          </Flex>
          <Flex
            className="h-40 border w-1/5 shadow-md rounded-xl cursor-pointer"
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={"1"}
            onClick={() => router.push("/admin/donors")}
          >
            <Text className="text-sm text-slate-500">Donors</Text>
            <Heading size={"9"}>
              <CountUp end={countData.donorsCount} />
            </Heading>
          </Flex>
          <Flex
            className="h-40 border w-1/5 shadow-md rounded-xl cursor-pointer"
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={"1"}
            onClick={() => router.push("/admin/organisations")}
          >
            <Text className="text-sm text-slate-500">Organisations</Text>
            <Heading size={"9"}>
              <CountUp end={countData.organisationsCount} />
            </Heading>
          </Flex>
          <Flex
            className="h-40 border w-1/5 shadow-md rounded-xl cursor-pointer"
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={"1"}
            onClick={() => router.push("/admin/orders")}
          >
            <Text className="text-sm text-slate-500">Orders</Text>
            <Heading size={"9"}>
              <CountUp end={countData.ordersCount} />
            </Heading>
          </Flex>
          <Flex
            className="h-40 border w-1/5 shadow-md rounded-xl cursor-pointer"
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={"1"}
            onClick={() => router.push("/admin/donated-items")}
          >
            <Text className="text-sm text-slate-500">Donations</Text>
            <Heading size={"9"}>
              <CountUp end={countData.donationsCount} />
            </Heading>
          </Flex>
        </Flex>

        <Flex className="h-[500px] w-full" gap={"2"}>
          <Flex className="w-3/5 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyOrderChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
          <Flex className="w-2/5 border p-10 rounded-xl shadow-md bg-white" justify={"center"}>
            <OrdersByCategory />
          </Flex>
        </Flex>

        <Flex className="h-fit w-full" gap={"2"}>
          <Flex className="w-1/2 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyOrganisationChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
          <Flex className="w-1/2 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyDonorChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
        </Flex>

        <Flex className="h-[500px] w-full" gap={"2"}>
          <Flex className="w-2/5 border p-10 rounded-xl shadow-md bg-white" justify={"center"}>
            <DonationsByCategory />
          </Flex>
          <Flex className="w-3/5 border p-10 rounded-xl shadow-md bg-white">
            <MonthlyDonationChart dateRange={{ startDate: "", endDate: "" }} />
          </Flex>
        </Flex>
        {/* <Flex className="h-[500px] w-full" gap={"2"}></Flex> */}
      </Flex>
    </main>
  );
}
