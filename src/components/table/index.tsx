import React from "react";
import ButtonComponent from "../button/Index";
import Card from "../card";

export type ColumnConfig = {
  key: string;
  label: string;
};

type TableProps = {
  data?: { id: string | number; [key: string]: any }[];
  onRowClick?: (row: any) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
  columns?: ColumnConfig[];
  classNameTH?: string;
  classNameTD?: string;
  // Tambahkan props untuk pagination
  currentPage?: number;
  itemsPerPage?: number;
  startIndex?: number; // Alternatif: langsung pass startIndex
};

const TableComponent: React.FC<TableProps> = ({
  data = [],
  onRowClick,
  onDelete,
  showActions = false,
  columns,
  classNameTH,
  classNameTD,
  currentPage = 1,
  itemsPerPage = 5,
  startIndex, // Jika ingin langsung pass startIndex
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

  // Hitung starting number untuk kolom "No"
  const getRowNumber = (rowIndex: number) => {
    if (startIndex !== undefined) {
      return startIndex + rowIndex + 1;
    }
    return (currentPage - 1) * itemsPerPage + rowIndex + 1;
  };

  return (
    <Card className="overflow-auto rounded-md">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-center border-b">
            {displayHeaders.length > 0 && (
              <th className={`${classNameTH} text-base`}>No</th>
            )}
            {displayHeaders.map(({ label }, index) => (
              <th key={index} className={`${classNameTH} text-base`}>
                {label}
              </th>
            ))}
            {showActions && (
              <th className={`${classNameTH} text-base`}>Aksi</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={displayHeaders.length + (showActions ? 2 : 1)}
                className={`${classNameTD} text-center`}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-gray-500 text-sm font-medium">
                    Tidak ada data
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={`${row.id}-${rowIndex}`}
                onClick={() => onRowClick?.(row)}
                className="transition-all duration-200 hover:bg-sky-100 cursor-pointer text-center"
              >
                {/* FIX: Gunakan getRowNumber untuk menghitung nomor yang benar */}
                <td className={`${classNameTD} border-b`}>
                  {getRowNumber(rowIndex)}
                </td>
                {displayHeaders.map(({ key }, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${classNameTD} border-b break-words max-w-[200px]`}
                  >
                    {row[key] ? (
                      ["transaction_status", "delivery_status"].includes(
                        key
                      ) ? (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            row[key] === "disetujui"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : row[key] === "ditolak"
                              ? "bg-red-100 text-red-800 border-red-300"
                               : row[key] === "diproses"
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : row[key] === "dibatalkan"
                              ? "bg-gray-100 text-gray-800 border-gray-300"
                              : "bg-yellow-100 text-yellow-800 border-yellow-300"
                          }`}
                        >
                          {row[key]?.charAt(0).toUpperCase() +
                            row[key]?.slice(1)}
                        </span>
                      ) : (
                        row[key]
                      )
                    ) : (
                      ""
                    )}
                  </td>
                ))}

                {showActions && (
                  <td className={`${classNameTD} border-b text-center`}>
                    <div className="flex justify-center gap-2">
                      <ButtonComponent
                        variant="edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick?.(row);
                        }}
                      />
                      <ButtonComponent
                        variant="delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(Number(row.id));
                        }}
                      />
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