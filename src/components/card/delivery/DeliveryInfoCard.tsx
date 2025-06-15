import React from "react";
import {
  Package,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Box,
  Weight,
  Hash,
} from "lucide-react";
import {
  formatCurrency,
  formatDateNumeric,
  getStatusStyle,
} from "../../../../utils/Formatters";
import DeliveryTrackingInfo from "./DeliveryTrackingInfo";
import { useAuthStore } from "@/stores/AuthStore";
import ButtonComponent from "@/components/button/Index";
import { updateDeliveryStatus } from "@/api/delivery";
import { useQueryClient } from "@tanstack/react-query";

interface DeliveryItem {
  id: number;
  delivery_id: number;
  item_name: string;
  quantity: string;
  weight: string;
}

interface DeliveryInfo {
  id: number;
  delivery_code: string;
  total_weight: number;
  total_item: number;
  pickup_address: string;
  pickup_address_lat: number;
  pickup_address_lang: number;
  destination_address: string;
  destination_address_lat: number;
  destination_address_lang: number;
  delivery_date: string;
  delivery_deadline_date: string;
  delivery_status: string;
  delivery_cost: number;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  items: DeliveryItem[];
}

interface DeliveryInfoComponentProps {
  delivery: DeliveryInfo;
  formatDate?: (date: string) => string;
  className?: string;
  onApprove: () => void;
  onReject: () => void;
}

const DeliveryInfoComponent: React.FC<DeliveryInfoComponentProps> = ({
  delivery,
  className = "",
  onApprove,
  onReject,
}) => {
  const role = useAuthStore((state) => state.role);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold flex items-center ">
          <Package className="mr-2 text-blue-500" size={20} />
          Informasi Pengiriman
        </h2>
        {role === "owner" &&
          delivery.delivery_status === "menunggu persetujuan" && (
            <div className="flex gap-2">
              <ButtonComponent
                label="Tolak Pengiriman"
                variant="reject"
                className="w-48 h-full"
                onClick={onReject}
              />
              <ButtonComponent
                label="Setujui Pengiriman"
                variant="approve"
                className="w-48 h-full"
                onClick={onApprove}
              />
            </div>
          )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Kode Pengiriman</p>
            <p className="font-medium">
              {delivery.delivery_code || "Belum ada kode"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Biaya Pengiriman</p>
            <p className="font-medium text-green-600">
              {formatCurrency(delivery.delivery_cost)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Item</p>
            <div className="flex items-center">
              <Hash className="mr-1 text-gray-400" size={16} />
              <p className="font-medium">{delivery.total_item}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Berat</p>
            <div className="flex items-center">
              <Weight className="mr-1 text-gray-400" size={16} />
              <p className="font-medium">{delivery.total_weight} kg</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-3">Daftar Item</p>
          <div className="space-y-3">
            {delivery.items && delivery.items.length > 0 ? (
              delivery.items.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <Box
                      className="mr-2 text-blue-500 flex-shrink-0 mt-1"
                      size={16}
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">
                          {item.item_name}
                        </h4>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Jumlah: </span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Berat: </span>
                          <span className="font-medium">{item.weight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500">
                  Tidak ada item dalam pengiriman ini
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Alamat Pengiriman</p>
          <div className="flex items-center mt-1">
            <div>
              <div className="flex items-center">
                <MapPin
                  className="mr-2 text-gray-400 flex-shrink-0"
                  size={16}
                />
                <p>
                  {delivery.pickup_address ||
                    "Alamat pengiriman tidak tersedia"}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Lat: {delivery.pickup_address_lat}
              </p>
              <p className="text-xs text-gray-500">
                Long:{delivery.pickup_address_lang}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Alamat Tujuan</p>
          <div className="flex items-center mt-1">
            <div>
              <div className="flex items-center">
                <MapPin
                  className="mr-2 text-gray-400 flex-shrink-0"
                  size={16}
                />
                <p>
                  {delivery.destination_address ||
                    "Alamat tujuan tidak tersedia"}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Lat: {delivery.destination_address_lat}
              </p>
              <p className="text-xs text-gray-500">
                Long:{delivery.destination_address_lang}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Tanggal Pengiriman</p>
          <div className="flex items-center">
            <Calendar className="mr-2 text-gray-400" size={16} />
            <p>{formatDateNumeric(delivery.delivery_date)}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Batas Pengiriman</p>
          <div className="flex items-center">
            <Clock className="mr-2 text-gray-400" size={16} />
            <p>{formatDateNumeric(delivery.delivery_deadline_date)}</p>
          </div>
        </div>

        {/* <div>
          <p className="text-sm text-gray-500 mb-2">Status Pengiriman</p>
          <div className="flex items-center">
            <span
              className={`px-3 py-2 rounded-md text-sm font-medium ${getStatusStyle(
                delivery.delivery_status
              )}`}
            >
              {delivery.delivery_status}
            </span>
          </div>
        </div> */}

        <DeliveryTrackingInfo status={delivery.delivery_status} />

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <p>Dibuat: {formatDateNumeric(delivery.created_at)}</p>
            </div>
            <div>
              <p>Diperbarui: {formatDateNumeric(delivery.updated_at)}</p>
            </div>
          </div>
          {delivery.approved_at && (
            <div className="mt-2 text-xs text-gray-500">
              <p>Disetujui: {formatDateNumeric(delivery.approved_at)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoComponent;
