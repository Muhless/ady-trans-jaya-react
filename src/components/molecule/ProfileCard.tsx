import { Phone, MapPin, Info } from "lucide-react";
import React from "react";
import ButtonEdit from "../atom/ButtonEdit";
import ButtonDelete from "../atom/ButtonDelete";

type ProfileCardProps = {
  id?: string | number;
  onClick: (id: string | number) => void;
};

const ProfileCard: React.FC<ProfileCardProps> = (id, onClick) => {
  return (
    <div
      className="relative grid grid-cols-4 p-4 items-center transition-all duration-300 ease-in-out cursor-pointer bg-secondary text-sm rounded-lg hover:bg-biru hover:text-primary hover:scale-105 mb-3"
      onClick={() => id && onClick(id)}
    >
      <div className="flex gap-5 items-center">
        <img
          src="/assets/images/profile/1.jpg"
          alt="Profile"
          className="object-cover shadow-md size-12 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">Muhta Nuryadi</h1>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            <p className="font-thin">08871165551</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-1">
        <MapPin className="w-4 h-4 mr-1" />
        <p>Alamat</p>
      </div>
      <div className="flex items-center">
        <Info className="w-4 h-4 mr-1" />
        <p>Tersedia/Tidak Tersedia</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <ButtonEdit size={18} />
        <ButtonDelete size={18} />
      </div>
    </div>
  );
};

export default ProfileCard;
