import React from "react";
import Title from "../../components/Title";
import ButtonComponent from "../../components/button/Index";
import SearchInput from "../../components/input/Search";
import useNavigationHooks from "../../hooks/useNavigation";

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
        <SearchInput placeholder={"pengiriman"} />
      </div>
    </div>
  );
}

export default TransactionPages;
