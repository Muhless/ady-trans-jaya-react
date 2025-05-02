import React from "react";
import Card from "../../components/card";
import SubTitle from "../../components/SubTitle";
import AddTransactionForm from "../../components/form/AddTransactionForm";

function AddTransactionPages() {
  return (
    <div className="flex justify-center">
      <Card className="flex flex-col justify-center w-1/2  hover:shadow-none px-6">
        <SubTitle
          subTitle="Tambah Transaksi"
          className="flex justify-center mt-5 text-3xl"
        />
        <AddTransactionForm />
      
      </Card>
    </div>
  );
}

export default AddTransactionPages;
