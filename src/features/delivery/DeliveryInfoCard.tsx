import useNavigationHooks from "@/hooks/useNavigation";
import {
  formatCurrency,
  formatDateNumeric,
  getStatusClass,
} from "../../../utils/Formatters";
import { BoxIcon } from "lucide-react";

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
    <div className="bg-white rounded-xl border p-6 mb-8">
      <div className="flex items-center gap-3 mb-4 border-b py-3">
        <BoxIcon size={20} className="text-red-500" />
        <h2 className="text-lg font-semibold">Daftar Pengiriman</h2>
      </div>
      <div className="space-y-4">
        {deliveries.map((item, index) => (
          <div
            key={item.id}
            onClick={goToDetailDelivery(item.id)}
            className="bg-gray-50 border rounded-lg p-4 shadow-sm hover:cursor-pointer hover:bg-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-muted-foreground text-sm">
                  Pengiriman {index + 1}
                </h3>
                <p className="font-bold">{item.delivery_code}</p>
              </div>
              <div
                className={`w-64 flex justify-center py-2 rounded-md text-sm font-bold ${getStatusClass(
                  item.delivery_status
                )}`}
              >
                {item.delivery_status}
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div>
                <h4 className="text-muted-foreground text-sm">
                  Tanggal Pengiriman
                </h4>
                <p className="font-bold">
                  {formatDateNumeric(item.delivery_date) || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-muted-foreground text-sm">
                  Batas Pengiriman
                </h4>
                <p className="font-bold">
                  {formatDateNumeric(item.delivery_deadline_date) || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-muted-foreground text-sm">
                  Biaya Pengiriman
                </h4>
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
