import ButtonComponent from "@/components/button/Index";
import { InputComponent } from "@/components/input/Input";
import { useState } from "react";
import { formatCurrency } from "../../../../utils/Formatters";
import ConfirmDialog from "@/components/common/ConfirmDialog";

type DownPaymentFormProps = {
  transaction: {
    full_payment: number;
  };
  onSubmit: (data: { dp_amount: number }) => void;
};

const DownPaymentForm = ({ transaction, onSubmit }: DownPaymentFormProps) => {
  const [dpAmount, setDpAmount] = useState<number>(
    transaction.full_payment / 2
  );

  const handleSubmit = (e: React.FormEvent) => {
    e?.preventDefault();
    onSubmit({ dp_amount: dpAmount });
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="p-4 border rounded-xl bg-white space-y-5"
    >
      <h2 className="text-xl font-semibold text-center">Konfirmasi Pembayaran</h2>
      <div className="flex justify-evenly">
        <div className="flex flex-col items-center">
          <label className="text-gray-600 text-sm">
            Total Biaya Keseluruhan
          </label>
          <p className="text-xl font-bold">
            {formatCurrency(transaction.full_payment)}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <label className=" text-gray-600 text-sm">Pembayaran Awal</label>
          <p className="text-xl font-bold">{formatCurrency(dpAmount)}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <ConfirmDialog
          trigger={
            <ButtonComponent
              label="Simpan Pembayaran"
              variant="save"
              className="px-36"
              type="button"
            />
          }
          confirmText="Simpan Pembayaran ?"
          onConfirm={() => {
            const form = document.getElementById(
              "payment-form"
            ) as HTMLFormElement;
            form?.requestSubmit();
          }}
        />
      </div>
    </form>
  );
};

export default DownPaymentForm;
