import React, { useState } from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import SelectComponent from "../input/Select";
import { useCustomers } from "../../hooks/useCustomers";
import useNavigationHooks from "../../hooks/useNavigation";
import axios from "axios";
import { useTransactionStore } from "../../stores/transactionStore.ts";

const AddTransactionForm = () => {
  const { goToAddDeliveryForm } = useNavigationHooks();
  const { customers, loading, error } = useCustomers();
  const { transaction, setTransaction, setAllTransaction, resetTransaction } =
    useTransactionStore();
  const [formData, setFormData] = [transaction, setAllTransaction];
  const state = useTransactionStore.getState();
  console.log(state.transaction);

  const customerOptions = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setTransaction({ [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/transaction",
  //       formData
  //     );
  //     if (response.status === 200) {
  //       goToAddDeliveryForm();
  //     }
  //   } catch (error) {
  //     console.error("Terjadi kesalahan saat menyimpan data transaksi:", error);
  //     alert("Gagal menyimpan data transaksi");
  //   }
  // };

  const handleAddDelivery = () => {
    goToAddDeliveryForm();
  };

  const handleCancel = () => {
    resetTransaction();
  };

  if (loading) return <p>Harap tunggu sebentar...</p>;
  if (error) return <p>Terjadi kesalahan saat mengambil data pelanggan.</p>;

  return (
    <form className="space-y-4">
      <SelectComponent
        label="Pelanggan"
        name="customer_id"
        value={formData.customer_id}
        onChange={handleChange}
        options={customerOptions}
      />
      <hr />
      <div className="flex justify-between gap-5">
        <h1>Pengiriman</h1>
        <div className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-background border w-96">
          <h1>Pengiriman</h1>
          <div className="flex space-x-1">
            <ButtonComponent variant="edit" className="hover:text-text" />
            <ButtonComponent variant="delete" />
          </div>
        </div>
        <ButtonComponent
          label="Tambah Pengiriman"
          variant="add"
          className="w-96"
          onClick={handleAddDelivery}
          type="button"
        />
      </div>
      <hr />
      <InputComponent
        label="Jumlah Pengiriman"
        className="w-96"
        name="total_delivery"
        value={formData.total_delivery}
        disabled
      />
      <hr />
      <InputComponent
        label="Batas Pembayaran"
        type="date"
        name="payment_deadline"
        className="w-96"
        value={formData.payment_deadline}
        onChange={handleChange}
      />
      <hr />
      <InputComponent
        label="Status"
        disabled
        className="w-96"
        name="transaction_status"
        value={formData.transaction_status}
      />
      <hr />
      <InputComponent
        label="Total"
        disabled
        className="w-96"
        name="cost"
        value={formData.cost}
      />
      <div className="flex py-5 gap-4">
        <ButtonComponent
          label="Batal"
          variant="back"
          className="w-full"
          onClick={handleCancel}
          type="button"
        />
        <ButtonComponent
          label="Simpan"
          variant="next"
          className="w-full"
          type="submit"
        />
      </div>
    </form>
  );
};

export default AddTransactionForm;
