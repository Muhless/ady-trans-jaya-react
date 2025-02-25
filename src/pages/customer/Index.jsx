import React, { useState } from "react";
import AddButton from "../../components/ButtonAdd";
import CarAddModal from "../../components/Modal";
import SearchInput from "../../components/Search";

function CustomerPages() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <h1 className="text-4xl font-bold text-text py-5">Pelanggan</h1>
      <div className="flex justify-between">
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
          <table className="w-full border">
            <thead>
              <tr className="items-center">
                <th className="border py-2">No</th>
                <th className="border py-2">Nama</th>
                <th className="border py-2">Nomor Telepon</th>
                <th className="border py-2">Alamat</th>
                <th className="border py-2">Riwayat Transaksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <CarAddModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default CustomerPages;
