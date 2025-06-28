import { useQuery } from "@tanstack/react-query";
import { fetchDeliveries } from "../../api/delivery";
import SubTitle from "../SubTitle";
import useNavigationHooks from "../../hooks/useNavigation";
import Card from ".";
import DeliveryTable from "../table/DeliveryTable";

const OnGoingDeliveryCard = () => {
  const { goToDeliveryPages } = useNavigationHooks();

  const {
    data: deliveries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveries"],
    queryFn: fetchDeliveries,
  });

  const onGoingDelivery = deliveries.filter(
    (item) => item.delivery_status?.toLowerCase() === "dalam pengiriman"
  );

  return (
    <Card className="rounded-md h-96">
      <div className="flex justify-between items-center p-3 ">
        <SubTitle subTitle="Pengiriman Sedang Berlangsung" />
        <p
          className="underline text-blue-600 text-sm cursor-pointer hover:text-blue-800"
          onClick={goToDeliveryPages}
        >
          Lihat selengkapnya
        </p>
      </div>
      <hr />
      <div className="p-3 flex-1 overflow-hidden">
        <DeliveryTable
          deliveries={onGoingDelivery}
          loading={isLoading}
          classNameTH="text-sm border-t p-3 bg-gray-100"
        classNameTD="p-3"
          error={isError}
          limit={5}
          columns={[
            { key: "customerName", label: "Pelanggan" },
            { key: "driverName", label: "Pengemudi" },
            { key: "vehicleName", label: "Kendaraan" },
            { key: "delivery_status", label: "Status" },
            { key: "formattedDeliveryDate", label: "Tanggal" },
          ]}
          showActions={false}
          filters={{
            delivery_status: "dalam pengiriman",
          }}
        />
      </div>
    </Card>
  );
};

export default OnGoingDeliveryCard;
