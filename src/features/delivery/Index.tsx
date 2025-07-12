import { useQuery } from "@tanstack/react-query";
import SearchInput from "@/components/input/Search.js";
import DeliveryStatCard from "@/components/card/stat/DeliveryStatCard";
import TitleComponent from "@/components/Title";
import { fetchDeliveries } from "@/api/delivery";
import DeliveryTable from "@/components/table/DeliveryTable";
import DateRangePicker from "@/components/common/DateRangePicker";
import { useFilterHandlers } from "@/handlers/transactionHandlers";
import { useMemo } from "react";
import useSorting from "@/hooks/useSorting";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatDateNumeric } from "../../../utils/Formatters";

function DeliveryPages() {
  const {
    data: delivery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveries"],
    queryFn: fetchDeliveries,
  });

  const {
    dateRange,
    searchTerm,
    quickFilter,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    clearDateFilter,
  } = useFilterHandlers();

  const getDeliveryDate = (delivery) => {
    const dateField =
      delivery.createdAt ||
      delivery.date ||
      delivery.timestamp ||
      delivery.created_at ||
      delivery.delivery_date ||
      delivery.delivery_deadline_date;
    return dateField ? new Date(dateField) : null;
  };

  const dateFilteredDeliveries = useMemo(() => {
    if (!delivery) return [];

    if (!dateRange.startDate && !dateRange.endDate) {
      return delivery;
    }

    return delivery.filter((delivery) => {
      const deliveryDate = getDeliveryDate(delivery);
      if (!deliveryDate) return false;

      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate)
        : null;
      const endDate = dateRange.endDate
        ? new Date(dateRange.endDate + "T23:59:59")
        : null;

      if (startDate && deliveryDate < startDate) return false;
      if (endDate && deliveryDate > endDate) return false;

      return true;
    });
  }, [delivery, dateRange]);

  const { sortedData: sortedDeliveries } = useSorting(
    dateFilteredDeliveries,
    "desc",
    getDeliveryDate
  );

  const filteredDelivery = useMemo(() => {
    if (!searchTerm) return sortedDeliveries;

    const term = searchTerm.toLowerCase();

    return sortedDeliveries.filter((delivery) => {
      const formattedDeliveryDate = formatDateNumeric(
        delivery.delivery_date || ""
      ).toLowerCase();
      const formattedDeadlineDate = formatDateNumeric(
        delivery.delivery_deadline_date || ""
      ).toLowerCase();
      
      // Fixed: Remove nested filter, directly check conditions
      return (
        delivery.transaction?.customer?.name?.toLowerCase().includes(term) ||
        delivery.destination_address?.toLowerCase().includes(term) ||
        delivery.driver?.name?.toLowerCase().includes(term) ||
        delivery.vehicle?.name?.toLowerCase().includes(term) ||
        formattedDeliveryDate.includes(term) ||
        formattedDeadlineDate.includes(term) ||
        delivery.delivery_status?.toLowerCase().includes(term)
      );
    });
  }, [sortedDeliveries, searchTerm]);

  return (
    <div>
      <TitleComponent title={"Pengiriman"} />
      <DeliveryStatCard
        deliveries={sortedDeliveries}
        loading={isLoading}
        error={isError}
      />
      <div className="flex justify-between pt-10 pb-5">
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onClear={clearDateFilter}
          buttonWidth="w-44"
        />
        <SearchInput
          placeholder={"pengiriman"}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="text-center p-5">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-600 p-5">Error loading data</div>
      ) : (
        <DeliveryTable
          deliveries={filteredDelivery}
          loading={isLoading}
          error={isError}
          classNameTH="p-3"
          classNameTD="p-5"
          showActions={false}
        />
      )}
    </div>
  );
}

export default DeliveryPages;