import { Phone, MapPin, Clock, Info, Edit, Trash2 } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="bg-secondary text-white flex flex-row rounded-2xl p-4 shadow-lg relative">
      {/* Tombol Edit dan Delete */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition">
          <Edit className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 bg-red-500 bg-opacity-80 rounded-full hover:bg-opacity-100 transition">
          <Trash2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Gambar Profil */}
      <img
        src="/assets/images/profile/3.jpg"
        alt="Profile"
        className="w-36 h-44 rounded-2xl object-cover shadow-md"
      />

      {/* Detail Profil */}
      <div className="py-4 px-6 flex flex-col justify-center">
        <h1 className="text-xl font-bold underline mb-2">Muhta Nuryadi</h1>
        <div className="flex items-center mb-1">
          <Phone className="w-5 h-5 mr-2" />
          <span>08871165551</span>
        </div>
        <div className="flex items-center mb-1">
          <MapPin className="w-5 h-5 mr-2" />
          <span>Alamat</span>
        </div>
        <div className="flex items-center mb-1 text-gray-300 cursor-pointer hover:underline hover:text-blue-400">
          <Clock className="w-5 h-5 mr-2" />
          <span>Riwayat Perjalanan</span>
        </div>
        <div className="flex items-center">
          <Info className="w-5 h-5 mr-2" />
          <span>Aktif/Tidak Aktif</span>
        </div>
      </div>
    </div>
  );
}
