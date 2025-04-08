import React from "react";
import ButtonComponent from "../button/Index";

type TableProps = {
  data?: { id: string | number; [key: string]: any }[];
  onRowClick?: (row: any) => void;
  showActions?: boolean;
};

const Table: React.FC<TableProps> = ({
  data = [],
  onRowClick,
  showActions = false,
}) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="overflow-auto  border border-black shadow-md">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-center bg-gray-300 border-b border-black">
            {headers.map((key, index) => (
              <th
                key={index}
                className="p-3 font-semibold border-r border-black last:border-r-0"
              >
                {key}
              </th>
            ))}
            {showActions && (
              <th className="p-3 font-semibold border-l border-black">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={`transition-all duration-200 hover:bg-sky-100 cursor-pointer ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              {Object.keys(row).map((key, colIndex) => (
                <td
                  key={colIndex}
                  className="p-3 border-t border-black border-r last:border-r-0"
                >
                  {row[key]}
                </td>
              ))}
              {showActions && (
                <td className="p-3 border-t border-black text-center">
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

export default Table;
