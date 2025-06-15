import React from "react";
import { UserCog2Icon } from "lucide-react";

interface Driver {
  name: string;
  phone: string;
  address: string;
}

interface DeliveryWithDriver {
  driver?: Driver;
}

interface DriverInfoComponentProps {
  delivery: DeliveryWithDriver;
  className?: string;
}

const DriverInfoComponent: React.FC<DriverInfoComponentProps> = ({
  delivery,
  className = "",
}) => {
  // Handle case where driver might not exist
  if (!delivery.driver) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
          <UserCog2Icon className="mr-2 text-blue-500" size={20} />
          Informasi Pengemudi
        </h2>
        <div className="text-center text-gray-500">
          <p>Informasi pengemudi tidak tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
        <UserCog2Icon className="mr-2 text-blue-500" size={20} />
        Informasi Pengemudi
      </h2>

      <div className="space-y-3">
        {/* Nama Pengemudi */}
        <div>
          <p className="text-sm text-gray-500">Nama Pengemudi</p>
          <p className="font-medium">{delivery.driver.name}</p>
        </div>

        {/* Nomor Telepon */}
        <div>
          <p className="text-sm text-gray-500">Nomor Telepon</p>
          <p className="font-medium">{delivery.driver.phone}</p>
        </div>

        {/* Alamat */}
        <div>
          <p className="text-sm text-gray-500">Alamat</p>
          <p className="font-medium text-sm">{delivery.driver.address}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverInfoComponent;
