import React from "react";
import { Truck } from "lucide-react";

interface Vehicle {
  name: string;
  type: string;
  license_plate?: string;
  capacity: string | number;
  rate_per_km: number;
}

interface DeliveryWithVehicle {
  vehicle?: Vehicle;
}

interface VehicleInfoComponentProps {
  delivery: DeliveryWithVehicle;
  formatCurrency: (amount: number) => string;
  className?: string;
}

const VehicleInfoComponent: React.FC<VehicleInfoComponentProps> = ({
  delivery,
  formatCurrency,
  className = "",
}) => {
  // Handle case where vehicle might not exist
  if (!delivery.vehicle) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
          <Truck className="mr-2 text-blue-500" size={20} />
          Informasi Kendaraan
        </h2>
        <div className="text-center text-gray-500">
          <p>Informasi kendaraan tidak tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
        <Truck className="mr-2 text-blue-500" size={20} />
        Informasi Kendaraan
      </h2>
      
      <div className="space-y-3">
        {/* Nama Kendaraan */}
        <div>
          <p className="text-sm text-gray-500">Kendaraan</p>
          <p className="font-medium">{delivery.vehicle.name}</p>
        </div>

        {/* Tipe dan Plat Nomor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Tipe</p>
            <p>{delivery.vehicle.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Plat Nomor</p>
            <p>{delivery.vehicle.license_plate || "-"}</p>
          </div>
        </div>

        {/* Kapasitas dan Tarif per KM */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Kapasitas</p>
            <p>{delivery.vehicle.capacity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tarif per KM</p>
            <p>{formatCurrency(delivery.vehicle.rate_per_km)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoComponent;