import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDeliveries } from "../../api/delivery";
import SubTitle from "../SubTitle";
import useNavigationHooks from "../../hooks/useNavigation";
import Card from ".";
import { formatCurrency, formatDate } from "../../../utils/Formatters";

const WaitingDeliveryCard = () => {
  const { goToDeliveryPages, goToDetailDelivery } = useNavigationHooks();
  const { data: deliveries = [] } = useQuery({
    queryKey: ["deliveries"],
    queryFn: fetchDeliveries,
  });

  const waitingDeliveries = deliveries.filter(
    (item) =>
      item.delivery_status?.toLowerCase() === "menunggu persetujuan" ||
      item.delivery_status?.toLowerCase() === "pending"
  );

  const handleRowClick = (id) => {
    const navigateFunction = goToDetailDelivery(id);
    if (navigateFunction) navigateFunction();
  };

  return (
    <Card className="rounded-md h-96">
      <div className="flex justify-between items-center p-3 border-b">
        <SubTitle subTitle="Menunggu Persetujuan" />
        <p
          className="underline text-blue-600 text-sm cursor-pointer hover:text-blue-800"
          onClick={goToDeliveryPages}
        >
          Lihat selengkapnya
        </p>
      </div>
      <div className="overflow-auto px-3">
        {waitingDeliveries.length > 0 ? (
          <div className="space-y-2">
            {waitingDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                role="button"
                tabIndex={0}
                className="border-b hover:bg-blue-50 py-1 transition cursor-pointer"
                onClick={() => handleRowClick(delivery.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleRowClick(delivery.id);
                  }
                }}
              >
                <div className="grid grid-cols-4 items-center text-sm">
                  <div className="flex text-center items-center justify-center">
                    <img
                      src={`/assets/images/cars/${
                        delivery.vehicle?.type?.toLowerCase() || "default"
                      }.png`}
                      alt={`${delivery.vehicle?.type || "Kendaraan"}`}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "/assets/images/cars/default.png")
                      }
                      className="object-contain h-10"
                    />
                  </div>
                  <div className="text-center">
                    <p>{delivery.pickup_address || "-"}</p>
                    <p className="text-xs">
                      {formatDate(delivery.delivery_date)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p>{delivery.destination_address || "-"}</p>
                    <p className="text-xs">
                      {formatDate(delivery.delivery_deadline_date)}
                    </p>
                  </div>
                  <div className="text-green-600 text-center">
                    <p>+ {formatCurrency(delivery.delivery_cost)}</p>
                  </div>
                  {/* <div className="text-center">
                    <p className="text-xs bg-yellow-100 px-1.5 py-0.5 rounded">
                      {delivery.delivery_status}
                    </p>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
            Tidak ada pengiriman yang menunggu persetujuan.
          </div>
        )}
      </div>
    </Card>
  );
};

export default WaitingDeliveryCard;
