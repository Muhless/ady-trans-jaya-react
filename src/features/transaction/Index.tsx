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
