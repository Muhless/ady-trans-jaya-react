import React from "react";

type DeliveryCardProps = {
  className: string;
  title: string;
  subTitle: string;
};

const DeliveryCard: React.FC<DeliveryCardProps> = ({ className, title, subTitle }) => {
  return (
    <div
      className={`${className} flex flex-row items-center justify-center p-1 rounded-lg text-primary`}
    >
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
