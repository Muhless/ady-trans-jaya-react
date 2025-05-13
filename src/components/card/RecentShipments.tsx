import React from 'react';

const shipments = [
  { id: 'INV-001', pelanggan: 'Budi', tujuan: 'Jakarta', status: 'Dalam Pengiriman', tanggal: '13 Mei 2025' },
  { id: 'INV-002', pelanggan: 'Sari', tujuan: 'Bandung', status: 'Selesai', tanggal: '13 Mei 2025' },
  // Tambah data dummy lainnya
];

const RecentShipmentsTable = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Pengiriman Terbaru</h2>
      <table className="w-full table-auto text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Pelanggan</th>
            <th className="p-2">Tujuan</th>
            <th className="p-2">Status</th>
            <th className="p-2">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.pelanggan}</td>
              <td className="p-2">{s.tujuan}</td>
              <td className="p-2">{s.status}</td>
              <td className="p-2">{s.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentShipmentsTable;
