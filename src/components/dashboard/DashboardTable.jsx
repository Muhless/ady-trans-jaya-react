import React from "react";

const DashboardTable = () => {
  return (
    <div>
      <table className="w-full table-fixed">
        <tbody>
          <tr className="cursor-pointer hover:bg-gray-200">
            <td className="border border-black w-10 text-center">01</td>
            <td className="border border-black w-52">manchester united</td>
            <td className="border border-black w-full text-text text-end">Sedang Berlangsung</td>
          </tr>
          <tr>
            <td className="border border-black w-10 text-center">01</td>
            <td className="border border-black w-44">ahmad alajalj</td>
            <td className="border border-black w-full text-end">Sedang Berlangsung</td>
          </tr>
          <tr>
            <td className="border border-black w-10 text-center">01</td>
            <td className="border border-black w-44">MUhammad abdurrasyid</td>
            <td className="border border-black w-full text-end">Selesai</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
