import { ArrowLeftRight, Edit, History, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Modal from "./Modal";
import ButtonEdit from "./ButtonEdit";
import ButtonDelete from "./ButtonDelete";

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
    name: "LIverpoll",
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
  return (
    <div className="bg-secondary rounded-lg flex flex-col flex-1 text-text p-5 cursor-pointer">
      <table className="w-full table-fixed">
        <tbody>
          {matches.map((match) => (
            <tr
              key={match.id}
              className="hover:bg-biru hover:text-primary ease-in-out transition-all hover:scale-105 duration-300"
            >
              <td className="text-center  w-10">{match.id}</td>
              <td className=" p-4">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{match.name}</p>
                  <p className="text-sm font-thin">{match.email}</p>
                </div>
              </td>
              <td>
                <p className="text-sm text-center">{match.phone}</p>
              </td>
              <td className="">{match.address}</td>
              <td>
                <div className="flex items-center justify-center text-text gap-4 cursor-pointer">
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
