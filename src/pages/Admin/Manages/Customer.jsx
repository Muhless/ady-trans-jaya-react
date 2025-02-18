import React from "react";
import { Helmet } from "react-helmet-async";

function CustomerPages() {
  return (
    <div>
      <Helmet>
        <title>Halaman Daftar Pelanggan</title>
      </Helmet>
      <div className="rounded-lg bg-card">
        <div className="col-span-1 h-screen p-5">
          <h1 className="text-xl font-bold">Daftar Pelanggan</h1>
          <table className="w-full border mt-5">
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
    </div>
  );
}

export default CustomerPages;
