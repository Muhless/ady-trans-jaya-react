export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u00A0/, "");
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateNumeric = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getStatusClass = (status: string): string => {
  switch (status) {
    case "tertunda":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "disetujui":
      return "bg-lime-100 text-lime-800 border-lime-300";
    case "ditolak":
      return "bg-red-100 text-red-800 border-red-300";
    case "diproses":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "berjalan":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "menunggu pengemudi":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "dalam pengiriman":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "sampai tujuan":
      return "bg-green-100 text-green-800 border-green-300";
    case "selesai":
      return "bg-green-100 text-green-800 border-green-300";
    case "dibatalkan":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
  }
};
