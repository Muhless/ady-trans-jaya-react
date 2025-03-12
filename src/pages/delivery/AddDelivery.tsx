import React, { useState } from "react";
import Form from "../../components/Organism/Form";
import "mapbox-gl/dist/mapbox-gl.css";
import Title from "../../components/Atom/Title";
import ButtonComponent from "../../components/Atom/Button";

function AddDeliveryPages() {
  return (
    <>
      <Title title={"Tambah Pengiriman"} />
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
              label: "Berat",
              type: "text",
              placeholder: "Berat muatan",
            },
            {
              label: "Pengiriman",
            },
            {
              label: "Dari",
              type: "text",
              placeholder: "Tentukan tujuan pengiriman",
              disabled: true,
            },
            {
              label: "Ke",
              type: "text",
              placeholder: "Tentukan tujuan pengiriman",
              disabled: true,
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
      <div className="col-span-2"></div>
    </>
  );
}

export default AddDeliveryPages;
