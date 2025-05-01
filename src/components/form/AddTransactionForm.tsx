import React, { useState } from "react";
import SelectComponent from "../input/Select";
import { useCustomers } from "../../hooks/useCustomers";
import useNavigationHooks from "../../hooks/useNavigation";
import axios from "axios";
import ButtonComponent from "../button/Index";

const AddTransactionForm = () => {
  const { goToAddDeliveryForm, goToCustomerPages } = useNavigationHooks();
  const { customers, loading, error } = useCustomers();

  const [formData, setFormData] = useState({
    customer_id: "",
    // total_delivery: 0,
    // cost: 0,
    // payment_deadline: "",
    // down_payment: 0,
    // down_payment_status: "unpaid",
    // down_payment_time: "",
    // full_payment: 0,
    // full_payment_status: "unpaid",
    // full_payment_time: "",
    // transaction_status: "ongoing",
  });

  const customerOptions = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));
  const selectedCustomer = customers.find(
    (c) => c.id === Number(formData.customer_id)
  );
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          customer_id: Number(formData.customer_id),
        }),
      });

      if (!formData.customer_id) {
        alert("Silakan pilih pelanggan terlebih dahulu.");
        return;
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan data");
      }
      console.log("Data berhasil disimpan", result);
      goToAddDeliveryForm();
    } catch (error: any) {
      console.error("Terjadi kesalahan", error);
    }
  };

  if (loading) return <p>Harap tunggu sebentar...</p>;
  if (error) return <p>Terjadi kesalahan saat mengambil data pelanggan.</p>;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <SelectComponent
        label="Pelanggan"
        name="customer_id"
        value={formData.customer_id}
        className="w-96"
        onChange={handleChange}
        options={customerOptions}
      />
      <div>
        {selectedCustomer && (
          <div className="text-gray-700 space-y-2 text-sm py-5 w-full">
            <div className="flex gap-4 mb-2">
              <p className="font-semibold w-32">Nama</p>
              <p>: {selectedCustomer.name}</p>
            </div>
            <div className="flex gap-4 mb-2">
              <p className="font-semibold w-32">Perusahaan</p>
              <p>: {selectedCustomer.company}</p>
            </div>
            <div className="flex gap-4 mb-2">
              <p className="font-semibold w-32">Email</p>
              <p>: {selectedCustomer.email}</p>
            </div>
            <div className="flex gap-4 mb-2">
              <p className="font-semibold w-32">Nomor Telepon</p>
              <p>: {selectedCustomer.phone}</p>
            </div>
            <div className="flex gap-4 mb-2">
              <p className="font-semibold w-32">Alamat</p>
              <p className="">: {selectedCustomer.address}</p>
            </div>
          </div>
        )}
        <p
          className="text-sm text-blue-600 underline cursor-pointer"
          onClick={goToCustomerPages}
        >
          + Tambah Pelanggan Baru
        </p>
      </div>

      <div className="flex w-full gap-3">
        <ButtonComponent label="Kembali" variant="back" className="w-full" />
        <ButtonComponent
          label="Lanjutkan"
          type="submit"
          variant="next"
          className="w-full"
        />
      </div>
    </form>
  );
};

export default AddTransactionForm;
