import { Award } from "lucide-react";
import DriverHistoryCard from "./driver/DriverHistoryCard";

const DeliveryHistoryCard = ({ deliveries, isLoading, isError, onClick }) => {
  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        Gagal memuat riwayat pengiriman
      </div>
    );
  }

  if (isLoading) return null;

  const filteredDeliveries =
    deliveries?.filter(
      (d) => d.delivery_status?.toLowerCase() !== "menunggu persetujuan"
    ) || [];

  const noData = filteredDeliveries.length === 0;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">
        Riwayat Pengiriman
      </h3>

      {noData ? (
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
          <div className="text-center text-gray-500">
            <Award size={32} className="mx-auto mb-2 text-gray-400" />
            <p>Belum ada riwayat pengiriman</p>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          {filteredDeliveries.map((delivery) => (
            <DriverHistoryCard
              key={delivery.id}
              delivery={delivery}
              onClick={onClick?.(delivery.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryHistoryCard;
