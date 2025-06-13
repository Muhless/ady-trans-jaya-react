import React, { useEffect, useState } from "react";
import useNavigationHooks from "../../hooks/useNavigation";
import { useTransactionStore } from "../../stores/transactionStore";
import SelectComponent from "../input/Select";
import ButtonComponent from "../button/Index";
import { InputComponent } from "../input/Input";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { API_BASE_URL } from "../../apiConfig";
import { fetchCustomers } from "../../api/customer";
import ConfirmDialog from "../common/ConfirmDialog";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const AddTransactionForm = () => {
  const {
    goToAddDeliveryForm,
    goToCustomerPages,
    goBack,
    goToTransactionPages,
  } = useNavigationHooks();
  const { deliveryList, removeDelivery, setDelivery, resetDelivery } =
    useDeliveryStore();
  const { transaction, setTransaction, resetTransaction } =
    useTransactionStore();
  const state = useTransactionStore.getState();
  console.log(state.transaction);

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await fetchCustomers();
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);

  // Create customer options for the select component
  const customerOptions = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find(
      (customer) => customer.id.toString() === customerId
    );
    setSelectedCustomer(customer || null);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setTransaction({ [name]: value });

    // If the customer_id changed, update the selected customer
    if (name === "customer_id") {
      handleCustomerSelect(value);
    }
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
        deliveries: transaction.deliveries.map((d) => ({
          ...d,
          id: Number(d.id),
          driver_id: Number(d.driver_id),
          vehicle_id: Number(d.vehicle_id),
        })),
      };

      if (transaction.payment_deadline?.trim()) {
        const paymentDeadlineDate = new Date(transaction.payment_deadline);
        if (isNaN(paymentDeadlineDate.getTime())) {
          alert("Tanggal jatuh tempo pembayaran tidak valid.");
          return;
        }
        payload.payment_deadline = paymentDeadlineDate.toISOString();
      } else {
        payload.payment_deadline = null;
      }

      const response = await fetch(`${API_BASE_URL}/transactions`, {
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

      for (const d of transaction.deliveries) {
        await axios.patch(`${API_BASE_URL}/driver/${d.driver_id}`, {
          status: "tidak tersedia",
        });

        await axios.patch(`${API_BASE_URL}/vehicle/${d.vehicle_id}`, {
          status: "tidak tersedia",
        });
      }

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
    setSelectedCustomer(null);
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

  const handleEditDelivery = (deliveryToEdit) => {
    setDelivery(deliveryToEdit);
    goToAddDeliveryForm();
  };
  
  useEffect(() => {
    // Setiap kali deliveryList berubah, update transaction.deliveries
    setTransaction({ deliveries: deliveryList });
  }, [deliveryList]);

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <SelectComponent
        label="Pelanggan"
        className="w-96"
        name="customer_id"
        value={transaction.customer_id}
        onChange={handleChange}
        options={customerOptions}
      />
      {selectedCustomer && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm w-full text-sm mt-2">
          <h3 className="font-medium text-gray-800 mb-2 border-b pb-1">
            Detail Pelanggan
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-gray-500 mb-1">Nama</p>
              <p className="font-medium">{selectedCustomer.name}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Perusahaan</p>
              <p className="font-medium">{selectedCustomer.company}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Email</p>
              <p className="font-medium">{selectedCustomer.email}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Nomor Telepon</p>
              <p className="font-medium">{selectedCustomer.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500 mb-1">Alamat</p>
              <p className="font-medium">{selectedCustomer.address}</p>
            </div>
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
        <div>
          {deliveryList && deliveryList.length > 0 ? (
            <div>
              {deliveryList.map((deliveryItem, index) => (
                <div
                  key={deliveryItem.id}
                  className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-background border w-96"
                >
                  <h1>Pengiriman {index + 1}</h1>
                  <div className="flex space-x-1">
                    <ButtonComponent
                      variant="edit"
                      className="hover:text-text"
                      onClick={() => handleEditDelivery(deliveryItem)}
                    />
                    <ButtonComponent
                      variant="delete"
                      onClick={() => removeDelivery(deliveryItem.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center p-2 text-gray-500">
              <p>Tidak ada pengiriman saat ini.</p>
            </div>
          )}
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
        <ConfirmDialog
          trigger={
            <Button className="w-full">
              <ArrowLeft />
              Batalkan
            </Button>
          }
          title="Batalkan"
          description="Data yang diinput akan dihapus!"
          onConfirm={handleCancel}
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
