import DownPaymentForm from "@/components/card/transaction/DownPaymentForm";
import {
  formatCurrency,
  formatDateNumeric,
} from "../../../../utils/Formatters";

type TransactionInfoCardProps = {
  transaction: {
    id: number;
    total_delivery: number;
    payment_deadline?: string;
    down_payment?: number;
    down_payment_status?: string;
    down_payment_time: string;
    full_payment?: number;
    full_payment_status?: string;
    full_payment_time?: string;
    created_at?: string;
    transaction_status: string;
  };
  approvedCost: number;
  onDownPaymentSubmit: (data: any) => void;
};

const TransactionInfoCard = ({
  transaction,
  approvedCost,
  onDownPaymentSubmit,
}: TransactionInfoCardProps) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10 text-sm shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Informasi Transaksi
      </h2>

      <div className="space-y-2">
        <div>
          <p className="text-muted-foreground">ID Transaksi</p>
          <p className="font-bold text-base">{transaction.id}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Jumlah Pengiriman</p>
          <p className="font-bold text-base">{transaction.total_delivery}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Tanggal Transaksi</p>
          <p className="font-bold text-base">
            {formatDateNumeric(transaction.created_at)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Batas Pembayaran</p>
          <p className="font-bold text-base">
            {formatDateNumeric(transaction.payment_deadline)}
          </p>
        </div>
        {(transaction.transaction_status === "tertunda" ||
          transaction.transaction_status === "berjalan") && (
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground">Pembayaran Awal</p>
              <p className="font-bold text-base">
                {transaction.transaction_status === "berjalan"
                  ? formatCurrency(transaction.down_payment || 0)
                  : transaction.down_payment_status}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Biaya Transaksi</p>
              <p className="font-bold text-base">
                {transaction.transaction_status === "berjalan"
                  ? formatCurrency(transaction.full_payment || 0)
                  : transaction.full_payment_status}
              </p>
            </div>
          </div>
        )}
      </div>

      {transaction.transaction_status === "diproses" && (
        <div className="mt-3">
          <DownPaymentForm
            transaction={{ cost: approvedCost }}
            onSubmit={onDownPaymentSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionInfoCard;
