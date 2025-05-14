import React from "react";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ClockFading,
  GripVerticalIcon,
  Grip,
  ArrowDown,
  FileDown,
  EllipsisIcon,
} from "lucide-react";

const stats = [
  {
    label: "Total Pengiriman",
    value: 28,
    icon: <Package className="w-6 h-6 text-blue-500" />,
  },
  {
    label: "Dalam Pengiriman",
    value: 10,
    icon: <Truck className="w-6 h-6 text-yellow-500" />,
  },
  {
    label: "Selesai",
    value: 15,
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
  },
  {
    label: "Pending",
    value: 5,
    icon: <ClockFading className="w-6 h-6 text-purple-500" />,
  },
  {
    label: "Gagal",
    value: 3,
    icon: <XCircle className="w-6 h-6 text-red-500" />,
  },
];

const StatCards = () => {
  return (
    <div className="">
      <div className="flex justify-end items-center mb-2 gap-3">
        <p className="text-sm text-gray-700">Urutkan</p>
        <EllipsisIcon />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded p-4 text-center space-y-2"
          >
            <div className="flex justify-center">{item.icon}</div>
            <p className="text-sm text-gray-600">{item.label}</p>
            <p className="text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCards;
