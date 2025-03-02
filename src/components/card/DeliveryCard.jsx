import React from "react";

function DeliveryCard({className, title, subTitle}) {
  return (
    <div className={`${className} flex flex-row items-center justify-center p-1 rounded-lg`}>
      {/* <img
        src="/assets/images/home.png"
        alt="menunggu persetujuan"
        className="size-20"
      /> */}
      <div className="flex flex-col items-center">
        <p className="font-semibold text-lg">{title}</p>
        <p className="font-semibold text-lg">{subTitle}</p>
        <p className="text-4xl">4</p>
      </div>
    </div>
  );
}

export default DeliveryCard;
