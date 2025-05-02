import { useDeliveryStore } from "../../stores/deliveryStore";
import { useTransactionStore } from "../../stores/transactionStore";
import ButtonComponent from "./Index";
import React from "react";

const AddDeliveryButton = () => {
  const { delivery, resetDelivery } = useDeliveryStore();
  const { addDeliveryToTransaction } = useTransactionStore();

  const handleAddDelivery = () => {
    // Validasi ringan (bisa disesuaikan)
    if (!delivery.vehicle_id || delivery.delivery_cost <= 0) {
      alert("Lengkapi data pengiriman sebelum menambah ke transaksi.");
      return;
    }

    addDeliveryToTransaction(delivery);
    resetDelivery();
    alert("Pengiriman berhasil ditambahkan ke transaksi!");
  };

  return (
    <ButtonComponent
      label="Tambah Pengiriman ke Transaksi"
      type="button"
      variant="add"
      onClick={handleAddDelivery}
      className="mt-4"
    />
  );
};

export default AddDeliveryButton;
