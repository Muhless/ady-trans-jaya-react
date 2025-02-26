import { Edit, History, Trash2 } from "lucide-react";
import React from "react";

const matches = [
  {
    id: "01",
    name: "Manchester United",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "02",
    name: "LIverpoll",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "03",
    name: "Chelsea",
    phone: "089813131",
    address: "Jl. London No.27",
  },
];

const Table = () => {
  return (
    <div className="p-5 bg-secondary rounded-lg flex flex-col flex-1 text-text">
      <table className="w-full table-">
        <tbody>
          {matches.map((match) => (
            <tr
              key={match.id}
              className="cursor-pointer hover:bg-biru hover:text-primary border"
            >
              <td className="text-center border w-10">{match.id}</td>
              <td className="border">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{match.name}</span>
                  <span className="text-sm text-gray-500">{match.phone}</span>
                </div>
              </td>
              <td className="border">{match.address}</td>
              <td className="border">
                <div className="flex gap-1 items-center justify-center">
                  <History className="w-4 h-4" />
                  Riwayat
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  <Edit className="bg-kuning p-4 rounded-full text-primary"/>
                  <Trash2 className="bg-merah p-4 rounded-full text-primary"/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
