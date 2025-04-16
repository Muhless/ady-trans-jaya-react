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
    },
  },
};

const ChartComponent = () => {
  return (
    <div className="h-full w-full relative">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
