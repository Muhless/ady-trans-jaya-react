import React, { useState } from "react";
import SearchInput from "../../components/Atom/Search.tsx";
import Table from "../../components/Molecule/Table.tsx";
import Modal from "../../components/Molecule/Modal.tsx";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Atom/Title.jsx";
import AddButton from "../../components/Atom/ButtonAdd.tsx";

const customer = [
  {
    no: 1,
    name: "ady",
    email: "ady@gmail.com",
    phone: "08871165551",
    address: "Jl. Balaraja Kab.Tangerang",
  },
  {
    no: 1,
    name: "ady",
    email: "ady@gmail.com",
    phone: "08871165551",
    address: "Jl. Balaraja Kab.Tangerang",
  },
  {
    no: 1,
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
    navigate(`/customer/${row.id}`);
  };
  return (
    <>
      <Title title={"Pelanggan"} />
      <div className="flex justify-between mb-5">
        <AddButton
          name={"Pelanggan"}
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <SearchInput placeholder="pelanggan" />
      </div>
      <Table data={customer} onRowClick={handleRowClick} showActions={true} />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        label1="Nama Pelanggan"
        label2="Email"
        type2="email"
        label3="Nomor Telepon"
        type3="number"
        label4="Alamat"
      />
    </>
  );
}

export default CustomerPages;
