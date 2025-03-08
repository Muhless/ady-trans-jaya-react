import React, { useState } from "react";
import Title from "../../components/Atom/Title";
import Form from "../../components/Molecule/Form";

function AddDeliveryPages() {
  const [textValue, setTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <>
      <Title title={"Tambah Pengiriman"} />
      <div className="">
        <Form
          fields={[
            {
              label: "Customer",
              options: [
                { value: "jakarta", label: "Jakarta" },
                { value: "bandung", label: "Bandung" },
                { value: "surabaya", label: "Surabaya" },
              ],
            },
            { label: "Muatan", type: "number", placeholder: "Jenis muatan" },
            { label: "Jumlah", type: "number", placeholder: "Jumlah muatan" },
            {
              label: "Titik Pengiriman",
              type: "text",
              placeholder: "Titik awal pengiriman",
              // TODO Add button to set delivery point!! 
            },
            {
              label: "Tanggal Pengiriman",
              placeholder: "Tentukan tanggal pengiriman",
            },
            {
              label: "Tenggat Pengiriman",
              placeholder: "Tentukan tanggal batas pengiriman",
            },
            {
              label: "Driver",
              options: [
                { value: "ady", label: "ady" },
                { value: "cihuy", label: "cihuy" },
                { value: "jaya", label: "jaya" },
              ],
            },
            {
              label: "Kendaraan",
              options: [
                { value: "Toyota Avanza", label: "Toyota Avanza" },
                { value: "Mitsubishi Fuso", label: "Mitsubishi Fuso" },
                { value: "Toyota Pickup", label: "Toyota Pickup" },
              ],
            },
          ]}
        />
      </div>
    </>
  );
}

export default AddDeliveryPages;
