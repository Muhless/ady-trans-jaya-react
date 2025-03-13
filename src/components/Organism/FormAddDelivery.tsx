import React, { useState } from "react";
import { InputComponent } from "../Atom/Input";
import SelectComponent from "../Atom/Select";
import ButtonComponent from "../Atom/Button";
import SubTitle from "../Atom/SubTitle";
import { Navigate, useNavigate } from "react-router-dom";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    customer: "",
    muatan: "",
    jenisMuatan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate("/delivery/add/map");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className=" border p-5 rounded-lg text-sm">
        <SubTitle
          subTitle="Form Tambah Pengiriman"
          className="text-center mb-5"
        />
        <SelectComponent
          label="Customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          options={[
            { value: "cihuy", label: "cihuy" },
            { value: "cihuy1", label: "cihuy1" },
            { value: "cihuy2", label: "cihuy2" },
            { value: "cihuy3", label: "cihuy3" },
          ]}
        />
        <InputComponent
          label="Muatan"
          type="text"
          name="muatan"
          value={formData.muatan}
          onChange={handleChange}
        />
        <InputComponent
          label="Jenis Muatan"
          type="number"
          name="jenisMuatan"
          value={formData.jenisMuatan}
          onChange={handleChange}
        />
        <div className="flex flex-row items-center justify-center w-full px-2 pb-2">
          <h1 className="text-lg font-semibold">Rute Pengiriman</h1>
          <ButtonComponent
            variant="map"
            className="ml-auto rounded-full text-text w-10 h-10 flex items-center justify-end"
            onClick={handleOnclick}
          />
        </div>
        <hr />
        <InputComponent
          label="Dari"
          name="from"
          disabled={true}
          onChange={handleChange}
        />
        <InputComponent
          label="Ke"
          name="to"
          disabled={true}
          onChange={handleChange}
        />
        <hr />
        <SelectComponent
          label="Driver"
          options={[
            { value: "Tyo", label: "Tyo" },
            { value: "Febri", label: "Febri" },
            { value: "Farizky", label: "Farizky" },
          ]}
        />
        <SelectComponent
          label="Kendaraan"
          options={[
            { value: "Toyota Pickup", label: "Toyota Pickup" },
            { value: "Fuso Box", label: "Fuso Box" },
            { value: "CDC", label: "CDC" },
          ]}
        />
        <InputComponent
          label="Tanggal Pengiriman"
          type="date"
          onChange={handleChange}
        />
        <InputComponent
          label="Batas Pengiriman"
          type="date"
          onChange={handleChange}
        />

        <div className="flex justify-center gap-5 w-full p-2">
          <ButtonComponent
            variant="back"
            label="Kembali"
            className="py-2 w-1/3 text-center"
          />
          <ButtonComponent
            variant="undo"
            label="Ulangi"
            className="py-2 w-1/3 text-center"
          />
          <ButtonComponent
            variant="save"
            label="Simpan"
            className="py-2 w-1/3 text-center"
          />
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
