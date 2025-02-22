import React from "react";

const DashboardTable = () => {
  return (
    <div className="p-5 bg-white border border-black">
      <h1 className="text-xl font-medium">Driver</h1>
      <table className="w-full mt-3 table-fixed">
        <tbody>
          <tr className="cursor-pointer hover:bg-gray-200">
            <td className="w-10 text-center border border-black">01</td>
            <td className="border border-black w-52">manchester united</td>
            <td className="w-full border border-black text-text text-end">Sedang Berlangsung</td>
          </tr>
          <tr>
            <td className="w-10 text-center border border-black">01</td>
            <td className="border border-black w-44">ahmad alajalj</td>
            <td className="w-full border border-black text-end">Sedang Berlangsung</td>
          </tr>
          <tr>
            <td className="w-10 text-center border border-black">01</td>
            <td className="border border-black w-44">MUhammad abdurrasyid</td>
            <td className="w-full border border-black text-end">Selesai</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
