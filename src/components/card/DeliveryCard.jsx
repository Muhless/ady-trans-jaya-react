import React from "react";

function DeliveryCard({className}) {
  return (
    <div className={`${className} flex flex-row items-center justify-center p-1`}>
      <img
        src="/assets/images/home.png"
        alt="menunggu persetujuan"
        className="size-20"
      />
      <div className="flex flex-col items-center">
        <span>Menunggu</span>
        <span>Persetujuan</span>
        <span className="text-4xl">4</span>
      </div>
    </div>
  );
}

export default DeliveryCard;
