import React from "react";
import Card from "../../components/card";
import SubTitle from "../../components/SubTitle";
import AddTransactionForm from "../../components/form/AddTransactionForm";
import { useCustomers } from "../../hooks/useCustomers";
import Spinner from "../../components/Spinner";

function AddTransactionPages() {
  const { loading, error } = useCustomers();
  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  return (
    <div className="flex justify-center">
      <Card className="flex flex-col justify-center w-1/2  hover:shadow-none px-6">
        <SubTitle
          subTitle="Tambah Transaksi"
          className="flex justify-center mt-5 text-3xl mb-3"
        />
          <AddTransactionForm />
      </Card>
    </div>
  );
}

export default AddTransactionPages;
