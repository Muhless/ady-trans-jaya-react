import useNavigationHooks from "@/hooks/useNavigation";
import {
  formatCurrency,
  formatDateNumeric,
  getStatusClass,
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
        <p className="font-bold">Tidak ada data pengiriman</p>
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
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:cursor-pointer hover:bg-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-muted-foreground text-sm">
                  Pengiriman {index + 1}
                </h3>
                <p className="font-bold">{item.delivery_code}</p>
              </div>
              <div
                className={`px-6 flex justify-center py-2 rounded-full text-sm font-bold ${getStatusClass(
                  item.delivery_status
                )}`}
              >
                {item.delivery_status}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div>
                <h4 className="text-muted-foreground text-sm">Tanggal Pengiriman</h4>
                <p className="font-bold">
                  {formatDateNumeric(item.delivery_date) || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-muted-foreground text-sm">Batas Pengiriman</h4>
                <p className="font-bold">
                  {formatDateNumeric(item.delivery_deadline_date) || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-muted-foreground text-sm">Biaya Pengiriman</h4>
                <p className="font-bold">
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
