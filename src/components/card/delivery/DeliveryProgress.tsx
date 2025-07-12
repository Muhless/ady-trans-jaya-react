import React from "react";
import { getFullImageUrl } from "../../../../utils/imageHelper";
import { formatDateTime } from "../../../../utils/Formatters";
import { PackageCheck } from "lucide-react";

export interface DeliveryProgress {
  id: number;
  delivery_id: number;
  delivery_start_time: string;
  pickup_time: string | null;
  pickup_photo_url: string;
  arrival_time: string | null;
  arrival_photo_url: string;
  created_at: string;
  updated_at: string;
}

interface DeliveryProgressDetailProps {
  progress: DeliveryProgress;
}

const DeliveryProgressDetail: React.FC<DeliveryProgressDetailProps> = ({
  progress,
}) => {
  const pickupUrl = getFullImageUrl(progress?.pickup_photo_url);
  const arrivalUrl = getFullImageUrl(progress?.arrival_photo_url);

  return (
    <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-6">
       <h2 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
        <PackageCheck className="mr-2 text-blue-500" size={20} />
        Progres Pengiriman
      </h2>

      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Mulai Pengiriman</span>
          <span>{formatDateTime(progress.delivery_start_time)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">
            Waktu Penjemputan Barang
          </span>
          <span>
            {progress.pickup_time ? (
              new Date(progress.pickup_time).toLocaleString()
            ) : (
              <span className="italic text-gray-400">Belum diambil</span>
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-gray-600 mb-1">
            Foto Pengambilan Barang
          </p>
          {pickupUrl ? (
            <img
              src={pickupUrl}
              alt="foto penjemputan"
              className="w-32 rounded-lg border"
            />
          ) : (
            <p className="italic text-gray-400">Belum tersedia</p>
          )}
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Waktu Sampai Tujuan</span>
          <span>
            {progress.arrival_time ? (
              new Date(progress.arrival_time).toLocaleString()
            ) : (
              <span className="italic text-gray-400">Belum tiba</span>
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-gray-600 mb-1">Foto Ditempat Tujuan</p>
          {arrivalUrl ? (
            <img
              src={arrivalUrl}
              alt="foto ditujuan"
              className="w-32 rounded-lg border"
            />
          ) : (
            <p className="italic text-gray-400">Belum tersedia</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryProgressDetail;
