import { Phone, MapPin, Info, Subtitles, User2Icon } from "lucide-react";
import React from "react";
import ButtonComponent from "../atom/Button";
import Card from "./Card";
import SubTitle from "../atom/SubTitle";
import UserIconComponent from "../atom/UserIcon";

type ProfileCardProps = {
  id?: string | number;
  onClick: (id: string | number) => void;
};

const ProfileCard: React.FC<ProfileCardProps> = (id, onClick) => {
  return (
    <Card className="bg-white">
      <div className="bg-red-500 rounded-t-lg h-8"></div>
      <div className="grid grid-cols-3 p-2">
        <div className="col-span-1">
          <UserIconComponent
            className="box-content size-32"
            src="assets/images/profile/3.jpg"
          />
        </div>
        <div className="col-span-2 flex flex-col text-primary px-5 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <User2Icon size={20} />
              <p>Nama</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} />
              <p>No Telepon</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <p>Alamat</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
