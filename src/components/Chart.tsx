import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Pengiriman",
      data: [3, 5, 1, 7],
      backgroundColor: "#1E88E5",
      borderColor: "#1E88E5",
      tension: 0.3,
      fill: false,
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      font: {
        family: "Comforta, sans-serif",
        size: 16,
        weight: "lighter"
      },
      color: "#000000",
      padding: {
        top: 10,
        bottom: 30,
      },
    },
  },
};

const ChartComponent = () => {
  return <Line data={data} options={options} />;
};

export default ChartComponent;
