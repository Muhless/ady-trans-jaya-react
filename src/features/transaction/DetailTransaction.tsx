import ButtonComponent from "@/components/button/Index";
import {
  formatCurrency,
  formatDate,
  formatDateNumeric,
  getStatusClass,
  getStatusColor,
} from "../../../utils/Formatters";
import { deleteTransaction, fetchTransactionById } from "@/api/transaction";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TitleComponent from "@/components/Title";
import CustomerInfoCard from "../customer/CustomerInfoCard";
import DeliveryInfoCard from "../delivery/DeliveryInfoCard";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import DownPaymentForm from "@/components/card/transaction/DownPaymentForm";

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

      {transaction.transaction_status === "diproses" && (
        <DownPaymentForm
          transaction={{ cost: transaction.cost }}
          onSubmit={(data) => {
            console.log("Data DP disubmit:", data);
            alert("DP berhasil disimpan");
          }}
        />
      )}

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
              alert("Transaksi berhasil dihapus.");
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
