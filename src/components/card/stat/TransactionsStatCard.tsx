import React, { useEffect, useState, useMemo } from "react";
import {
  ListOrdered,
  Clock,
  CheckCircle,
  XCircle,
  Wallet,
  CircleArrowRightIcon,
} from "lucide-react";
import { fetchTransactions } from "../../../api/transaction";

interface Transaction {
  id: number;
  transaction_status: string;
  cost: number;
  createdAt?: string;
  created_at?: string;
  date?: string;
  timestamp?: string;
  transaction_date?: string;
}

interface TransactionsStatCardProps {
  transactions?: Transaction[];
  loading?: boolean;
  error?: boolean;
}

const TransactionsStatCard: React.FC<TransactionsStatCardProps> = ({
  transactions: externalTransactions,
  loading: externalLoading,
  error: externalError,
}) => {
  const [internalStats, setInternalStats] = useState({
    total: 0,
    pending: 0,
    onProcess: 0,
    completed: 0,
    failed: 0,
    totalCost: 0,
  });
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(false);

  // Calculate stats from external transactions (memoized for performance)
  const externalStats = useMemo(() => {
    if (!externalTransactions) return null;

    const total = externalTransactions.length;
    const pending = externalTransactions.filter(
      (tx) => tx.transaction_status === "tertunda"
    ).length;
    const onProcess = externalTransactions.filter(
      (tx) => tx.transaction_status === "diproses"
    ).length;
    const completed = externalTransactions.filter(
      (tx) => tx.transaction_status === "selesai"
    ).length;
    const failed = externalTransactions.filter(
      (tx) => tx.transaction_status === "dibatalkan"
    ).length;

    const totalCost = externalTransactions
      .filter((tx) => tx.transaction_status === "selesai")
      .reduce((acc, tx) => acc + Number(tx.cost || 0), 0);

    return {
      total,
      pending,
      onProcess,
      completed,
      failed,
      totalCost,
    };
  }, [externalTransactions]);

  // Internal data fetching (fallback when no external data)
  useEffect(() => {
    if (externalTransactions) return; // Skip internal fetch if external data exists

    const loadData = async () => {
      setInternalLoading(true);
      setInternalError(false);

      try {
        const transactions = await fetchTransactions();

        const total = transactions.length;
        const pending = transactions.filter(
          (tx: any) => tx.transaction_status === "tertunda"
        ).length;
        const onProcess = transactions.filter(
          (tx: any) => tx.transaction_status === "diproses"
        ).length;
        const completed = transactions.filter(
          (tx: any) => tx.transaction_status === "selesai"
        ).length;
        const failed = transactions.filter(
          (tx: any) => tx.transaction_status === "dibatalkan"
        ).length;

        const totalCost = transactions
          .filter((tx: any) => tx.transaction_status === "selesai")
          .reduce((acc: number, tx: any) => acc + Number(tx.cost || 0), 0);

        setInternalStats({
          total,
          pending,
          onProcess,
          completed,
          failed,
          totalCost,
        });
      } catch (error) {
        console.error("Gagal memuat data transaksi:", error);
        setInternalError(true);
      } finally {
        setInternalLoading(false);
      }
    };

    loadData();
  }, [externalTransactions]);

  // Determine which data source to use
  const stats = externalStats || internalStats;
  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;
  const isError = externalError !== undefined ? externalError : internalError;

  const cards = [
    {
      label: "Total Transaksi",
      value: stats.total,
      icon: <ListOrdered className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Tertunda",
      value: stats.pending,
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Diproses",
      value: stats.onProcess,
      icon: <CircleArrowRightIcon className="w-6 h-6 text-sky-500" />,
    },
    {
      label: "Selesai",
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Dibatalkan",
      value: stats.failed,
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    },
    {
      label: "Total Pendapatan",
      value: `Rp ${stats.totalCost.toLocaleString("id-ID")}`,
      icon: <Wallet className="w-6 h-6 text-purple-500" />,
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded p-4 text-center space-y-2 animate-pulse"
          >
            <div className="flex justify-center">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded p-4 text-center space-y-2 border-red-200"
          >
            <div className="flex justify-center">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-sm text-red-600">Error</p>
            <p className="text-xl font-semibold text-red-500">-</p>
          </div>
        ))}
      </div>
    );
  }

  // Normal state
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {cards.map((item, idx) => (
        <div
          key={idx}
          className="bg-white shadow rounded p-4 text-center space-y-2 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-center">{item.icon}</div>
          <p className="text-sm text-gray-600">{item.label}</p>
          <p className="text-xl font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionsStatCard;
