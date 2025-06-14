import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "@/components/input/Search.js";
import { API_BASE_URL } from "@/apiConfig";
import DeliveryStatCard from "@/components/card/stat/DeliveryStatCard";
import TableComponent from "@/components/table";
import useNavigationHooks from "@/hooks/useNavigation";
import TitleComponent from "@/components/Title";
import { fetchDeliveries } from "@/api/delivery";


function DeliveryPages() {
  const { goToDetailDelivery } = useNavigationHooks();

  const {
    data: delivery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["delivery"],
    queryFn: fetchDeliveries,
  });

  const columns = [
    { key: "customer_name", label: "Nama Pelanggan" },
    { key: "load", label: "Muatan" },
    { key: "driver_name", label: "Pengemudi" },
    { key: "vehicle_name", label: "Kendaraan" },
    { key: "delivery_date", label: "Tanggal Pengiriman" },
    { key: "delivery_status", label: "Status" },
  ];

  const formattedData = delivery?.map((item) => ({
    id: item.id,
    customer_name: item.transaction?.customer?.name || "-",
    driver_name: item.driver?.name || "-",
    vehicle_name: item.vehicle?.name || "-",
    load: item.load,
    delivery_date: new Date(item.delivery_date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    delivery_status: item.delivery_status,
  }));

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
        <TableComponent
          classNameTH="p-3"
          classNameTD="p-3"
          onRowClick={(row) => goToDetailDelivery(row.id)()}
          data={formattedData}
          columns={columns}
        />
      )}
    </div>
  );
}

export default DeliveryPages;
