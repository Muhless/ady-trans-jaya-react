import React, { useState } from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import AddDeliveryCard from "../card/AddDeliveryCard";
import SelectComponent from "../input/Select";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import useNavigationHooks from "../../hooks/useNavigation";

const AddTransactionForm = () => {
  const { goToAddDeliveryForm} = useNavigationHooks();
  const customerOptions = useFetchOptions(
    "http://localhost:8080/api/customer",
    "name"
  );
  const [formData, setFormData] = useState({
    customer: "",
    company: "",
    jumlahMuatan: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form action="" className="space-y-4">
      <SelectComponent
        label="Pelanggan"
        name="customer"
        value={formData.customer}
        className="w-96"
        onChange={handleChange}
        options={customerOptions}
      />
      <div className="flex flex-col justify-center space-y-4">
        <hr />
        <p className="mt-4 underline">Buat data Pelanggan baru</p>
        <InputComponent label="Nama" className="w-96" />
        <InputComponent label="Perusahaan" className="w-96" />
        <InputComponent label="Email" type="email" className="w-96" />
        <InputComponent label="Nomor Telepon" type="number" className="w-96" />
        <InputComponent label="Alamat" type="text" className="w-96" />
      </div>

      <div className="flex py-5 gap-4">
        <ButtonComponent label="Batal" variant="back" className="w-full" />
        <ButtonComponent
          label="Selanjutnya"
          variant="next"
          className="w-full"
          onClick={goToAddDeliveryForm}
        />
      </div>
    </form>
  );
};

export default AddTransactionForm;
