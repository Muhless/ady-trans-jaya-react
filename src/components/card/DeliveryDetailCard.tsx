import React from "react";
import DeliverySummaryCard from "./DeliverySummaryCard";

const DeliveryDetailCard = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="flex gap-3">
        <DeliverySummaryCard
          desc="Sedang Berlangsung"
          textColor="text-[#342fa3]"
        />
        <DeliverySummaryCard
          desc="Selesai"
          className="bg-[#f0fdf4]"
          textColor="text-[#136735]"
        />
      </div>
      <div className="flex gap-3">
        <DeliverySummaryCard desc="Menunggu Persetujuan" />
        <DeliverySummaryCard desc="DIbatalkan" />
      </div>
    </div>
  );
};

export default DeliveryDetailCard;
