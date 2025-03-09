import React, { useState } from "react";
import Title from "../../components/Atom/Title";
import Form from "../../components/Molecule/Form";
import ButtonComponent from "../../components/Atom/Button";
import MapPages from "../Map";

function AddDeliveryPages() {
  const [address, setaddress] = useState<string>("");
  return (
    <>
      <Title title={"Tambah Pengiriman"} />
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <div className="flex justify-center">
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
                { label: "Muatan", type: "text", placeholder: "Jenis muatan" },
                {
                  label: "Jumlah",
                  type: "number",
                  placeholder: "Jumlah muatan",
                },
                {
                  label: "Titik Awal Pengiriman",
                  type: "text",
                  placeholder: "Tentukan awal pengiriman",
                  value: address,
                  
                },
                {
                  label: "Titik Tujuan Pengiriman",
                  type: "text",
                  placeholder: "Tentukan tujuan pengiriman",
                },
                {
                  label: "Tanggal Pengiriman",
                  type: "date",
                },
                {
                  label: "Tenggat Pengiriman",
                  type: "date",
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
          <div className="flex flex-row justify-center gap-10 mt-5">
            <ButtonComponent variant="back" label="Kembali" classname="py-2" />
            <ButtonComponent variant="save" label="Simpan" />
          </div>
        </div>
        <div className="col-span-2">
          <MapPages />
        </div>
      </div>
    </>
  );
}

export default AddDeliveryPages;
