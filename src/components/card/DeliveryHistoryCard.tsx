import { Calendar, MapPin, Award } from "lucide-react";
import { formatDate, getStatusClass } from "../../../utils/Formatters";

const DeliveryCard = ({ delivery }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-medium">
            {delivery.load_type}: {delivery.load}
          </p>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <MapPin size={14} className="mr-1" />
            {delivery.destination_address}
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {formatDate(delivery.delivery_date)}
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
            delivery.delivery_status
          )}`}
        >
          {delivery.delivery_status}
        </span>
      </div>
    </div>
  );
};

const DeliveryHistoryCard = ({ deliveries, isLoading, isError }) => {
  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        Gagal memuat riwayat pengiriman
      </div>
    );
  }

  if (isLoading) return null;

  const filteredDeliveries = deliveries?.filter(
    (d) => d.delivery_status.toLowerCase() !== "menunggu persetujuan"
  );

  const noData =
    !deliveries || deliveries.length === 0 || filteredDeliveries.length === 0;

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
        <div className="space-y-4">
          {filteredDeliveries.map((delivery) => (
            <DeliveryCard key={delivery.id} delivery={delivery} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryHistoryCard;
