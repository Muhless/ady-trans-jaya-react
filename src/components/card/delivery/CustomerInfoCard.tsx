import React from "react";
import { User, Building, Mail, Phone } from "lucide-react";

interface Customer {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

interface Transaction {
  customer?: Customer;
}

interface DeliveryWithCustomer {
  transaction?: Transaction;
}

interface CustomerInfoComponentProps {
  delivery: DeliveryWithCustomer;
  className?: string;
}

const CustomerInfoComponent: React.FC<CustomerInfoComponentProps> = ({
  delivery,
  className = "",
}) => {
  const customer = delivery.transaction?.customer;

  if (!customer) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
          <User className="mr-2 text-blue-500" size={20} />
          Informasi Pelanggan
        </h2>
        <div className="text-center text-gray-500">
          <p>Informasi pelanggan tidak tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 text-sm${className}`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
        <User className="mr-2 text-blue-500" size={20} />
        Informasi Pelanggan
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-gray-500">Nama</p>
          <p className="font-medium">{customer.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Perusahaan</p>
          <div className="flex items-center">
            <Building className="mr-2 text-gray-400" size={16} />
            <p className="font-medium">{customer.company}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <div className="flex items-center">
            <Mail className="mr-2 text-gray-400" size={16} />
            <p className="font-medium">{customer.email}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500">Telepon</p>
          <div className="flex items-center">
            <Phone className="mr-2 text-gray-400" size={16} />
            <p className="font-medium">{customer.phone}</p>
          </div>
        </div>

        {/* Alamat */}
        <div>
          <p className="text-gray-500">Alamat</p>
          <p className="font-medium">{customer.address}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoComponent;
