import React, { useState } from "react";
import SearchInput from "../../components/input/Search.tsx";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title.js";
import ButtonComponent from "../../components/button/Index.tsx";
import Modal from "../../components/Modal.tsx";
import TableComponent from "../../components/table/index.tsx";
import Card from "../../components/card/index.tsx";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Nomor HP", type: "number" },
  { name: "address", label: "Alamat", type: "textarea" },
];

const customer = [
  {
    id: 1,
    name: "ady",
    email: "ady@gmail.com",
    phone: "08871165551",
    address: "Jl. Balaraja Kab.Tangerang",
  },
  {
    id: 1,
    name: "ady",
    email: "ady@gmail.com",
    phone: "08871165551",
    address: "Jl. Balaraja Kab.Tangerang",
  },
  {
    id: 1,
    name: "ady",
    email: "ady@gmail.com",
    phone: "08871165551",
    address: "Jl. Balaraja Kab.Tangerang",
  },
];

function CustomerPages() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/customer/id`);
  };
  return (
    <>
      <Title title={"Customer"} />
      <div className="flex justify-between mb-5">
        <ButtonComponent
          label="Tambah Customer"
          variant="add"
          className="w-48"
          onClick={() => setModalOpen(true)}
        />
        <SearchInput placeholder="customer" />
      </div>
      <Card>
        <TableComponent
          data={customer}
          onRowClick={handleRowClick}
          showActions={true}
        />
      </Card>
      <Modal
        title="Customer"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={modalInput}
      />
    </>
  );
}

export default CustomerPages;
