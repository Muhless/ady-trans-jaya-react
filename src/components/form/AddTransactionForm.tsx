import React, { useState } from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import SelectComponent from "../input/Select";
import { useCustomers } from "../../hooks/useCustomers";
import useNavigationHooks from "../../hooks/useNavigation";
import axios from "axios";

interface Delivery {
  id: number;
}

type Transaction = {
  customer_id: string;
  total_delivery: string;
  cost: string;
  payment_deadline: string;
  down_payment: string;
  down_payment_status: string;
  down_payment_time: string;
  full_payment: string;
  full_payment_status: string;
  full_payment_time: string;
  transaction_status: string;
};

const AddTransactionForm = () => {
  const { goToAddDeliveryForm } = useNavigationHooks();
  const { customers, loading, error } = useCustomers();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const customerOptions = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

  const [formData, setFormData] = useState<Transaction>({
    customer_id: "",
    total_delivery: "",
    cost: "",
    payment_deadline: "",
    down_payment: "",
    down_payment_status: "",
    down_payment_time: "",
    full_payment: "",
    full_payment_status: "",
    full_payment_time: "",
    transaction_status: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/transaction",
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("newTransaction", JSON.stringify(formData));
        goToAddDeliveryForm();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan data transaksi:", error);
      alert("Gagal menyimpan data transaksi");
    }
  };

  const handleAddDelivery = () => {
    localStorage.setItem("newTransaction", JSON.stringify(formData));
    goToAddDeliveryForm();
  };

  const handleCancel = () => {
    localStorage.removeItem("newTransaction");
  };

  if (loading) return <p>Harap tunggu sebentar...</p>;
  if (error) return <p>Terjadi kesalahan saat mengambil data pelanggan.</p>;

  const handleDeleteDelivery = (id) => {
    setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-background border w-96"
          >
            <h1>Pengiriman {delivery.id}</h1>
            <div className="flex space-x-1">
              <ButtonComponent variant="edit" className="hover:text-text" />
              <ButtonComponent variant="delete" />
            </div>
          </div>
        ))}
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
