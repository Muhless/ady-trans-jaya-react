import SearchInput from "../../components/input/Search.tsx";
import React from "react";
import Title from "../../components/Title.tsx";
import useNavigationHooks from "../../hooks/useNavigation.ts";
import TableComponent from "../../components/table/index.tsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchDelivery = async () => {
  const res = await axios.get("http://202.10.41.13:8080/api/deliveries");
  return res.data.data;
};

function DeliveryPages() {
  const { goToDetailDelivery } = useNavigationHooks();

  const {
    data: delivery,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["delivery"],
    queryFn: fetchDelivery,
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
      <Title title={"Pengiriman"} />
      <div className="flex justify-end mb-5">
        <SearchInput placeholder={"pengiriman"} />
      </div>
      {isLoading ? (
        <div className="text-center p-5">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-600 p-5">Error loading data</div>
      ) : (
        <TableComponent
          onRowClick={(row) => goToDetailDelivery(row.id)()}
          data={formattedData}
          columns={columns}
          showActions={true}
        />
      )}
    </div>
  );
}

export default DeliveryPages;
