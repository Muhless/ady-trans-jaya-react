import React from "react";
import ButtonComponent from "../atom/Button";

type TableProps = {
  data?: { id: string | number; [key: string]: any }[];
  className?: string;
  onRowClick?: (row: any) => void;
  showActions?: boolean;
};

const Table: React.FC<TableProps> = ({
  data = [],
  className = "bg-gray-500",
  onRowClick,
  showActions = false,
}) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <table className="w-full border text-sm cursor-pointer">
      <thead>
        <tr className={`text-center bg-kuning border-collapse ${className}`}>
          {headers.map((key) => (
            <th className="p-3">{key}</th>
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
            className="transition-all duration-300 border border-black hover:bg-sky-500 hover:text-primary"
          >
            {Object.keys(row).map((key) => (
              <td key={key} className="p-3">
                {row[key]}
              </td>
            ))}
            {showActions && (
              <td>
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
  );
};

export default Table;
