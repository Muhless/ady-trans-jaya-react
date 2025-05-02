import React from "react";
import { useCustomers } from "../../hooks/useCustomers";
import useNavigationHooks from "../../hooks/useNavigation";
import { useTransactionStore } from "../../stores/transactionStore";
import SelectComponent from "../input/Select";
import ButtonComponent from "../button/Index";

const AddTransactionForm = () => {
  const { goToAddDeliveryForm, goToCustomerPages, goBack } =
    useNavigationHooks();
  const { customers, loading, error } = useCustomers();

  const { transaction, setTransaction, resetTransaction } =
    useTransactionStore();
  const state = useTransactionStore.getState();
  console.log(state.transaction);

  const customerOptions = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

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
    try {
      const formattedPaymentDeadline = transaction.payment_deadline
        ? new Date(transaction.payment_deadline).toISOString()
        : null;

      setTransaction({
        customer_id: Number(transaction.customer_id),
        payment_deadline: formattedPaymentDeadline,
      });

      console.log("Data tersimpan ke state:", transaction);

      goToAddDeliveryForm();
    } catch (error: any) {
      console.error("Terjadi kesalahan", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    resetTransaction();
    goBack();
    console.log(
      "Transaction state after reset:",
      useTransactionStore.getState().transaction
    );
  };

  if (loading) return <p>Harap tunggu sebentar...</p>;
  if (error) return <p>Terjadi kesalahan saat mengambil data pelanggan.</p>;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <SelectComponent
        label="Pelanggan"
        name="customer_id"
        value={transaction.customer_id}
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
        <ButtonComponent
          label="Batal"
          variant="back"
          type="button"
          className="w-full"
          onClick={handleCancel}
        />
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
