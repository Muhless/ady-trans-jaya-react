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
  plugins,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
      data: [120, 150, 120, 130],
      backgroundColor: "#1E88E5",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    Legend: {
      position: "top",
    },
    title: {
      display: true,
      Text: "Grafik Pengiriman",
    },
  },
};

const ChartComponent = () => {
  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
