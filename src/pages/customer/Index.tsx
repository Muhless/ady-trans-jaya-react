import React, { useState } from "react";
import SearchInput from "../../components/Atom/Search.tsx";
import Table from "../../components/Molecule/Table.tsx";
import Modal from "../../components/Molecule/Modal.tsx";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Atom/Title.jsx";
import AddButton from "../../components/Atom/ButtonAdd.tsx";
import ButtonComponent from "../../components/Atom/Button.tsx";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Nomor HP", type: "number" },
  { name: "address", label: "Alamat", type: "text" },
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
      <Table data={customer} onRowClick={handleRowClick} showActions={true} />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={modalInput}
      />
    </>
  );
}

export default CustomerPages;
