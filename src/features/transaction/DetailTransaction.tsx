import ButtonComponent from "@/components/button/Index";
import { getStatusClass } from "../../../utils/Formatters";
import {
  deleteTransaction,
  fetchTransactionById,
  updateTransaction,
} from "@/api/transaction";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TitleComponent from "@/components/Title";
import CustomerInfoCard from "../customer/CustomerInfoCard";
import DeliveryInfoCard from "../delivery/DeliveryInfoCard";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import TransactionInfoCard from "../../components/card/transaction/TransactionInfoCard";
import { toast } from "sonner";

const DetailTransactionPages = () => {
  const { id } = useParams();

  const {
    data: transaction,
    isLoading,
    isError,
    error,
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

  const approvedCost = transaction.delivery
    .filter((d) => d.delivery_status === "disetujui")
    .reduce((total, d) => total + (d.delivery_cost || 0), 0);

  const handleDownPaymentSubmit = async ({
    dp_amount,
  }: {
    dp_amount: number;
  }) => {
    try {
      await updateTransaction(transaction.id, {
        cost: approvedCost,
        transaction_status: "berjalan",
        down_payment: dp_amount,
        down_payment_time: new Date().toISOString(),
        // full_payment:
      });
      window.location.reload();
      toast.success("Pembayaran disimpan!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-start">
        <TitleComponent title="Detail Transaksi" />
        <div
          className={`w-32 text-center py-2 rounded-md text-sm font-bold ${getStatusClass(
            transaction?.transaction_status
          )}`}
        >
          {transaction?.transaction_status}
        </div>
      </div>

      <TransactionInfoCard
        transaction={transaction}
        approvedCost={approvedCost}
        onDownPaymentSubmit={handleDownPaymentSubmit}
      />

      <CustomerInfoCard customer={transaction.customer} />

      <DeliveryInfoCard deliveries={transaction.delivery} />

      <div className="flex justify-end gap-3">
        <ButtonComponent
          label="Kembali"
          variant="back"
          className="w-48"
          onClick={() => window.history.back()}
        />
        <ConfirmDialog
          trigger={
            <ButtonComponent label="Hapus" variant="delete" className="w-48" />
          }
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
