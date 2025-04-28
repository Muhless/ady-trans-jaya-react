import React from "react";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import SearchInput from "../../components/input/Search";
import useNavigationHooks from "../../hooks/useNavigation";
import TableComponent from "../../components/table";

function TransactionPages() {
  const { goToAddTransaction } = useNavigationHooks();
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
      {/* {isLoading ? (
        <div className="text-center p-5">Loading</div>
      ) : isError ? (
        <div className="text-center text-red-600 p-5">Error loading data</div>
      ) : ( */}
        <TableComponent />
      {/* )} */}
    </div>
  );
}

export default TransactionPages;
