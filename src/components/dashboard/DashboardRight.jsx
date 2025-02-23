import React from "react";

const DashboardRight = () => {
  return (
    <div className="p-5 mb-5 bg-white rounded-xl h-1/2">
      <h1 className="text-2xl font-medium">Pengiriman</h1>
      <table className="w-full mt-3 border table-fixed">
        <thead>
          <tr className="">
            <th className="w-10">No</th>
            <th>Pelanggan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-10 text-center">1</td>
            <td>cihuy</td>
            <td>cihuy</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardRight;
