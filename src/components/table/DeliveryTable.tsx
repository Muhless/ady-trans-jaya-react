import React from "react";
import TableComponent from ".";
import useNavigationHooks from "../../hooks/useNavigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { formatCurrency, formatDateNumeric } from "../../../utils/Formatters";
import PaginationControls from "../common/PaginationController";
import { fetchDeliveries } from "@/api/delivery";

type ColumnConfig = {
  key: string;
  label: string;
};

type DeliveryTableProps = {
  classNameTH?: string;
  classNameTD?: string;
  limit?: number;
  columns?: ColumnConfig[];
  showActions?: boolean;
};

const DeliveryTable: React.FC<DeliveryTableProps> = ({
  classNameTH,
  classNameTD,
  limit = 5,
  columns,
  showActions,
}) => {
  const { goToDetailDelivery } = useNavigationHooks();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = limit;

  const { data: delivery } = useQuery({
    queryKey: ["deliveries"],
    queryFn: fetchDeliveries,
  });

  const formattedData = React.useMemo(() => {
    if (!delivery) return [];

    return delivery.map((item) => ({
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
       delivery_deadline_date: new Date(item.delivery_deadline_date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      delivery_status: item.delivery_status,
    }));
  }, [delivery]);

  React.useEffect(() => {
    if (
      formattedData.length === 0 ||
      currentPage > Math.ceil(formattedData.length / itemsPerPage)
    ) {
      setCurrentPage(1);
    }
  }, [formattedData.length, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(formattedData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = Array.isArray(formattedData)
    ? formattedData.slice(startIndex, endIndex)
    : [];

  return (
    <>
      <TableComponent
        classNameTH={classNameTH}
        classNameTD={classNameTD}
        data={paginatedData}
        onRowClick={(row) => goToDetailDelivery(row.id)()}
        columns={
          columns ?? [
            { key: "customer_name", label: "Pelanggan" },
            { key: "driver_name", label: "Pengemudi" },
            { key: "vehicle_name", label: "Kendaraan" },
            { key: "delivery_date", label: "Tanggal Pengiriman" },
            { key: "delivery_deadline_date", label: "Batas Pengiriman" },
            { key: "delivery_status", label: "Status" },
          ]
        }
        showActions={showActions ?? true}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default DeliveryTable;
