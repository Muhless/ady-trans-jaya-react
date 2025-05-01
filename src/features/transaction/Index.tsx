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
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

const fetchTransactions = async () => {
  const res = await axios.get("http://localhost:8080/api/transaction");
  return res.data.data;
};

function TransactionPages() {
  const { goToAddTransaction } = useNavigationHooks();
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  const [error, setError] = useState<string | null>(null);
  const {
    data: customers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchTransactions,
  });
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
        <SearchInput placeholder={"transaksi..."} />
      </div>
      {isLoading ? (
        <div className="text-center p-5">Loading</div>
      ) : isError ? (
        <div className="text-center text-red-600 p-5">Error loading data</div>
      ) : (
        <TableComponent
          data={Array.isArray(customers) ? customers : customers?.data ?? []}
          columns={[
            { key: "name", label: "Nama" },
            { key: "company", label: "Perusahaan" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Nomor Telepon" },
            { key: "address", label: "Alamat" },
          ]}
          showActions={true}
        />
      )}
    </div>
  );
}

export default TransactionPages;
