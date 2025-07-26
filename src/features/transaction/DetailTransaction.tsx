import ButtonComponent from "@/components/button/Index";
import { getStatusClass } from "../../../utils/Formatters";
import {
  deleteTransaction,
  fetchTransactionById,
  updateTransaction,
  updateTransactionStatus,
} from "@/api/transaction";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TitleComponent from "@/components/Title";
import CustomerInfoCard from "../customer/CustomerInfoCard";
import DeliveryInfoCard from "../delivery/DeliveryInfoCard";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import TransactionInfoCard from "../../components/card/transaction/TransactionInfoCard";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/AuthStore";

const DetailTransactionPages = () => {
  const { id } = useParams();

  const {
    data: transaction,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(Number(id)),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-600">
            Error fetching transaction: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    );

  if (!transaction)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Transaction not found</p>
        </div>
      </div>
    );

  const approvedCost = (transaction.delivery || [])
    .filter((d) => d.delivery_status === "disetujui")
    .reduce((total, d) => total + (d.delivery_cost || 0), 0);

  const handleDownPaymentSubmit = async ({
    dp_amount,
  }: {
    dp_amount: number;
  }) => {
    try {
      const updatePayload = {
        down_payment: dp_amount,
        down_payment_status: "sudah dibayar",
        down_payment_time: new Date().toISOString(),

        full_payment: approvedCost,
        full_payment_status: "belum lunas",
        full_payment_time: null,

        transaction_status: "berjalan",
      };

      await updateTransaction(transaction.id, updatePayload);
      await updateTransactionStatus(transaction.id, "berjalan");

      toast.success("Pembayaran berhasil disimpan!");
      await refetch();
    } catch (err: any) {
      console.error("Error updating transaction:", err);
      toast.error("Terjadi kesalahan saat menyimpan pembayaran", {
        description:
          err?.response?.data?.message || err.message || "Unknown error",
      });
    }
  };

  const handleFullPaymentSubmit = async () => {
    try {
      const updatePayload = {
        full_payment_status: "lunas",
        full_payment_time: new Date().toISOString(),
        transaction_status: "selesai",
      };

      await updateTransaction(transaction.id, updatePayload);
      toast.success("Pelunasan berhasil disimpan!");
      await refetch();
    } catch (err: any) {
      console.error("Error updating full payment:", err);
      toast.error("Gagal menyimpan pelunasan", {
        description:
          err?.response?.data?.message || err.message || "Unknown error",
      });
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center bg-white border mb-5 rounded-xl flex items-center justify-center">
        <TitleComponent title="Detail Transaksi" />
      </div>

      <TransactionInfoCard
        transaction={transaction}
        approvedCost={approvedCost}
        onDownPaymentSubmit={handleDownPaymentSubmit}
        fullPaymentHandleSubmit={handleFullPaymentSubmit}
      />

      <CustomerInfoCard customer={transaction.customer} />

      <DeliveryInfoCard deliveries={transaction.delivery} />

  <div className="w-full">
    <ConfirmDialog
      trigger={<ButtonComponent variant="delete" className="w-full" />}
      title="Hapus Transaksi"
      description="Apakah Anda yakin ingin menghapus transaksi ini?"
      onConfirm={async () => {
        if (!id) return;

        try {
          await deleteTransaction(Number(id));
          toast.success("Transaksi berhasil dihapus!");
          window.history.back();
        } catch (err: any) {
          alert(err.message);
        }
      }}
    />
  </div>

    </div>
  );
};

export default DetailTransactionPages;
