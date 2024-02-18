"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import * as AdminServices from "../../Services/AdminServices";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Donors",
    },
  },
};

interface Props {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export default function MonthlyDonorChart({ dateRange }: Props) {
  const [data, setData] = useState<any>();

  const getDonorByMonth = async () => {
    const res = await AdminServices.chartDonors({
      startDate: dateRange.startDate,
      fromDate: dateRange.endDate,
    });

    let labels = res.data.data.map((group: any) => group.month);
    let chartData = res.data.data.map((group: any) => group.donors);

    setData({
      labels: [...labels],
      datasets: [
        {
          fill: true,
          label: "Donors",
          data: [...chartData],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    });
  };

  useEffect(() => {
    getDonorByMonth();
  }, [dateRange.startDate, dateRange.endDate]);

  return <>{data && <Line options={{ ...options }} data={data} />}</>;
}
