import React, { useState } from "react";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import SearchInput from "../../components/input/Search";
import useNavigationHooks from "../../hooks/useNavigation";
import TableComponent from "../../components/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Transaction {
  id: number;
  customer_id: number;
  customer?: {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
  };
  total_delivery: number;
  cost: number;
  payment_deadline: string;
  down_payment: number | null;
  down_payment_status: string;
  down_payment_time: string | null;
  full_payment: number | null;
  full_payment_status: string;
  full_payment_time: string | null;
  transaction_status: string;
  created_at: string;
  updated_at: string;
  delivery: Array<{
    id: number;
    load_type: string;
    load: string;
    quantity: number;
    weight: number;
    pickup_address: string;
    pickup_address_lat: number;
    pickup_address_lang: number;
    destination_address: string;
    destination_address_lat: number;
    destination_address_lang: number;
    delivery_date: string;
    delivery_deadline_date: string;
    delivery_status: string;
    delivery_cost: number;
    approved_at: string | null;
  }>;
}

const fetchTransactions = async () => {
  const res = await axios.get("http://localhost:8080/api/transactions");
  return res.data.data;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function TransactionPages() {
  const { goToAddTransaction } = useNavigationHooks();

  const {
    data: transactions,
    isLoading,
    isError,
    refetch,
  } = useQuery({
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
      formattedPaymentDeadline: formatDate(transaction.payment_deadline),
    }));
  }, [transactions]);

  return (
    <div>
      <Title title="Transaksi" />
      <div className="flex flex-row justify-between mb-3">
        <ButtonComponent
          label="Tambah Transaksi"
          variant="add"
          className="w-48"
          onClick={goToAddTransaction}
        />
        <SearchInput placeholder={"Cari transaksi..."} />
      </div>
      {isLoading ? (
        <div className="text-center p-5">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-600 p-5">Error loading data</div>
      ) : (
        <TableComponent
          data={Array.isArray(transformedData) ? transformedData : []}
          columns={[
            { key: "customerName", label: "Pelanggan" },
            { key: "total_delivery", label: "Jumlah Pengiriman" },
            { key: "formattedCost", label: "Total Biaya" },
            {
              key: "formattedPaymentDeadline",
              label: "Batas Waktu Pembayaran",
            },
            { key: "transaction_status", label: "Status Transaksi" },
          ]}
          showActions={true}
        />
      )}
    </div>
  );
}

export default TransactionPages;
