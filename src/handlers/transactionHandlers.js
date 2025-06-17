// hooks/useFilterHandlers.js
import { useState } from "react";

export const useFilterHandlers = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [quickFilter, setQuickFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
    setQuickFilter("");
  };

  const clearDateFilter = () => {
    setDateRange({ startDate: "", endDate: "" });
    setQuickFilter("");
  };

  const handleStartDateChange = (date) => {
    handleDateRangeChange("startDate", date);
  };

  const handleEndDateChange = (date) => {
    handleDateRangeChange("endDate", date);
  };

  return {
    dateRange,
    searchTerm,
    quickFilter,
    handleSearchChange,
    handleDateRangeChange,
    clearDateFilter,
    handleStartDateChange,
    handleEndDateChange,
  };
};
