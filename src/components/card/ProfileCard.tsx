import React from "react";
import UserIconComponent from "../UserIcon";
import Card from ".";
import { Phone, MapPin, Check, X } from "lucide-react";

type ProfileCardProps = {
  name: string;
  phone: string;
  address: string;
  status: string;
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
      className="bg-secondary hover:bg-third transition-all duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`absolute top-3 right-3 z-10 flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            status
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {status ? (
            <>
              <Check size={14} className="mr-1" /> Tersedia
            </>
          ) : (
            <>
              <X size={14} className="mr-1" /> Tidak Tersedia
            </>
          )}
        </div>

        <div className="flex p-5">
          <div className="flex-shrink-0 mr-5">
            <div className="relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-2 border-primary/50 shadow-md">
                  <UserIconComponent className="w-24 h-24 rounded-full" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-grow">
            <h1 className="text-xl font-bold text-primary mb-2 line-clamp-1">
              {name}
            </h1>

            <div className="flex items-center text-gray-600 mb-2">
              <Phone size={14} className="mr-2 text-primary/70" />
              <p className="text-sm">{phone}</p>
            </div>

            <div className="flex items-start">
              <MapPin
                size={14}
                className="mr-2 mt-1 text-primary/70 flex-shrink-0"
              />
              <p className="text-xs text-gray-500 line-clamp-2">
                {address.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
