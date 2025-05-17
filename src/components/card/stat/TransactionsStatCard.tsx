import React, { useEffect, useState } from "react";
import {
  ListOrdered,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  HandCoins,
  Wallet,
} from "lucide-react";
import { fetchTransactions } from "../../../api/transaction";

const TransactionsStatCard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    failed: 0,
    totalCost: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactions = await fetchTransactions();

        const total = transactions.length;
        const pending = transactions.filter(
          (tx: any) => tx.transaction_status === "pending"
        ).length;
        const completed = transactions.filter(
          (tx: any) => tx.transaction_status === "completed"
        ).length;
        const failed = transactions.filter(
          (tx: any) => tx.transaction_status === "failed"
        ).length;

        // Hanya ambil cost dari transaksi yang selesai (completed)
        const totalCost = transactions
          .filter((tx: any) => tx.transaction_status === "completed")
          .reduce((acc: number, tx: any) => acc + Number(tx.cost || 0), 0);

        setStats({
          total,
          pending,
          completed,
          failed,
          totalCost,
        });
      } catch (error) {
        console.error("Gagal memuat data transaksi:", error);
      }
    };

    loadData();
  }, []);

  const cards = [
    {
      label: "Total Transaksi",
      value: stats.total,
      icon: <ListOrdered className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Selesai",
      value: stats.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Gagal",
      value: stats.failed,
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    },
    {
      label: "Total Pendapatan",
      value: `Rp ${stats.totalCost.toLocaleString("id-ID")}`,
      icon: <Wallet className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((item, idx) => (
        <div
          key={idx}
          className="bg-white shadow rounded p-4 text-center space-y-2"
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
