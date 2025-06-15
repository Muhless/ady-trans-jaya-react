import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationControls: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Early return jika tidak ada data atau hanya 1 halaman
  if (totalPages <= 1 || totalPages === 0) return null;

  // Validasi currentPage untuk mencegah nilai yang tidak valid
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // Handle page change dengan validasi
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== validCurrentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, validCurrentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (start > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }
      if (end < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="mt-4 justify-end">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage === 1}
          >
            Sebelumnya
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <PaginationItem key={`page-${index}`}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <PaginationLink
                isActive={validCurrentPage === page}
                onClick={() => handlePageChange(page as number)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={validCurrentPage === totalPages}
          >
            Selanjutnya
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
