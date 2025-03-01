import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ButtonEdit from "./ButtonEdit";
import ButtonDelete from "./ButtonDelete";
import { Navigate, useNavigate } from "react-router-dom";

const matches = [
  {
    id: "01",
    name: "Manchester United",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "02",
    name: "Liverpool",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
  {
    id: "03",
    name: "Chelsea",
    email: "cihuy@gmail.com",
    phone: "089813131",
    address: "Jl. London No.27",
  },
];

const Table = () => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate("/driver");
  };

  return (
    <div className="bg-secondary rounded-lg flex flex-col flex-1 text-text p-5 cursor-pointer">
      <table className="w-full table-fixed border-collapse border-none">
        <tbody>
          {matches.map((match) => (
            <tr
              onClick={() => handleRowClick()}
              key={match.id}
              className="hover:bg-biru hover:text-primary ease-in-out transition-all duration-300 border-none"
            >
              <td className="text-center w-10 border-0">{match.id}</td>
              <td className="p-4 border-0">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{match.name}</p>
                  <p className="text-sm font-thin">{match.email}</p>
                </div>
              </td>
              <td className="text-sm text-center border-0">{match.phone}</td>
              <td className="border-0">{match.address}</td>
              <td className="border-0">
                <div className="flex items-center justify-center text-text gap-4">
                  <ButtonEdit />
                  <ButtonDelete />
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
