import { Phone, MapPin, Info, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const handleDelete = () => {
  Swal.fire({
    title: "Yakin ingin menghapus?",
    text: "Data driver akan dihapus secara permanen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Menghapus...",
        text: "Harap tunggu",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
        Swal.close();
        Swal.fire("Terhapus!", "Data driver telah dihapus.", "success");
      }, 1500);
    }
  });
};

const ProfileCard = ({ onClick }) => {
  return (
    <div
      className="relative flex flex-row p-4 text-sm transition-all duration-300 ease-in-out shadow-lg cursor-pointer bg-secondary text-text rounded-2xl hover:bg-hover hover:scale-105 hover:shadow-lg hover:-translate-y-2 hover:text-background"
      onClick={onClick}
    >
      <div className="absolute flex space-x-2 top-2 right-2">
        <button
          className="p-2 transition bg-red-500 bg-opacity-50 rounded-full hover:bg-opacity-100"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      </div>
      <img
        src="/assets/images/profile/1.jpg"
        alt="Profile"
        className="object-cover shadow-md w-36 h-44 rounded-2xl"
      />
      <div className="flex flex-col justify-center px-6 py-4">
        <h1 className="mb-2 text-xl font-bold underline">Muhta Nuryadi</h1>
        <div className="flex items-center mb-1">
          <Phone className="w-4 h-4 mr-2" />
          <span>08871165551</span>
        </div>
        <div className="flex items-center mb-1">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Alamat</span>
        </div>
        <div className="flex items-center">
          <Info className="w-4 h-4 mr-2" />
          <span>Aktif/Tidak Aktif</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
