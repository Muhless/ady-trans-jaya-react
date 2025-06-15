import ButtonComponent from "@/components/button/Index";
import {
  formatCurrency,
  formatDate,
  formatDateNumeric,
  getStatusColor,
} from "../../../utils/Formatters";
import { deleteTransaction, fetchTransactionById } from "@/api/transaction";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TitleComponent from "@/components/Title";
import CustomerInfoCard from "../customer/CustomerInfoCard";
import DeliveryInfoCard from "../delivery/DeliveryInfoCard";

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
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <TitleComponent title="Detail Transaksi" />
            <p className="text-gray-500">ID Transaksi : {transaction?.id}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
              transaction?.transaction_status
            )}`}
          >
            {transaction?.transaction_status}
          </div>
        </div>
      </div>

      <CustomerInfoCard customer={transaction.customer} />

      <DeliveryInfoCard deliveries={transaction.delivery} />

      <div className="flex justify-end gap-3">
        <ButtonComponent
          label="Kembali"
          variant="back"
          className="w-48"
          onClick={() => window.history.back()}
        />
        <ButtonComponent
          label="Hapus"
          variant="delete"
          className="w-48"
          onClick={async () => {
            const confirmDelete = window.confirm(
              "Apakah Anda yakin ingin menghapus transaksi ini?"
            );
            if (!confirmDelete || !id) return;

            try {
              await deleteTransaction(Number(id));
              alert("Transaksi berhasil dihapus.");
              window.history.back();
            } catch (err) {
              alert(err.message);
            }
          }}
        />
      </div>
    </div>
  );
};

export default DetailTransactionPages;
