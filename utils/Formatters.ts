export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
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

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "tertunda":
      return "bg-yellow-100 text-yellow-800";
    case "menunggu persetujuan":
      return "bg-orange-100 text-orange-800";
    case "disetujui":
      return "bg-green-100 text-green-800";
    case "selesai":
      return "bg-blue-100 text-blue-800";
    case "dibatalkan":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "menunggu persetujuan":
      return "bg-yellow-100 text-yellow-800";
    case "disetujui":
      return "bg-green-100 text-green-800";
    case "dalam pengiriman":
      return "bg-blue-100 text-blue-800";
    case "selesai":
      return "bg-indigo-100 text-indigo-800";
    case "dibatalkan":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
