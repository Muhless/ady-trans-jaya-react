import React from "react";
import TableComponent from ".";
import useNavigationHooks from "../../hooks/useNavigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { formatCurrency, formatDateNumeric } from "../../../utils/Formatters";
import PaginationControls from "../common/PaginationController";
import { fetchTransactions } from "@/api/transaction";

interface Transaction {
  id: number;
  customer_id: number;
  customer?: {
    name: string;
    phone: string;
  };
  cost: number;
  payment_deadline: string;
  total_delivery: number;
  transaction_status: string;
  // Add common timestamp fields
  createdAt?: string;
  created_at?: string;
  date?: string;
  timestamp?: string;
  transaction_date?: string;
}

type ColumnConfig = {
  key: string;
  label: string;
};

type TransactionTableProps = {
  classNameTH?: string;
  classNameTD?: string;
  limit?: number;
  columns?: ColumnConfig[];
  showActions?: boolean;
  transactions?: Transaction[];
  loading?: boolean;
  error?: boolean;
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  classNameTH,
  classNameTD,
  limit = 5,
  columns,
  showActions,
  transactions: externalTransactions,
  loading: externalLoading,
  error: externalError,
}) => {
  const { goToDetailTransaction } = useNavigationHooks();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = limit;

  const {
    data: internalTransactions,
    isLoading: internalLoading,
    isError: internalError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    enabled: !externalTransactions,
  });

  const transactions = externalTransactions || internalTransactions;
  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;
  const isError = externalError !== undefined ? externalError : internalError;

  const transformedData = React.useMemo(() => {
    if (!transactions) return [];

    return transactions.map((transaction: Transaction) => ({
      ...transaction,
      customerName:
        transaction.customer?.name || `Customer ID: ${transaction.customer_id}`,
      customerPhone: transaction.customer?.phone || "-",
      formattedCost: formatCurrency(transaction.cost),
      formattedPaymentDeadline: formatDateNumeric(transaction.payment_deadline),
      formattedDate: formatDateNumeric(
        transaction.createdAt ||
          transaction.created_at ||
          transaction.date ||
          transaction.timestamp ||
          transaction.transaction_date ||
          transaction.payment_deadline
      ),
    }));
  }, [transactions]);

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
        <p className="mt-2 text-gray-600">Memuat data transaksi...</p>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-2">❌</div>
        <p className="text-red-600">Gagal memuat data transaksi</p>
        <p className="text-sm text-gray-500 mt-1">Silakan coba lagi nanti</p>
      </div>
    );
  }

  // Show empty state
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Tidak ada data transaksi</p>
      </div>
    );
  }

  return (
    <>
      <TableComponent
        classNameTH={classNameTH}
        classNameTD={classNameTD}
        data={paginatedData}
        onRowClick={(row) => goToDetailTransaction(row.id)()}
        columns={
          columns ?? [
            { key: "customerName", label: "Pelanggan" },
            { key: "total_delivery", label: "Jumlah Pengiriman" },
            { key: "formattedCost", label: "Total Biaya" },
            {
              key: "formattedPaymentDeadline",
              label: "Batas Waktu Pembayaran",
            },
            { key: "transaction_status", label: "Status" },
            { key: "formattedDate", label: "Tanggal Transaksi" },
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

export default TransactionTable;
