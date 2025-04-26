import React from "react";
import UserIconComponent from "../UserIcon";
import Card from ".";

type ProfileCardProps = {
  name: string;
  phone: string;
  address: string;
  status: boolean;
  imageUrl?: string;
  onClick?: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  phone,
  address,
  status,
  imageUrl,
  onClick,
}) => {
  return (
    <Card
      className="bg-secondary hover:bg-third transition-all duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex p-4 items-center gap-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary"
            />
          ) : (
            <UserIconComponent className="w-24 h-24 rounded-full bg-gray-300 object-cover" />
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col flex-grow">
          <h1 className="text-xl font-bold text-primary mb-1">{name}</h1>
          <p className="text-sm">{phone}</p>
          <p className="text-xs underline">{address.toLowerCase()}</p>

          <span
            className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-md  text-center
              ${status ? "bg-green-500 text-white" : "bg-red-500 text-white"}
            `}
          >
            {status ? "Tersedia" : "Tidak Tersedia"}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
