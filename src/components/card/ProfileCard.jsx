import { Phone, MapPin, Info, Trash2, HistoryIcon, Edit } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="relative grid grid-cols-5 p-5 items-center transition-all duration-300 ease-in-out cursor-pointer bg-secondary text-text rounded-lg hover:bg-biru hover:text-primary hover:scale-105 mb-3">
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
            <p>08871165551</p>
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
      <div className="flex items-center justify-center hover:underline hover:text-text cursor-pointer">
        <HistoryIcon className="w-4 h-4 mr-1" />
        <p>Riwayat</p>
      </div>
      <div className="flex items-center justify-center gap-4 text-primary cursor-pointer">
        <div className="p-2 bg-kuning rounded-full hover:text-text">
          <Edit />
        </div>
        <div className="p-2 bg-merah rounded-full hover:text-text">
          <Trash2 />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
