import React from "react";
import UserIconComponent from "../UserIcon";
import Card from ".";

type ProfileCardProps = {
  name: string;
  phone: string;
  address: string;
  status: boolean;
  onClick?: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  phone,
  address,
  status,
  onClick,
}) => {
  return (
    <Card
      className="bg-secondary hover:bg-third transition-all hover:duration-300"
      onClick={onClick}
    >
      <div className="grid grid-cols-3 p-4">
        <div className="col-span-1 flex items-center">
          <UserIconComponent
            className="size-24 rounded-full object-cover"
            src="assets/images/profile/profile-picture.png"
          />
        </div>
        <div className="col-span-2 flex flex-col px-3 text-sm py-2">
          <h1 className="text-lg underline font-bold">{name}</h1>
          <p>{phone}</p>
          <p>{address}</p>
          <p
            className={`inline-block text-center py-1 rounded text-white font-semibold mt-2 ${
              status ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {status ? "tersedia" : "tidak tersedia"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
