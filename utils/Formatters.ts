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

const statusClassMap: Record<string, string> = {
  disetujui: "bg-green-100 text-green-800 border-green-300",
  ditolak: "bg-red-100 text-red-800 border-red-300",
  "menunggu konfirmasi pengemudi": "bg-orange-100 text-orange-800 border-orange-300",
  "dalam pengiriman": "bg-blue-100 text-blue-800 border-blue-300",
  "sampai tujuan": "bg-green-100 text-green-800 border-green-300",
  diproses: "bg-orange-100 text-orange-800 border-orange-300",
  berjalan: "bg-blue-100 text-blue-800 border-blue-300",
  selesai: "bg-green-100 text-green-800 border-green-300",
  dibatalkan: "bg-red-100 text-red-800 border-red-300",
};

export const getStatusClass = (status: string): string =>
  statusClassMap[status] || "bg-yellow-100 text-yellow-800 border-yellow-300";

