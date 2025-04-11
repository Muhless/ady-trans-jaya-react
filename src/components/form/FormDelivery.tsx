import React, { useState } from "react";
import ButtonComponent from "../button/Index";
import Card from "../card";
import { Plus } from "lucide-react";
import useNavigationHooks from "../../hooks/useNavigation";
import SelectComponent from "../input/Select";
import { InputComponent } from "../input/Input";
import DateInputComponent from "../input/Date";

const FormDelivery = () => {
  const { goToAddDeliveryForm, goToDeliveryPages } = useNavigationHooks();
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
      <InputComponent label="Surat Jalan" className="w-96" disabled={true} />
      <SelectComponent
        label="Customer"
        name="customer"
        value={formData.customer}
        className="w-96"
        onChange={handleChange}
        options={[
          { value: "cihuy", label: "cihuy" },
          { value: "cihuy1", label: "cihuy1" },
          { value: "cihuy2", label: "cihuy2" },
          { value: "cihuy3", label: "cihuy3" },
        ]}
      />
      <SelectComponent
        label="Perusahaan"
        name="company"
        value={formData.company}
        className="w-96"
        onChange={handleChange}
        options={[
          { value: "cihuy", label: "cihuy" },
          { value: "cihuy1", label: "cihuy1" },
          { value: "cihuy2", label: "cihuy2" },
          { value: "cihuy3", label: "cihuy3" },
        ]}
      />

      <div className="flex justify-between">
        <h1>Pengiriman</h1>
        <Card className="bg-primary w-96 space-y-1">
          {/* TODO: Looping this shit */}
          <div className="flex justify-between items-center border border-black p-2 transition duration-300 hover:bg-biru cursor-pointer">
            <h1>Pengiriman 1</h1>
            <div className="flex space-x-1">
              <ButtonComponent variant="edit" className="hover:text-text" />
              <ButtonComponent variant="delete" />
            </div>
          </div>
          <div className="flex justify-between items-center border border-black p-2 transition duration-300 hover:bg-biru">
            <h1>Pengiriman 2</h1>
            <div className="flex space-x-1">
              <ButtonComponent variant="edit" className="hover:text-text" />
              <ButtonComponent variant="delete" />
            </div>
          </div>
          <div className="flex justify-between items-center border border-black p-2 transition duration-300 hover:bg-biru">
            <h1>Pengiriman 3</h1>
            <div className="flex space-x-1">
              <ButtonComponent variant="edit" className="hover:text-text" />
              <ButtonComponent variant="delete" />
            </div>
          </div>
          <ButtonComponent
            label="Tambah Pengiriman"
            variant="add"
            className="w-full p-2"
            onClick={goToAddDeliveryForm}
          />
        </Card>
      </div>
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
      <InputComponent
        label="Status"
        disabled={true}
        className="w-96"
      />
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
