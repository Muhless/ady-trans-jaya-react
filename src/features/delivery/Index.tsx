import { useQuery } from "@tanstack/react-query";
import SearchInput from "@/components/input/Search.js";
import DeliveryStatCard from "@/components/card/stat/DeliveryStatCard";
import TitleComponent from "@/components/Title";
import { fetchDeliveries } from "@/api/delivery";
import DeliveryTable from "@/components/table/DeliveryTable";

function DeliveryPages() {
  const {
    data: delivery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveries"],
    queryFn: fetchDeliveries,
  });

  return (
    <div>
      <TitleComponent title={"Pengiriman"} />
      <DeliveryStatCard />
      <div className="flex justify-end py-5">
        <SearchInput placeholder={"pengiriman"} />
      </div>
      {isLoading ? (
        <div className="text-center p-5">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-600 p-5">Error loading data</div>
      ) : (
        <DeliveryTable
          classNameTH="p-3"
          classNameTD="p-5"
          showActions={false}
        />
      )}
    </div>
  );
}

export default DeliveryPages;
