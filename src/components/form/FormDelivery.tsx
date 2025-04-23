import React, { useState } from "react";
import ButtonComponent from "../button/Index";
import Card from "../card";
import useNavigationHooks from "../../hooks/useNavigation";
import SelectComponent from "../input/Select";
import { InputComponent } from "../input/Input";
import DateInputComponent from "../input/Date";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import AddDeliveryCard from "../card/AddDeliveryCard";

const FormDelivery = () => {
  const { goToDeliveryPages } = useNavigationHooks();
  const customerOptions = useFetchOptions("http://localhost:8080/api/customer", "name");
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
    <form action="" className="space-y-8">
      <SelectComponent
        label="Customer"
        name="customer"
        value={formData.customer}
        className="w-96"
        onChange={handleChange}
        options={customerOptions}
      />

      <div className="flex justify-between gap-5">
        <h1>Pengiriman</h1>
        <AddDeliveryCard />
      </div>
      <InputComponent
        label="Jumlah Pengiriman"
        className="w-96"
        disabled={true}
      />
      <InputComponent label="Total" className="w-96" disabled={true} />
      <SelectComponent
        label="Pembayaran"
        name="payment"
        className="w-96"
        onChange={handleChange}
        options={[
          { value: "cihuy", label: "cihuy" },
          { value: "cihuy1", label: "cihuy1" },
          { value: "cihuy2", label: "cihuy2" },
          { value: "cihuy3", label: "cihuy3" },
        ]}
      />
      <DateInputComponent label="Batas Pembayaran" className="w-96" />
      <InputComponent label="Status" disabled={true} className="w-96" />
      <div className="flex py-5 gap-4">
        <ButtonComponent label="Kembali" variant="back" className="w-full" />
        <ButtonComponent label="Ulangi" variant="undo" className="w-full" />
        <ButtonComponent
          label="Simpan"
          variant="save"
          className="w-full"
          onClick={goToDeliveryPages}
        />
      </div>
    </form>
  );
};

export default FormDelivery;
