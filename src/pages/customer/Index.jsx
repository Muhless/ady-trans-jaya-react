import React, { useState } from "react";
import AddButton from "../../components/ButtonAdd";
import SearchInput from "../../components/Search";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Title from "../../components/Title";

function CustomerPages() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
     <Title title={'Pelanggan'}/>
      <div className="flex justify-between mb-5">
        <AddButton
          name={"Pelanggan"}
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <SearchInput />
      </div>
      <div className="rounded-lg bg-card">
        <div className="col-span-1 h-screen text-text">
          <Table />
        </div>
      </div>
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
