// utils/dateUtils.ts

/**
 * Get various date ranges for quick filtering
 */
export const getDateRanges = () => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  );

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );
  const endOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    23,
    59,
    59
  );

  // Week (Sunday to Saturday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  // Last Week
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfWeek.getDate() - 7);
  const endOfLastWeek = new Date(startOfWeek);
  endOfLastWeek.setDate(startOfWeek.getDate() - 1);
  endOfLastWeek.setHours(23, 59, 59);

  // Month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Last Month
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const endOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    0,
    23,
    59,
    59
  );

  // Year
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  // Last 30 days
  const last30Days = new Date(today);
  last30Days.setDate(today.getDate() - 30);
  last30Days.setHours(0, 0, 0, 0);

  // Last 90 days
  const last90Days = new Date(today);
  last90Days.setDate(today.getDate() - 90);
  last90Days.setHours(0, 0, 0, 0);

  return {
    today: {
      start: startOfToday,
      end: endOfToday,
    },
    yesterday: {
      start: startOfYesterday,
      end: endOfYesterday,
    },
    week: {
      start: startOfWeek,
      end: endOfToday,
    },
    lastWeek: {
      start: startOfLastWeek,
      end: endOfLastWeek,
    },
    month: {
      start: startOfMonth,
      end: endOfToday,
    },
    lastMonth: {
      start: startOfLastMonth,
      end: endOfLastMonth,
    },
    year: {
      start: startOfYear,
      end: endOfToday,
    },
    last30days: {
      start: last30Days,
      end: endOfToday,
    },
    last90days: {
      start: last90Days,
      end: endOfToday,
    },
  };
};

/**
 * Format date to YYYY-MM-DD for input fields
 */
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Get date range for a specific filter
 */
export const getDateRangeForFilter = (filter: string) => {
  const ranges = getDateRanges();

  switch (filter) {
    case "today":
      return {
        startDate: formatDateForInput(ranges.today.start),
        endDate: formatDateForInput(ranges.today.end),
      };
    case "yesterday":
      return {
        startDate: formatDateForInput(ranges.yesterday.start),
        endDate: formatDateForInput(ranges.yesterday.end),
      };
    case "week":
      return {
        startDate: formatDateForInput(ranges.week.start),
        endDate: formatDateForInput(ranges.week.end),
      };
    case "lastWeek":
      return {
        startDate: formatDateForInput(ranges.lastWeek.start),
        endDate: formatDateForInput(ranges.lastWeek.end),
      };
    case "month":
      return {
        startDate: formatDateForInput(ranges.month.start),
        endDate: formatDateForInput(ranges.month.end),
      };
    case "lastMonth":
      return {
        startDate: formatDateForInput(ranges.lastMonth.start),
        endDate: formatDateForInput(ranges.lastMonth.end),
      };
    case "year":
      return {
        startDate: formatDateForInput(ranges.year.start),
        endDate: formatDateForInput(ranges.year.end),
      };
    case "last30days":
      return {
        startDate: formatDateForInput(ranges.last30days.start),
        endDate: formatDateForInput(ranges.last30days.end),
      };
    case "last90days":
      return {
        startDate: formatDateForInput(ranges.last90days.start),
        endDate: formatDateForInput(ranges.last90days.end),
      };
    default:
      return { startDate: "", endDate: "" };
  }
};

/**
 * Get transaction date from various possible fields
 */
export const getTransactionDate = (transaction: any): Date | null => {
  const dateField =
    transaction.createdAt ||
    transaction.created_at ||
    transaction.date ||
    transaction.timestamp ||
    transaction.transaction_date ||
    transaction.payment_deadline;

  return dateField ? new Date(dateField) : null;
};

/**
 * Check if a date is within a date range
 */
export const isDateInRange = (
  date: Date,
  startDate?: string,
  endDate?: string
): boolean => {
  if (!startDate && !endDate) return true;

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate + "T23:59:59") : null;

  if (start && date < start) return false;
  if (end && date > end) return false;

  return true;
};

/**
 * Get relative time description for date ranges
 */
export const getDateRangeDescription = (
  startDate: string,
  endDate: string
): string => {
  if (!startDate && !endDate) return "";

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  const today = new Date();

  // Check if it's today
  if (
    start &&
    end &&
    start.toDateString() === today.toDateString() &&
    end.toDateString() === today.toDateString()
  ) {
    return "Hari ini";
  }

  // Check if it's this month
  if (
    start &&
    end &&
    start.getMonth() === today.getMonth() &&
    start.getFullYear() === today.getFullYear() &&
    start.getDate() === 1 &&
    end.toDateString() === today.toDateString()
  ) {
    return "Bulan ini";
  }

  // Default format
  const startStr = start ? start.toLocaleDateString("id-ID") : "";
  const endStr = end ? end.toLocaleDateString("id-ID") : "";

  if (startStr && endStr) {
    return `${startStr} - ${endStr}`;
  } else if (startStr) {
    return `Sejak ${startStr}`;
  } else if (endStr) {
    return `Sampai ${endStr}`;
  }

  return "";
};
