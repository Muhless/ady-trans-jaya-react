import Swal from "sweetalert2";

const AlertConfirm = async () => {
  const result = await Swal.fire({
    title: "Apakah kamu yakin?",
    text: "Data ini tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "Berhasil!",
      text: "Data telah dihapus.",
      icon: "success",
    });
    return true;
  }

  return false;
};

export default AlertConfirm;
