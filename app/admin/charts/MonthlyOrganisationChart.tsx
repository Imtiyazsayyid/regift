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
      text: "Monthly Organisations",
    },
  },
};

interface Props {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export default function MonthlyOrganisationChart({ dateRange }: Props) {
  const [data, setData] = useState<any>();

  const getOrganisationByMonth = async () => {
    const res = await AdminServices.chartOrganisations({
      startDate: dateRange.startDate,
      fromDate: dateRange.endDate,
    });

    let labels = res.data.data.map((group: any) => group.month);
    let chartData = res.data.data.map((group: any) => group.organisations);

    setData({
      labels: [...labels],
      datasets: [
        {
          fill: true,
          label: "Organisations",
          data: [...chartData],
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
      ],
    });
  };

  useEffect(() => {
    getOrganisationByMonth();
  }, [dateRange.startDate, dateRange.endDate]);

  return <>{data && <Line options={{ ...options }} data={data} />}</>;
}
