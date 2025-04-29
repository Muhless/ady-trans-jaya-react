import React, { useState } from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import SelectComponent from "../input/Select";
import { Customer, useCustomers } from "../../hooks/useCustomers";
import useNavigationHooks from "../../hooks/useNavigation";

const AddTransactionForm = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const { goToAddDeliveryForm } = useNavigationHooks();
  const { customers, loading, error } = useCustomers();

  const customerOptions = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    console.log("Selected value (customer ID):", value);

    const selectedCustomer = customers.find(
      (customer) => customer.id === parseInt(value)
    );
    console.log("Selected customer object:", selectedCustomer);

    if (selectedCustomer) {
      setFormData({
        id: selectedCustomer.id.toString(),
        name: selectedCustomer.name,
        company: selectedCustomer.company,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
        address: selectedCustomer.address,
      });
    } else {
      setFormData({
        id: "",
        name: "",
        company: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  };

  const isCustomerSelected = formData.id !== "";

  if (loading) return <p>Harap tunggu sebentar...</p>;
  if (error) return <p>Terjadi kesalahan saat mengambil data pelanggan.</p>;

  const handleReset = () => {
    setSelectedCustomer(null);
    setFormData({
      id: "",
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.id) {
        alert("Silahkan pilih pelanggan terlebih dahulu");
        return;
      }
      const Response = await fetch("http://localhost:8080/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: parseInt(formData.id) }),
      });
      if (!Response.ok) {
        throw new Error("Gagal membuat transaksi baru");
      }
      console.log("Berhasil membuat data Transaksi baru");
      handleReset();
      goToAddDeliveryForm();
    } catch (error) {
      console.log("Terjadi kesalahan", error);
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault(), handleSubmit;
      }}
    >
      <SelectComponent
        label="Pelanggan"
        name="customer"
        value={formData.id}
        onChange={handleSelectChange}
        options={customerOptions}
      />
      <div className="flex flex-col justify-center space-y-4">
        <hr />
        <p className="mt-4 underline">Data Pelanggan</p>
        <InputComponent
          label="Nama"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-96"
          disabled={isCustomerSelected}
        />
        <InputComponent
          label="Perusahaan"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-96"
          disabled={isCustomerSelected}
        />
        <InputComponent
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-96"
          disabled={isCustomerSelected}
        />
        <InputComponent
          label="Nomor Telepon"
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-96"
          disabled={isCustomerSelected}
        />
        <InputComponent
          label="Alamat"
          type="textarea"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-96"
          disabled={isCustomerSelected}
        />
      </div>

      <div className="flex py-5 gap-4">
        <ButtonComponent label="Batal" variant="back" className="w-full" />
        {/* <ButtonComponent
          label="Ulangi"
          variant="undo"
          className="w-full"
          onClick={handleReset}
        /> */}
        <ButtonComponent
          label="Selanjutnya"
          variant="next"
          className="w-full"
          type="submit"
        />
      </div>
    </form>
  );
};

export default AddTransactionForm;
