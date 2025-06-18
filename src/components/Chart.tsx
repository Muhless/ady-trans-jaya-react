import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/api/transaction";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const ChartComponent = () => {
  const [selectedYear, setSelectedYear] = React.useState<number>(
    new Date().getFullYear()
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  // Get available years from data
  const availableYears = React.useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [new Date().getFullYear()];
    }

    const years = new Set<number>();
    const currentYear = new Date().getFullYear();

    // Debug: log first few transactions to see data structure
    console.log("Sample transaction data:", data.slice(0, 3));

    data.forEach((tx: any, index: number) => {
      try {
        // Check all possible date fields
        const dateStr =
          tx.created_at ||
          tx.transaction_date ||
          tx.date ||
          tx.createdAt ||
          tx.updatedAt ||
          tx.updated_at ||
          tx.payment_deadline;

        if (dateStr) {
          const date = new Date(dateStr);
          if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            years.add(year);

            // Debug: log some processed dates
            if (index < 5) {
              console.log(`Transaction ${index}: ${dateStr} -> ${year}`);
            }
          }
        } else {
          // Debug: log transactions without date
          if (index < 5) {
            console.log(`Transaction ${index}: No valid date field found`, tx);
          }
        }
      } catch (error) {
        console.warn("Error processing transaction date:", error, tx);
      }
    });

    // Add last 3 years as fallback options if no years found
    if (years.size === 0) {
      for (let i = 0; i < 3; i++) {
        years.add(currentYear - i);
      }
    }

    const yearArray = Array.from(years).sort((a, b) => b - a);
    console.log("Available years:", yearArray);

    return yearArray;
  }, [data]);

  // Prepare chart data using useMemo to avoid recalculation on every render
  const chartData = React.useMemo(() => {
    // Return early if no data
    if (!data || !Array.isArray(data) || data.length === 0) {
      return null;
    }

    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthMap: Record<string, number> = {};

    // Process transactions and count by month for selected year
    data.forEach((tx: any) => {
      try {
        // Check all possible date fields
        const dateStr =
          tx.created_at ||
          tx.transaction_date ||
          tx.date ||
          tx.createdAt ||
          tx.updatedAt ||
          tx.updated_at ||
          tx.payment_deadline;

        if (dateStr) {
          const date = new Date(dateStr);

          // Check if date is valid and matches selected year
          if (!isNaN(date.getTime()) && date.getFullYear() === selectedYear) {
            const month = format(date, "MMM");
            monthMap[month] = (monthMap[month] || 0) + 1;
          }
        }
      } catch (error) {
        console.warn("Error processing transaction date:", error);
      }
    });

    const labels = allMonths;
    const values = labels.map((month) => monthMap[month] || 0);

    return {
      labels,
      datasets: [
        {
          label: `Jumlah Transaksi ${selectedYear}`,
          data: values,
          backgroundColor: "#1E88E5",
          borderColor: "#1E88E5",
          tension: 0.3,
          fill: false,
          pointBackgroundColor: "#1E88E5",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
  }, [data, selectedYear]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Memuat grafik...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-2">⚠️</div>
          <p className="text-red-500 font-medium">Gagal memuat grafik</p>
          <p className="text-gray-500 text-sm">Silakan coba lagi nanti</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!chartData) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-2xl mb-2">📊</div>
          <p className="text-gray-500">Data tidak tersedia</p>
          <p className="text-gray-400 text-sm">
            Belum ada transaksi untuk ditampilkan
          </p>
        </div>
      </div>
    );
  }

  // Calculate total transactions for display
  const totalTransactions = chartData.datasets[0].data.reduce(
    (sum: number, value: number) => sum + value,
    0
  );

  return (
    <div className="w-full">
      <div className="p-2 flex justify-between items-center">
        <div className="flex">
          <p className="text-gray-600">
            Total Transaksi : <span className="font-bold">{totalTransactions}</span>
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="year-select"
              className="text-sm font-medium text-gray-700"
            ></label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-72 relative">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
