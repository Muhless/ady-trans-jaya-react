import React, { useState } from "react";
import AddButton from "../../components/ButtonAdd";
import CarAddModal from "../../components/Modal";
import SearchInput from "../../components/Search";
import Table from "../../components/Table";

function CustomerPages() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <h1 className="text-4xl font-bold text-text py-5">Pelanggan</h1>
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
      <CarAddModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default CustomerPages;
