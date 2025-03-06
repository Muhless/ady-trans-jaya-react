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
        <Form
          fields={[
            {
              label: "Customer",
              placeholder:'Pilih customer',
              options: [
                { value: "jakarta", label: "Jakarta" },
                { value: "bandung", label: "Bandung" },
                { value: "surabaya", label: "Surabaya" },
              ],
            },
            { label: "Muatan", type: "number" },
            { label: "Jumlah", type: "number" },
            { label: "Titik Pengiriman", type: "text" },
            { label: "Tanggal Pengiriman" },
            { label: "Tenggat Pengiriman" },
            {
              label: "Driver",
              options: [
                { value: "ady", label: "ady" },
                { value: "cihuy", label: "cihuy" },
                { value: "jaya", label: "jaya" },
              ],
            },
          ]}
        />
      </div>
    </>
  );
}

export default AddDeliveryPages;
