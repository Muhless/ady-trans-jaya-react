import React from "react";
import { useCustomers } from "../../hooks/useCustomers";
import useNavigationHooks from "../../hooks/useNavigation";
import { useTransactionStore } from "../../stores/transactionStore";
import SelectComponent from "../input/Select";
import ButtonComponent from "../button/Index";
import { InputComponent } from "../input/Input";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTransactionForm = () => {
  const {
    goToAddDeliveryForm,
    goToCustomerPages,
    goBack,
    goToTransactionPages,
  } = useNavigationHooks();
  const { customers, loading, error } = useCustomers();
  const { delivery, resetDelivery } = useDeliveryStore();
  const { transaction, setTransaction, resetTransaction } =
    useTransactionStore();
  const state = useTransactionStore.getState();
  console.log(state.transaction);

  const customerOptions = [
    { value: "", label: "Pilih pelanggan" },
    ...customers.map((customer) => ({
      value: customer.id.toString(),
      label: customer.name,
    })),
  ];

  const selectedCustomer = customers.find(
    (c) => c.id === Number(transaction.customer_id)
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setTransaction({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!transaction.customer_id) {
      alert("Silakan pilih pelanggan terlebih dahulu.");
      return;
    }

    if (!transaction.deliveries || transaction.deliveries.length === 0) {
      alert("Silakan tambahkan minimal 1 pengiriman.");
      return;
    }

    try {
      const payload: any = {
        ...transaction,
        customer_id: Number(transaction.customer_id),
        total_delivery: transaction.deliveries.length,
      };

      payload.payment_deadline = transaction.payment_deadline?.trim()
        ? new Date(transaction.payment_deadline).toISOString()
        : null;

      const response = await fetch("http://localhost:8080/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gagal menyimpan transaksi. Server response:", errorText);
        throw new Error("Gagal menyimpan transaksi.");
      }

      const result = await response.json();
      console.log("Transaksi berhasil disimpan:", result);

      resetTransaction();
      goToTransactionPages();
    } catch (error: any) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleReset = () => {
    resetTransaction();
    resetDelivery();
    console.log(
      "Transaction state after reset:",
      useTransactionStore.getState().transaction
    );
  };

  const handleCancel = () => {
    resetTransaction();
    resetDelivery();
    goBack();
  };

  const handleButtonClick = () => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Data yang belum disimpan akan hilang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, batal",
      cancelButtonText: "Tidak",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel();
      }
    });
  };

  const handleAddDelivery = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!transaction.customer_id) {
      alert("Silakan pilih pelanggan terlebih dahulu.");
      return;
    }

    try {
      setTransaction({
        ...transaction,
      });

      console.log("Data transaksi disimpan ke state:", transaction);
      goToAddDeliveryForm();
    } catch (error: any) {
      console.error("Gagal menyimpan transaksi:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi.");
    }
  };

  if (loading) return <p>Harap tunggu sebentar...</p>;
  if (error) return <p>Terjadi kesalahan saat mengambil data pelanggan.</p>;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <SelectComponent
        label="Pelanggan"
        className="w-96"
        name="customer_id"
        value={transaction.customer_id}
        onChange={handleChange}
        options={customerOptions}
      />
      {selectedCustomer && (
        <div className="text-gray-700 w-full space-y-4 text-sm">
          <div className="flex items-center gap-5 justify-between">
            <p className="font-semibold">Nama</p>
            <p className="w-96">: {selectedCustomer.name}</p>
          </div>
          <div className="flex items-center gap-5 justify-between">
            <p className="font-semibold">Perusahaan</p>
            <p className="w-96">: {selectedCustomer.company}</p>
          </div>
          <div className="flex items-center gap-5 justify-between">
            <p className="font-semibold">Email</p>
            <p className="w-96">: {selectedCustomer.email}</p>
          </div>
          <div className="flex items-center gap-5 justify-between">
            <p className="font-semibold">Nomor Telepon</p>
            <p className="w-96">: {selectedCustomer.phone}</p>
          </div>
          <div className="flex items-center gap-5 justify-between">
            <p className="font-semibold">Alamat</p>
            <p className="w-96">: {selectedCustomer.address}</p>
          </div>
        </div>
      )}
      <p
        className="text-sm text-blue-600 underline cursor-pointer"
        onClick={goToCustomerPages}
      >
        + Tambah Pelanggan Baru
      </p>
      <div className="flex justify-between gap-5">
        <h1>Pengiriman</h1>
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-background border w-96">
            <h1>Pengiriman </h1>
            <div className="flex space-x-1">
              <ButtonComponent variant="edit" className="hover:text-text" />
              <ButtonComponent variant="delete" />
            </div>
          </div>
          <ButtonComponent
            label="Tambah Pengiriman"
            variant="add"
            className="w-96 mt-3"
            onClick={handleAddDelivery}
            type="button"
          />
        </div>
      </div>
      <InputComponent
        label="Jumlah Pengiriman"
        className="w-96"
        name="total_delivery"
        value={transaction.total_delivery}
        onChange={handleChange}
        disabled
      />
      <InputComponent
        label="Batas Pembayaran"
        type="date"
        name="payment_deadline"
        value={transaction.payment_deadline}
        className="w-96"
        onChange={handleChange}
      />
      <InputComponent
        label="Total"
        disabled
        className="w-96"
        name="cost"
        value={new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(transaction.cost)}
        onChange={handleChange}
      />
      <div className="flex w-full gap-3 py-4">
        <ButtonComponent
          label="Batal"
          variant="back"
          type="button"
          className="w-full"
          onClick={handleButtonClick}
        />
        <ButtonComponent
          label="Ulangi"
          variant="undo"
          type="reset"
          className="w-full"
          onClick={handleReset}
        />

        <ButtonComponent
          label="Simpan"
          type="submit"
          variant="next"
          className="w-full"
        />
      </div>
    </form>
  );
};

export default AddTransactionForm;
