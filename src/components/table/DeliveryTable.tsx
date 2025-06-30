import React from "react";
import TableComponent from ".";
import useNavigationHooks from "../../hooks/useNavigation";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDateNumeric } from "../../../utils/Formatters";
import PaginationControls from "../common/PaginationController";
import { fetchDeliveries } from "@/api/delivery";

interface Delivery {
  id: number;
  transaction_id: number;
  driver_id: number;
  vehicle_id: number;
  destination_address: string;
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
  filters?: {
    delivery_status?: string;
    transaction_id?: number;
    driver_id?: number;
    vehicle_id?: number;
    date_from?: string;
    date_to?: string;
  };
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
  filters,
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
        delivery.transaction?.customer?.name ||
        `Transaction ID: ${delivery.transaction_id}`,
      driverName: delivery.driver?.name || "-",
      vehicleName: delivery.vehicle?.name || "-",
      destinationAddress: delivery.destination_address,
      formattedDeliveryDate: formatDateNumeric(delivery.delivery_date),
      formattedDeliveryDeadlineDate: formatDateNumeric(
        delivery.delivery_deadline_date
      ),
      formattedDate: formatDateNumeric(
        delivery.createdAt ||
          delivery.created_at ||
          delivery.date ||
          delivery.timestamp ||
          delivery.delivery_date
      ),
    }));
  }, [deliveries]);

  const filteredData = React.useMemo(() => {
    if (!transformedData) return [];

    return transformedData.filter((delivery) => {
      if (
        filters?.delivery_status &&
        delivery.delivery_status !== filters.delivery_status
      ) {
        return false;
      }

      if (
        filters?.transaction_id &&
        delivery.transaction_id !== filters.transaction_id
      ) {
        return false;
      }

      if (filters?.driver_id && delivery.driver_id !== filters.driver_id) {
        return false;
      }

      if (filters?.vehicle_id && delivery.vehicle_id !== filters.vehicle_id) {
        return false;
      }

      if (filters?.date_from || filters?.date_to) {
        const deliveryDate = new Date(
          delivery.createdAt ||
            delivery.created_at ||
            delivery.date ||
            delivery.timestamp ||
            delivery.delivery_date
        );

        if (filters.date_from && deliveryDate < new Date(filters.date_from)) {
          return false;
        }

        if (filters.date_to && deliveryDate > new Date(filters.date_to)) {
          return false;
        }
      }

      return true;
    });
  }, [transformedData, filters]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  React.useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (
      filteredData.length === 0 ||
      (currentPage > totalPages && totalPages > 0)
    ) {
      setCurrentPage(1);
    }
  }, [filteredData.length, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Memuat data pengiriman...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-2">❌</div>
        <p className="text-red-600">Gagal memuat data pengiriman</p>
        <p className="text-sm text-gray-500 mt-1">Silakan coba lagi nanti</p>
      </div>
    );
  }

  if (!deliveries || deliveries.length === 0) {
    return (
      <div className="text-center p-8 text-sm">
        <p className="text-gray-600">
          Tidak ada pengiriman yang sedang berlangsung
        </p>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">
          Tidak ada data pengiriman yang sesuai dengan filter
        </p>
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
            { key: "destinationAddress", label: "Tujuan Pengiriman" },
            { key: "driverName", label: "Pengemudi" },
            { key: "vehicleName", label: "Kendaraan" },
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
