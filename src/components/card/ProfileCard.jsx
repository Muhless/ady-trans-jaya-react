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
      className="relative flex flex-row p-4 items-center transition-all duration-300 ease-in-out shadow-lg cursor-pointer bg-secondary text-text rounded-lg hover:bg-hover hover:scale-105 hover:shadow-lg hover:-translate-y-2 hover:text-background mb-5"
      onClick={onClick}
    >
      <img
        src="/assets/images/profile/1.jpg"
        alt="Profile"
        className="object-cover shadow-md w-32 h-32 rounded-lg"
      />
      <div className="flex flex-col justify-center px-6">
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
