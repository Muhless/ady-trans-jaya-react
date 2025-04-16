import { Phone, MapPin, Info, Subtitles, User2Icon } from "lucide-react";
import React from "react";
import ButtonComponent from "../button/Index";
import SubTitle from "../SubTitle";
import UserIconComponent from "../UserIcon";
import useNavigationHooks from "../../hooks/useNavigation";
import Card from ".";

type ProfileCardProps = {
  name: string;
  phone: string;
  address: string;
  photo?: string;
  onClick?: (id: string | number) => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  phone,
  address,
  photo,
}) => {
  const { goToDriverDetails } = useNavigationHooks();
  return (
    <Card
      className="bg-secondary hover:bg-third transition-all hover:duration-300"
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
          <h1 className="text-lg underline font-bold">{name}</h1>
          <p>{phone}</p>
          <p>{address}</p>
          <p className="underline">Tersedia/Tidak</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
