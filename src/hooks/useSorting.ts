import { useState, useMemo } from "react";

/**
 * Custom hook for sorting data with flexible date field detection
 * @param {Array} data - Array of data to be sorted
 * @param {string} initialOrder - Initial sort order ('asc' or 'desc')
 * @param {Function} getDateFunction - Optional custom function to extract date from item
 * @returns {Object} - { sortedData, sortOrder, handleSortToggle }
 */
function useSorting(data = [], initialOrder = "desc", getDateFunction = null) {
  const [sortOrder, setSortOrder] = useState(initialOrder);

  // Default function to get date from transaction/item
  const defaultGetDate = (item) => {
    const dateField =
      item.createdAt ||
      item.date ||
      item.timestamp ||
      item.created_at ||
      item.transaction_date ||
      item.payment_deadline;
    return dateField ? new Date(dateField) : null;
  };

  // Use custom function if provided, otherwise use default
  const getDate = getDateFunction || defaultGetDate;

  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
      const dateA = getDate(a);
      const dateB = getDate(b);

      // Handle cases where dates might be null/undefined
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      if (sortOrder === "desc") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }, [data, sortOrder, getDate]);

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const setSortOrderDirect = (order) => {
    if (order === "asc" || order === "desc") {
      setSortOrder(order);
    }
  };

  return {
    sortedData,
    sortOrder,
    handleSortToggle,
    setSortOrder: setSortOrderDirect,
  };
}

export default useSorting;
