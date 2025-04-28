import React from "react";
import ButtonComponent from "../button/Index";
import Card from "../card";

type ColumnConfig = {
  key: string;
  label: string;
};

type TableProps = {
  data?: { id: string | number; [key: string]: any }[];
  onRowClick?: (row: any) => void;
  showActions?: boolean;
  columns?: ColumnConfig[];
};

const TableComponent: React.FC<TableProps> = ({
  data = [],
  onRowClick,
  showActions = false,
  columns,
}) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const displayHeaders =
    columns && columns.length > 0
      ? columns
      : headers
          .filter((key) => key !== "id")
          .map((key) => ({
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
          }));

  return (
    <Card className="overflow-auto rounded-xl">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-center border-b">
            {displayHeaders.length > 0 && (
              <th className="p-3 text-base font-semibold">No</th>
            )}
            {displayHeaders.map(({ label }, index) => (
              <th key={index} className="p-3 text-base font-semibold">
                {label}
              </th>
            ))}
            {showActions && (
              <th className="p-3 text-base font-semibold ">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={displayHeaders.length + (showActions ? 1 : 0)}
                className="text-center p-5 text-gray-500"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`transition-all duration-200 hover:bg-sky-100 cursor-pointer text-center ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-3 border-b">{rowIndex + 1}</td>
                {displayHeaders.map(({ key }, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-3 border-b break-words max-w-[200px]"
                  >
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
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default TableComponent;
