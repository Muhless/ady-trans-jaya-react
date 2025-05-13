import React from 'react';

const alerts = [
  '⚠️ Pengiriman INV-003 melebihi estimasi waktu!',
  '🛑 Kendaraan D 1234 XX tidak aktif sejak 2 jam lalu',
];

const Alerts = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Notifikasi</h2>
      <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
