type Customer = {
  name?: string;
  company?: string;
  address?: string;
  email?: string;
  phone?: string;
};

const CustomerInfoCard = ({ customer }: { customer?: Customer }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Informasi Pelanggan</h2>
      <div className="bg-white border p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="font-bold">Nama</p>
          <p className="text-gray-500">{customer?.name || "-"}</p>
        </div>
        <div>
          <p className="font-bold">Perusahaan</p>
          <p className="text-gray-500">{customer?.company || "-"}</p>
        </div>
        <div>
          <p className="font-bold">Alamat</p>
          <p className="text-gray-500">{customer?.address || "-"}</p>
        </div>
        <div>
          <p className="font-bold">Email</p>
          <p className="text-gray-500">{customer?.email || "-"}</p>
        </div>
        <div>
          <p className="font-bold">Telepon</p>
          <p className="text-gray-500">{customer?.phone || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
