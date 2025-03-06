import React, { useState } from "react";
import Title from "../../components/Atom/Title";
import Form from "../../components/Molecule/Form";

function AddDeliveryPages() {
  const [textValue, setTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <>
      <Title title={"Tambah Pengiriman"} />
      <div>
        <form className="w-full">
          <Form
            label={"Customer"}
            options={[
              { value: "jakarta", label: "Jakarta" },
              { value: "bandung", label: "Bandung" },
              { value: "surabaya", label: "Surabaya" },
            ]}
          />
          <Form label={"Muatan"} />
          <Form label={"Jumlah"} type="number" />
          <Form label={"Titik Pengiriman"} type="number" />
          <Form label={"Tanggal Pengiriman"} />
          <Form label={"Tenggat Pengiriman"} />
          <Form
            label={"Driver"}
            options={[
              { value: "agus", label: "agus" },
              { value: "gunawan", label: "gunawan" },
              { value: "ino", label: "ino" },
            ]}
          />
          <Form label={"Kendaraan"} type="number" />
          <Form label={"Total"} type="number" />
        </form>
      </div>
    </>
  );
}

export default AddDeliveryPages;
