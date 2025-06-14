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
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  classNameTH,
  classNameTD,
  limit = 5,
  columns,
  showActions,
}) => {
  const { goToDetailTransaction } = useNavigationHooks();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = limit;

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const transformedData = React.useMemo(() => {
    if (!transactions) return [];

    return transactions.map((transaction: Transaction) => ({
      ...transaction,
      customerName:
        transaction.customer?.name || `Customer ID: ${transaction.customer_id}`,
      customerPhone: transaction.customer?.phone || "-",
      formattedCost: formatCurrency(transaction.cost),
      formattedPaymentDeadline: formatDateNumeric(transaction.payment_deadline),
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
