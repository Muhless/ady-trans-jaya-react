import { useQuery } from "@tanstack/react-query";
import SearchInput from "@/components/input/Search.js";
import DeliveryStatCard from "@/components/card/stat/DeliveryStatCard";
import TitleComponent from "@/components/Title";
import { fetchDeliveries } from "@/api/delivery";
import DeliveryTable from "@/components/table/DeliveryTable";
import DateRangePicker from "@/components/common/DateRangePicker";
import { useFilterHandlers } from "@/handlers/transactionHandlers";
import { useMemo, useState } from "react";
import useSorting from "@/hooks/useSorting";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatDateNumeric } from "../../../utils/Formatters";
import ButtonComponent from "@/components/button/Index";
import { PDFViewer } from "@react-pdf/renderer";
import { SuratJalanPDF } from "@/components/print/DeliveryPrintPages";
import { toast } from "sonner";

function DeliveryPages() {
  const [showPreview, setShowPreview] = useState(false);

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
        delivery.delivery_status?.toLowerCase().includes(term) ||
        delivery.delivery_code?.toLowerCase().includes(term)
      );
    });
  }, [sortedDeliveries, searchTerm]);

  // Fungsi untuk format rupiah
  const formatRupiah = (amount) => {
    if (!amount && amount !== 0) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy HH:mm", { locale: id });
    } catch {
      return dateString;
    }
  };

  // Fungsi untuk format berat (gram ke kg)
  const formatWeight = (weightInGrams) => {
    if (!weightInGrams && weightInGrams !== 0) return "";
    const weightInKg = weightInGrams / 1000;
    return `${weightInKg.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    })} kg`;
  };

  const exportToCSV = () => {
    if (!filteredDelivery || filteredDelivery.length === 0) {
      alert("Tidak ada data untuk diekspor");
      return;
    }

    const headers = [
      "No",
      "Kode Pengiriman",
      "Nama Customer",
      "Total Item",
      "Total Berat",
      "Alamat Pickup",
      "Alamat Tujuan",
      "Tanggal Pengiriman",
      "Status Pengiriman",
      "Biaya Pengiriman",
      "Tanggal Disetujui",
      "Catatan",
      "Tanggal Dibuat",
      "Tanggal Update",
      "Driver",
      "Kendaraan",
    ];

    const csvData = filteredDelivery.map((delivery, index) => [
      index + 1,
      delivery.delivery_code || "",
      delivery.transaction?.customer?.name || "",
      delivery.total_item || 0,
      formatWeight(delivery.total_weight),
      delivery.pickup_address || "",
      delivery.destination_address || "",
      formatDate(delivery.delivery_date),
      delivery.delivery_status || "",
      formatRupiah(delivery.delivery_cost),
      formatDate(delivery.approved_at),
      delivery.note || "",
      formatDate(delivery.created_at),
      formatDate(delivery.updated_at),
      delivery.driver?.name || "",
      delivery.vehicle?.name || "",
    ]);

    const allData = [headers, ...csvData];

    const csvContent = allData
      .map((row) =>
        row
          .map((field) => {
            const fieldStr = String(field || "");
            if (
              fieldStr.includes(",") ||
              fieldStr.includes('"') ||
              fieldStr.includes("\n")
            ) {
              return `"${fieldStr.replace(/"/g, '""')}"`;
            }
            return fieldStr;
          })
          .join(",")
      )
      .join("\n");

    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);

    const today = new Date();
    const dateStr = format(today, "yyyy-MM-dd", { locale: id });

    let filenamePrefix = "data-pengiriman";
    if (dateRange.startDate || dateRange.endDate) {
      const startStr = dateRange.startDate
        ? format(new Date(dateRange.startDate), "yyyy-MM-dd")
        : "awal";
      const endStr = dateRange.endDate
        ? format(new Date(dateRange.endDate), "yyyy-MM-dd")
        : "akhir";
      filenamePrefix += `-${startStr}-to-${endStr}`;
    }

    link.setAttribute("download", `${filenamePrefix}-exported-${dateStr}.csv`);

    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      `Berhasil mengekspor ${filteredDelivery.length} data pengiriman ke CSV`
    );
  };

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
        <div className="flex gap-5">
          <ButtonComponent
            label="Export CSV"
            variant="csv"
            className="w-36"
            onClick={exportToCSV}
            disabled={isLoading || !filteredDelivery?.length}
          />

          <SearchInput
            placeholder={"pengiriman"}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
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
