import { Phone, MapPin, Clock, Info, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        // Notifikasi tambahan dengan react-toastify
        toast.success("Data driver berhasil dihapus!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      }, 1500);
    }
  });
};

const ProfileCard = ({ onClick }) => {
  return (
    <div
      className="bg-card text-text text-sm flex flex-row rounded-2xl p-4 shadow-lg relative cursor-pointer 
      hover:bg-hover hover:scale-105 hover:shadow-lg hover:-translate-y-2 hover:text-background
      transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          className="p-2 bg-red-500 bg-opacity-50 rounded-full hover:bg-opacity-100 transition"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      </div>
      <img
        src="/assets/images/profile/1.jpg"
        alt="Profile"
        className="w-36 h-44 rounded-2xl object-cover shadow-md"
      />
      <div className="py-4 px-6 flex flex-col justify-center">
        <h1 className="text-xl font-bold underline mb-2">Muhta Nuryadi</h1>
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

      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer />
    </div>
  );
};

export default ProfileCard;
