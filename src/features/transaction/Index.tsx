import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import SearchInput from "../../components/input/Search";
import useNavigationHooks from "../../hooks/useNavigation";
import useSorting from "../../hooks/useSorting";
import { useQuery } from "@tanstack/react-query";
import TransactionTable from "../../components/table/TransactionTable";
import TransactionsStatCard from "../../components/card/stat/TransactionsStatCard";
import { fetchTransactions } from "@/api/transaction";
import { useMemo, useState } from "react";
import { useFilterHandlers } from "@/handlers/transactionHandlers";
import SimpleDateRangePicker, {
  DateRangePicker,
} from "@/components/common/DateRangePicker";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";

function TransactionPages() {
  const { goToAddTransaction } = useNavigationHooks();

  const {
    dateRange,
    searchTerm,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    clearDateFilter,
  } = useFilterHandlers();

  const getTransactionDate = (transaction) => {
    const dateField =
      transaction.createdAt ||
      transaction.date ||
      transaction.timestamp ||
      transaction.created_at ||
      transaction.transaction_date ||
      transaction.payment_deadline;
    return dateField ? new Date(dateField) : null;
  };

  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const dateFilteredTransactions = useMemo(() => {
    if (!transactions) return [];

    if (!dateRange.startDate && !dateRange.endDate) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      const transactionDate = getTransactionDate(transaction);
      if (!transactionDate) return false;

      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate)
        : null;
      const endDate = dateRange.endDate
        ? new Date(dateRange.endDate + "T23:59:59")
        : null;

      if (startDate && transactionDate < startDate) return false;
      if (endDate && transactionDate > endDate) return false;

      return true;
    });
  }, [transactions, dateRange]);

  const { sortedData: sortedTransactions } = useSorting(
    dateFilteredTransactions,
    "desc",
    getTransactionDate
  );

  const filteredTransactions = useMemo(() => {
    if (
      !searchTerm ||
      typeof searchTerm !== "string" ||
      searchTerm.trim() === ""
    ) {
      return sortedTransactions;
    }

    const term = searchTerm.toLowerCase().trim();

    return sortedTransactions.filter(
      (transaction) =>
        transaction.customer.name?.toLowerCase().includes(term) ||
        transaction.created_at?.toLowerCase().includes(term) ||
        transaction.total_delivery?.toString().includes(term) ||
        transaction.transaction_status?.toLowerCase().includes(term)
    );
  }, [sortedTransactions, searchTerm]);

  // Fungsi untuk format rupiah
  const formatRupiah = (amount) => {
    if (!amount && amount !== 0) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy HH:mm", { locale: id });
    } catch {
      return dateString;
    }
  };

  // Fungsi untuk mengekspor data ke CSV
  const exportToCSV = () => {
    if (!filteredTransactions || filteredTransactions.length === 0) {
      alert("Tidak ada data untuk diekspor");
      return;
    }

    const headers = [
      "No",
      "Nama Customer",
      "Total Pengiriman",
      "Deadline Pembayaran",
      "Down Payment",
      "Status Down Payment",
      "Waktu Down Payment",
      "Full Payment",
      "Status Full Payment",
      "Waktu Full Payment",
      "Status Transaksi",
      "Tanggal Dibuat",
      "Tanggal Update",
      "Alamat Customer",
      "Telepon Customer",
    ];

    const csvData = filteredTransactions.map((transaction, index) => [
      index + 1,
      transaction.customer?.name || "",
      transaction.total_delivery || 0,
      formatDate(transaction.payment_deadline),
      formatRupiah(transaction.down_payment || 0),
      transaction.down_payment_status || "",
      formatDate(transaction.down_payment_time),
      formatRupiah(transaction.full_payment || 0),
      transaction.full_payment_status || "",
      formatDate(transaction.full_payment_time),
      transaction.transaction_status || "",
      formatDate(transaction.created_at),
      formatDate(transaction.updated_at),
      transaction.customer?.address || "",
      transaction.customer?.phone || "",
    ]);

    const allData = [headers, ...csvData];

    const csvContent = allData
      .map((row) =>
        row
          .map((field) => {
            const fieldStr = String(field || "");
            if (
              fieldStr.includes(",") ||
              fieldStr.includes('"') ||
              fieldStr.includes("\n")
            ) {
              return `"${fieldStr.replace(/"/g, '""')}"`;
            }
            return fieldStr;
          })
          .join(",")
      )
      .join("\n");

    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);

    const today = new Date();
    const dateStr = format(today, "yyyy-MM-dd", { locale: id });

    let filenamePrefix = "data-transaksi";
    if (dateRange.startDate || dateRange.endDate) {
      const startStr = dateRange.startDate
        ? format(new Date(dateRange.startDate), "yyyy-MM-dd")
        : "awal";
      const endStr = dateRange.endDate
        ? format(new Date(dateRange.endDate), "yyyy-MM-dd")
        : "akhir";
      filenamePrefix += `-${startStr}-to-${endStr}`;
    }

    link.setAttribute("download", `${filenamePrefix}-exported-${dateStr}.csv`);

    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      `Berhasil mengekspor ${filteredTransactions.length} data transaksi ke CSV`
    );
  };

  return (
    <div>
      <Title title="Transaksi" />
      <TransactionsStatCard
        transactions={sortedTransactions}
        loading={isLoading}
        error={isError}
      />

      <div className="flex flex-col gap-4 pt-10 pb-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-3">
            <ButtonComponent
              label="Tambah Transaksi"
              variant="add"
              className="w-48"
              onClick={goToAddTransaction}
            />
          </div>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onClear={clearDateFilter}
            buttonWidth="w-44"
          />

          <ButtonComponent
            label="Export CSV"
            variant="csv"
            className="w-36"
            onClick={exportToCSV}
            disabled={isLoading || !filteredTransactions?.length}
          />

          <SearchInput
            placeholder={"Transaksi..."}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      <TransactionTable
        transactions={filteredTransactions}
        loading={isLoading}
        error={isError}
        classNameTH="p-3"
        classNameTD="p-5"
        showActions={false}
      />
    </div>
  );
}

export default TransactionPages;
