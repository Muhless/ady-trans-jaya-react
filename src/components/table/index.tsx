import React from "react";
import ButtonComponent from "../button/Index";

type TableProps = {
  data?: { id: string | number; [key: string]: any }[];
  onRowClick?: (row: any) => void;
  showActions?: boolean;
};

const TableComponent: React.FC<TableProps> = ({
  data = [],
  onRowClick,
  showActions = false,
}) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="overflow-auto rounded-xl">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-center border-b">
            {headers.map((key, index) => (
              <th key={index} className="p-3 text-base font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
            {showActions && <th className="p-3 text-base font-semibold ">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className="transition-all duration-200 hover:bg-sky-100 cursor-pointer text-center"
              // className={`transition-all duration-200 hover:bg-sky-100 cursor-pointer text-center ${
              //   rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
              // }`}
            >
              {Object.keys(row).map((key, colIndex) => (
                <td key={colIndex} className="p-3 border-b">
                  {row[key]}
                </td>
              ))}
              {showActions && (
                <td className="p-3 text-center border-b">
                  <div className="flex justify-center gap-2">
                    <ButtonComponent variant="edit" />
                    <ButtonComponent variant="delete" />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
