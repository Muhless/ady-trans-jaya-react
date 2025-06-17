import useNavigationHooks from "@/hooks/useNavigation";
import {
  formatCurrency,
  formatDateNumeric,
  getStatusClass,
  getStatusColor,
} from "../../../utils/Formatters";

type Delivery = {
  id: number;
  delivery_code?: string;
  total_item?: number;
  total_weight?: number;
  delivery_cost?: number;
  delivery_date?: string;
  delivery_deadline_date?: string;
  pickup_address?: string;
  destination_address?: string;
  delivery_status?: string;
};

const DeliveryInfoCard = ({ deliveries }: { deliveries: Delivery[] }) => {
  const { goToDetailDelivery } = useNavigationHooks();

  if (!deliveries || deliveries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Tidak ada data pengiriman</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Daftar Pengiriman</h2>
      <div className="space-y-4">
        {deliveries.map((item, index) => (
          <div
            key={item.id}
            onClick={goToDetailDelivery(item.id)}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:cursor-pointer hover:bg-bg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  Pengiriman {index + 1}
                </h3>
                <p className="text-gray-500">{item.delivery_code}</p>
              </div>
              <div
                className={`px-6 flex justify-center py-2 rounded-full text-sm font-bold ${getStatusClass(
                  item.delivery_status
                )}`}
              >
                {item.delivery_status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-1">
                  Tanggal Pengiriman
                </h4>
                <p className="text-gray-500">
                  {formatDateNumeric(item.delivery_date) || "-"}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-1">
                  Batas Pengiriman
                </h4>
                <p className="text-gray-500">
                  {formatDateNumeric(item.delivery_deadline_date) || "-"}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-1">
                  Biaya Pengiriman
                </h4>
                <p className="text-gray-500">
                  {formatCurrency(item.delivery_cost)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryInfoCard;
