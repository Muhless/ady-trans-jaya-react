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
  if (!delivery.vehicle) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 text-sm ${className}`}>
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
    <div className={`bg-white rounded-lg shadow-md p-6 text-sm ${className}`}>
      <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
        <Truck className="mr-2 text-blue-500" size={20} />
        Informasi Kendaraan
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-gray-500">Kendaraan</p>
          <p className="font-medium">{delivery.vehicle.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Tipe</p>
            <p className="font-medium">{delivery.vehicle.type}</p>
          </div>
          <div>
            <p className="text-gray-500">Plat Nomor</p>
            <p className="font-medium">
              {delivery.vehicle.license_plate || "-"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Kapasitas</p>
            <p className="font-medium">{delivery.vehicle.capacity}</p>
          </div>
          <div>
            <p className="text-gray-500">Tarif per KM</p>
            <p className="font-medium">
              {formatCurrency(delivery.vehicle.rate_per_km)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoComponent;
