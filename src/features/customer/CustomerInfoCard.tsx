import { User2 } from "lucide-react";

type Customer = {
  name?: string;
  company?: string;
  address?: string;
  email?: string;
  phone?: string;
};

const CustomerInfoCard = ({ customer }: { customer?: Customer }) => {
  return (
    <div className="bg-white p-6 rounded-xl border mb-10">
      <div className="flex items-center gap-3 mb-4 border-b py-3">
        <User2 size={20} className="text-blue-500" />
        <h2 className="text-lg font-semibold">Informasi Pelanggan</h2>
      </div>
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
