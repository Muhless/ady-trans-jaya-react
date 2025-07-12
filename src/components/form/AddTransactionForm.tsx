import React, { useEffect, useState } from "react";
import useNavigationHooks from "../../hooks/useNavigation";
import { useTransactionStore } from "../../stores/transactionStore";
import SelectComponent from "../input/Select";
import ButtonComponent from "../button/Index";
import { InputComponent } from "../input/Input";
import { Delivery, useDeliveryStore } from "../../stores/deliveryStore";
import { API_BASE_URL } from "../../apiConfig";
import { fetchCustomers } from "../../api/customer";
import ConfirmDialog from "../common/ConfirmDialog";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import DatePickerComponent from "../common/DatePicker";
import { formatCurrency } from "../../../utils/Formatters";
import { toast } from "sonner";

const AddTransactionForm = () => {
  console.log(useTransactionStore.getState().transaction);

  const {
    goToAddDeliveryForm,
    goToCustomerPages,
    goBack,
    goToTransactionPages,
  } = useNavigationHooks();
  const { resetDelivery } = useDeliveryStore();
  const {
    transaction,
    setTransaction,
    resetTransaction,
    selectedCustomer,
    setSelectedCustomer,
    removeDeliveryFromTransaction,
  } = useTransactionStore();

  const deliveries = useTransactionStore(
    (state) => state.transaction.deliveries
  );

  const [customers, setCustomers] = useState<any[]>([]);
  const [paymentDeadline, setPaymentDeadline] = useState<Date | undefined>(
    transaction.payment_deadline
      ? new Date(transaction.payment_deadline)
      : undefined
  );
  const [formData, setFormData] = [transaction, setTransaction];

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

  const customerOptions = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
    ...customer,
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

    if (name === "customer_id") {
      handleCustomerSelect(value);
    }
    const selected = customerOptions.find((c) => c.value === value);
    if (selected) {
      setSelectedCustomer({
        id: Number(selected.value),
        name: selected.name,
        company: selected.company,
        email: selected.email,
        phone: selected.phone,
        address: selected.address,
      });
    }
  };

  const handleSubmitTransaction = async (e: React.FormEvent) => {
    e?.preventDefault();

    if (!transaction.customer_id) {
      toast.error("Silakan pilih pelanggan terlebih dahulu!");
      return;
    }

    if (!transaction.deliveries || transaction.deliveries.length === 0) {
      toast.error("Minimal 1 pengiriman ditambahkan!");
      return;
    }

    if (!paymentDeadline) {
      toast.error("Silakan tentukan batas pembayaran terlebih dahulu");
      return;
    }

    try {
      const { id, cost, ...cleanTransaction } = transaction;
      const payload = {
        ...cleanTransaction,
        customer_id: Number(transaction.customer_id),
        total_delivery: transaction.deliveries.length,
        deliveries: transaction.deliveries.map(
          ({ id, driver_id, vehicle_id, ...rest }) => ({
            ...rest,
            driver_id: Number(driver_id),
            vehicle_id: Number(vehicle_id),
          })
        ),
        payment_deadline: paymentDeadline.toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        const errorMessage =
          errorData.message ||
          `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Transaksi berhasil disimpan:", result);

      try {
        const updatePromises = transaction.deliveries.flatMap((d) => [
          axios.patch(`${API_BASE_URL}/driver/${d.driver_id}`, {
            status: "tidak tersedia",
          }),
          axios.patch(`${API_BASE_URL}/vehicle/${d.vehicle_id}`, {
            status: "tidak tersedia",
          }),
        ]);

        await Promise.all(updatePromises);
        console.log("Status driver dan kendaraan berhasil diupdate");
      } catch (updateError) {
        console.warn(
          "Transaksi berhasil disimpan, tetapi gagal mengupdate status:",
          updateError
        );
        toast.error(
          "Transaksi berhasil disimpan, tetapi gagal mengupdate status driver/kendaraan.",
          {
            description: "Silakan periksa status secara manual.",
            duration: 5000,
          }
        );
      }

      resetDelivery();
      resetTransaction();

      toast.success("Transaksi berhasil disimpan!");

      goToTransactionPages();
    } catch (error: any) {
      console.error("Terjadi kesalahan saat mengirim data:", error);

      let errorMessage = "Gagal menyimpan transaksi.";
      let errorDescription =
        "Periksa koneksi atau hubungi admin jika masalah berlanjut.";

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage = "Tidak dapat terhubung ke server.";
        errorDescription = "Periksa koneksi internet Anda.";
      } else if (error.message) {
        errorDescription = error.message;
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000,
      });
    }
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      payment_deadline: "",
    });

    setPaymentDeadline(null);
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
      toast.error("Silakan pilih pelanggan terlebih dahulu!");
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
      toast.error("Terjadi kesalahan");
    }
  };

  const handleDelete = (deliveryId: number) => {
    removeDeliveryFromTransaction(deliveryId);
    toast.success("Pengiriman berhasil dihapus!");
  };

  return (
    <form
      id="transaction-form"
      className="space-y-2 py"
      onSubmit={handleSubmitTransaction}
    >
      <SelectComponent
        label="Pelanggan"
        className="w-96"
        name="customer_id"
        value={transaction.customer_id}
        onChange={handleChange}
        options={customerOptions}
      />
      {transaction.customer_id && selectedCustomer && (
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
      <div className="flex justify-between py-5">
        <h1>Pengiriman</h1>
        <div>
          <div className="flex justify-center flex-col gap-3 border p-2 rounded-md">
            {deliveries.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">
                Belum ada pengiriman
              </p>
            ) : (
              deliveries.map((delivery, index) => (
                <div
                  key={`delivery-${delivery.id || "no-id"}-${index}`}
                  className="p-2 w-full rounded-md flex justify-between items-center bg-bg"
                >
                  <p>Pengiriman {index + 1}</p>
                  <div className="flex gap-1">
                    <ConfirmDialog
                      trigger={<ButtonComponent variant="delete" />}
                      title="Hapus Pengiriman"
                      description="Yakin ingin menghapus pengiriman ini?"
                      onConfirm={() => handleDelete(delivery.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div>
            <ButtonComponent
              label="Tambah Pengiriman"
              variant="add"
              className="w-96 mt-3"
              onClick={handleAddDelivery}
              type="button"
            />
          </div>
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
      <DatePickerComponent
        label="Batas Pembayaran"
        selectedDate={paymentDeadline}
        disablePastDate={true}
        onDateChange={(date) => {
          setPaymentDeadline(date);
          setFormData({
            ...formData,
            payment_deadline: date ? date.toISOString() : "",
          });
        }}
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

        <ConfirmDialog
          trigger={
            <ButtonComponent label="Simpan" variant="save" className="w-full" />
          }
          title="Konfirmasi Simpan"
          description="Apakah Anda yakin ingin menyimpan transaksi ini?"
          onConfirm={(e) => handleSubmitTransaction(e)}
        />
      </div>
    </form>
  );
};

export default AddTransactionForm;
