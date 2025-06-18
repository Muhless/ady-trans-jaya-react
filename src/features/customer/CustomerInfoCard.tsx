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
      <div className="bg-gray-50 border p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Nama</p>
          <p className="font-bold">{customer?.name || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Perusahaan</p>
          <p className="font-bold">{customer?.company || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Alamat</p>
          <p className="font-bold">{customer?.address || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-bold">{customer?.email || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Telepon</p>
          <p className="font-bold">{customer?.phone || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
