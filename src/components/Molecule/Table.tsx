import React from "react";
import ButtonEdit from "../Atom/ButtonEdit";
import ButtonDelete from "../Atom/ButtonDelete";

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
  return (
    <table className="w-full table-auto border-collapse border-none bg-secondary rounded-lg cursor-pointer">
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick?.(row)}
            className="hover:bg-biru hover:text-primary ease-in-out transition-all duration-300 border-b"
          >
            {Object.keys(row).map((key) => (
              <td key={key} className="p-4 border-0 ">
                {row[key]}
              </td>
            ))}
            {showActions && (
              <td className="">
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
