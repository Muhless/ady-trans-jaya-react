import { useQuery } from "@tanstack/react-query";
import { fetchDeliveries } from "../../api/delivery";
import SubTitle from "../SubTitle";
import useNavigationHooks from "../../hooks/useNavigation";
import Card from ".";
import DeliveryTable from "../table/DeliveryTable";

const WaitingDeliveryCard = () => {
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
    (item) => item.delivery_status?.toLowerCase() === "menunggu persetujuan"
  );

  return (
    <Card className="rounded-md h-96">
      <div className="flex justify-between items-center p-3 ">
        <SubTitle subTitle="Pengiriman Menunggu Persetujuan" />
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
          classNameTH="text-sm py-2"
          classNameTD="py-4"
          loading={isLoading}
          error={isError}
          limit={5}
          columns={[
            { key: "pickup_address", label: "Alamat" },
            { key: "formattedDeliveryDate", label: "Tanggal Pengiriman" },
            { key: "destination_address", label: "Tujuan" },
            { key: "formattedDeliveryDeadlineDate", label: "Batas Pengiriman" },
            { key: "delivery_status", label: "Status" },
          ]}
          showActions={false}
          filters={{
            delivery_status: "menunggu persetujuan",
          }}
        />
      </div>
    </Card>
  );
};

export default WaitingDeliveryCard;
