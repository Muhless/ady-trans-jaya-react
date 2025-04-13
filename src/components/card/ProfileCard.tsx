import { Phone, MapPin, Info, Subtitles, User2Icon } from "lucide-react";
import React from "react";
import ButtonComponent from "../button/Index";
import SubTitle from "../SubTitle";
import UserIconComponent from "../UserIcon";
import useNavigationHooks from "../../hooks/useNavigation";
import Card from ".";

type ProfileCardProps = {
  id?: string | number;
  onClick: (id: string | number) => void;
};

const ProfileCard: React.FC<ProfileCardProps> = () => {
  const { goToDriverDetails } = useNavigationHooks();
  return (
    <Card
      className="bg-background hover:bg-secondary transition-all hover:duration-300"
      onClick={goToDriverDetails(123)}
    >
      <div className="grid grid-cols-3 p-4">
        <div className="col-span-1 flex items-center">
          <UserIconComponent
            className="size-24 rounded-full object-cover"
            src="assets/images/profile/1.jpg"
          />
        </div>
        <div className="col-span-2 flex flex-col px-3 text-sm py-2">
          <h1 className="text-lg underline font-bold">Muhta Nuryadi</h1>
          <h2>08871165551</h2>
          <h3>Kp. Cangkudu Rt.06 Rw.01. Kab.Tangerang</h3>
          <p className="underline">Tersedia/Tidak</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
