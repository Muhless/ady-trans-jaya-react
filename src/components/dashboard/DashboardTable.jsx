import { ArrowUpRightFromSquareIcon } from "lucide-react";
import React from "react";

const DashboardTable = () => {
  return (
    <div className="p-5 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Driver</h1>
          <ArrowUpRightFromSquareIcon size={20} className="text-blue-400 underline cursor-pointer hover:text-highlight"/>
      </div>
      <table className="w-full mt-3 table-fixed">
        <tbody>
          <tr className="cursor-pointer hover:bg-gray-200">
            <td className="w-10 text-center">01</td>
            <td className=" w-52">manchester united</td>
            <td className="w-full text-text text-end">Sedang Berlangsung</td>
          </tr>
          <tr>
            <td className="w-10 text-center">01</td>
            <td className=" w-44">ahmad alajalj</td>
            <td className="w-full text-end">Sedang Berlangsung</td>
          </tr>
          <tr>
            <td className="w-10 text-center">01</td>
            <td className=" w-44">MUhammad abdurrasyid</td>
            <td className="w-full text-end">Selesai</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
