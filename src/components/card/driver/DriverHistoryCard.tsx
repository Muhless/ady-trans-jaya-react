import { Calendar, MapPin } from "lucide-react";
import React from "react";
import {
  formatDateNumeric,
  getStatusClass,
} from "../../../../utils/Formatters";

interface DriverHistoryCardProps {
  delivery: {
    id: number;
    pickup_address: string;
    destination_address: string;
    delivery_date: string;
    delivery_status: string;
  };
  onClick: () => void;
}

const DriverHistoryCard: React.FC<DriverHistoryCardProps> = ({
  delivery,
  onClick,
}) => {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex text-sm justify-between">
        <div className="flex items-center">
          <MapPin size={14} className="mr-1 text-gray-500" />
          <span>{delivery.pickup_address}</span>
        </div>
        <span className="hidden md:inline">-</span>
        <div className="flex items-center">
          <span>{delivery.destination_address}</span>
        </div>
        <div className="flex items-center">
          <Calendar size={14} className="mr-1 text-gray-500" />
          <span>{formatDateNumeric(delivery.delivery_date)}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
            delivery.delivery_status
          )}`}
        >
          {delivery.delivery_status}
        </span>
      </div>
    </div>
  );
};

export default DriverHistoryCard;
