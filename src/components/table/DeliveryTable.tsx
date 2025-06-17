import React from "react";
import TableComponent from ".";
import useNavigationHooks from "../../hooks/useNavigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { formatCurrency, formatDateNumeric } from "../../../utils/Formatters";
import PaginationControls from "../common/PaginationController";
import { fetchDeliveries } from "@/api/delivery";

interface Delivery {
  id: number;
  transaction_id: number;
  driver_id: number;
  vehicle_id: number;
  load: number;
  delivery_date: string;
  delivery_deadline_date: string;
  delivery_status: string;
  transaction?: {
    customer?: {
      name: string;
      phone: string;
    };
  };
  driver?: {
    name: string;
  };
  vehicle?: {
    name: string;
  };
  // Add common timestamp fields
  createdAt?: string;
  created_at?: string;
  date?: string;
  timestamp?: string;
}

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
  deliveries?: Delivery[];
  loading?: boolean;
  error?: boolean;
};

const DeliveryTable: React.FC<DeliveryTableProps> = ({
  classNameTH,
  classNameTD,
  limit = 5,
  columns,
  showActions,
  deliveries: externalDeliveries,
  loading: externalLoading,
  error: externalError,
}) => {
  const { goToDetailDelivery } = useNavigationHooks();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = limit;

  const {
    data: internalDeliveries,
    isLoading: internalLoading,
    isError: internalError,
  } = useQuery({
    queryKey: ["deliveries"],
    queryFn: fetchDeliveries,
    enabled: !externalDeliveries,
  });

  const deliveries = externalDeliveries || internalDeliveries;
  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;
  const isError = externalError !== undefined ? externalError : internalError;

  const transformedData = React.useMemo(() => {
    if (!deliveries) return [];

    return deliveries.map((delivery: Delivery) => ({
      ...delivery,
      customerName:
        delivery.transaction?.customer?.name || `Transaction ID: ${delivery.transaction_id}`,
      driverName: delivery.driver?.name || "-",
      vehicleName: delivery.vehicle?.name || "-",
      formattedDeliveryDate: formatDateNumeric(delivery.delivery_date),
      formattedDeliveryDeadlineDate: formatDateNumeric(delivery.delivery_deadline_date),
      formattedDate: formatDateNumeric(
        delivery.createdAt ||
          delivery.created_at ||
          delivery.date ||
          delivery.timestamp ||
          delivery.delivery_date
      ),
    }));
  }, [deliveries]);

  React.useEffect(() => {
    if (
      transformedData.length === 0 ||
      currentPage > Math.ceil(transformedData.length / itemsPerPage)
    ) {
      setCurrentPage(1);
    }
  }, [transformedData.length, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(transformedData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = Array.isArray(transformedData)
    ? transformedData.slice(startIndex, endIndex)
    : [];

  // Show loading state
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Memuat data pengiriman...</p>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-2">❌</div>
        <p className="text-red-600">Gagal memuat data pengiriman</p>
        <p className="text-sm text-gray-500 mt-1">Silakan coba lagi nanti</p>
      </div>
    );
  }

  // Show empty state
  if (!deliveries || deliveries.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Tidak ada data pengiriman</p>
      </div>
    );
  }

  return (
    <>
      <TableComponent
        classNameTH={classNameTH}
        classNameTD={classNameTD}
        data={paginatedData}
        onRowClick={(row) => goToDetailDelivery(row.id)()}
        columns={
          columns ?? [
            { key: "customerName", label: "Pelanggan" },
            { key: "driverName", label: "Pengemudi" },
            { key: "vehicleName", label: "Kendaraan" },
            { key: "load", label: "Muatan" },
            { key: "formattedDeliveryDate", label: "Tanggal Pengiriman" },
            { key: "formattedDeliveryDeadlineDate", label: "Batas Pengiriman" },
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