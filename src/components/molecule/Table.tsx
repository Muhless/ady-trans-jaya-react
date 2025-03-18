import React from "react";
import ButtonEdit from "../atom/ButtonEdit";
import ButtonDelete from "../atom/ButtonDelete";

type TableProps = {
  data?: { id: string | number; [key: string]: any }[];
  classname?: string;
  onRowClick?: (row: any) => void;
  showActions?: boolean;
};

const Table: React.FC<TableProps> = ({
  data = [],
  classname,
  onRowClick,
  showActions = false,
}) => {
  return (
    <table
      className={`w-full table-auto border-collapse border-none rounded-lg text-sm cursor-pointer ${classname}`}
    >
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick?.(row)}
            className="hover:bg-biru hover:text-primary ease-in-out transition-all duration-300"
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
