import React from "react";
import ButtonEdit from "../atom/ButtonEdit";
import ButtonDelete from "../atom/ButtonDelete";

type TableProps = {
  data?: { id: string | number; [key: string]: any }[];
  className?: string;
  onRowClick?: (row: any) => void;
  showActions?: boolean;
};

const Table: React.FC<TableProps> = ({
  data = [],
  className = "bg-gray-500 ",
  onRowClick,
  showActions = false,
}) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <table className="w-full text-sm border-collapse border-none rounded-lg table-auto cursor-pointer bg-secondary">
      <thead>
        <tr className={`text-left ${className}`}>
          {headers.map((key) => (
            <th className="p-4">{key.toUpperCase()}</th>
          ))}
          {showActions && (
            <th className={`p-4 text-center ${className}`}>Aksi</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick?.(row)}
            className="transition-all duration-300 ease-in-out border-b hover:bg-biru hover:text-primary"
          >
            {Object.keys(row).map((key) => (
              <td key={key} className="p-4">
                {row[key]}
              </td>
            ))}
            {showActions && (
              <td>
                <div className="flex justify-center gap-2">
                  <ButtonEdit size={15} />
                  <ButtonDelete size={15} />
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
