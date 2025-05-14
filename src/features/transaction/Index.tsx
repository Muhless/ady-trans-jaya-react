import React, { useState } from "react";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import SearchInput from "../../components/input/Search";
import useNavigationHooks from "../../hooks/useNavigation";
import TableComponent from "../../components/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import TransactionTable from "../../components/table/TransactionTable";


const fetchTransactions = async () => {
  const res = await axios.get(`${API_BASE_URL}/transactions`);
  return res.data.data;
};
function TransactionPages() {
  const { goToAddTransaction } = useNavigationHooks();

  const {
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  return (
    <div>
      <Title title="Transaksi" />
      <div className="flex flex-row justify-between mb-5">
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
        <TransactionTable classNameTH="p-3" classNameTD="p-3"/>
      )}
    </div>
  );
}

export default TransactionPages;
