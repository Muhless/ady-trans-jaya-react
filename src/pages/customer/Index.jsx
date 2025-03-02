import React, { useState } from "react";
import AddButton from "../../components/ButtonAdd";
import SearchInput from "../../components/Search";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";

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
        <SearchInput placeholder="pelanggan"/>
      </div>
          <Table data={customer} onRowClick={handleRowClick} showActions={true}/>
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
