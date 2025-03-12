import React, { useState } from "react";
import { InputComponent } from "../Atom/Input";
import SelectComponent from "../Atom/Select";
import ButtonComponent from "../Atom/Button";

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

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-3 border p-5 rounded-lg">
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
        <div className="flex flex-row p-2 justify-center gap-5">
          <ButtonComponent variant="back" label="Kembali" className="py-2" />
          <ButtonComponent variant="save" label="Simpan" className="py-2" />
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
