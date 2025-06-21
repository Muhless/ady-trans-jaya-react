import { BookText } from "lucide-react";
import {
  formatCurrency,
  formatDateNumeric,
  getStatusClass,
} from "../../../../utils/Formatters";
import PaymentForm from "./DownPaymentForm";
import FullPaymentForm from "./FullPaymentForm";

type TransactionInfoCardProps = {
  transaction: {
    id: number;
    total_delivery: number;
    payment_deadline?: string;
    cost?: number;
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
    <div className="bg-white border rounded-xl p-6 mb-10 text-sm shadow-sm">
      <div className="flex justify-between items-center gap-3 mb-4 border-b py-3">
        <div className="flex gap-3 items-center">
          <BookText size={20} className="text-green-500" />
          <h2 className="text-lg font-semibold">Informasi Transaksi</h2>
        </div>
        <div
          className={`w-32 text-center py-2 rounded-md text-sm font-bold ${getStatusClass(
            transaction?.transaction_status
          )}`}
        >
          {transaction?.transaction_status}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border">
        <div className="space-y-2">
          <div>
            <p className="text-muted-foreground">ID Transaksi</p>
            <p className="font-bold text-base">{transaction.id}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Tanggal Transaksi</p>
            <p className="font-bold text-base">
              {formatDateNumeric(transaction.created_at)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Jumlah Pengiriman</p>
            <p className="font-bold text-base">{transaction.total_delivery}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Batas Pembayaran</p>
            <p className="font-bold text-base">
              {formatDateNumeric(transaction.payment_deadline)}
            </p>
          </div>
          <hr />

          {transaction.transaction_status === "tertunda" && (
            <div className="space-y-2 mt-2">
              <div>
                <p className="text-muted-foreground">Pembayaran Awal</p>
                <p className="font-bold text-base">
                  {transaction.down_payment_status}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Biaya Keseluruhan</p>
                <p className="font-bold text-base">
                  {transaction.full_payment_status}
                </p>
              </div>
            </div>
          )}
        </div>

        {transaction.transaction_status === "diproses" && (
          <div className="mt-2">
            <PaymentForm
              transaction={{ full_payment: approvedCost }}
              onSubmit={onDownPaymentSubmit}
            />
          </div>
        )}

        {!["tertunda", "diproses"].includes(transaction.transaction_status) && (
          <div className="mt-2">
            <p className="text-muted-foreground">Total Biaya Keseluruhan</p>
            <p className="font-bold text-base mb-2">
              {formatCurrency(transaction.full_payment)}
            </p>
            <hr />
          </div>
        )}

        {transaction.transaction_status === "berjalan" && (
          <div className="space-y-2 mt-2">
            <div className="flex justify-between ">
              <div>
                <p className="text-muted-foreground">Pembayaran Awal</p>
                <p className="font-bold text-base">
                  {formatCurrency(transaction.down_payment)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground bg-or">Status Pembayaran</p>
                <p className="font-bold text-base">
                  {transaction.down_payment_status}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground bg-or">
                  Tanggal Pembayaran
                </p>
                <p className="font-bold text-base">
                  {formatDateNumeric(transaction.down_payment_time)}
                </p>
              </div>
            </div>
            <hr />
            <div className="py-5">
              <FullPaymentForm
                transaction={{
                  down_payment: transaction.down_payment,
                  payment_deadline: transaction.payment_deadline,
                }}
                onSubmit={null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
