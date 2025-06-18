import ButtonComponent from "@/components/button/Index";
import { InputComponent } from "@/components/input/Input";
import { useState } from "react";
import { formatCurrency } from "../../../../utils/Formatters";

type DownPaymentFormProps = {
  transaction: {
    cost: number;
  };
  onSubmit: (data: { dp_amount: number }) => void;
};

const DownPaymentForm = ({ transaction, onSubmit }: DownPaymentFormProps) => {
  const [dpAmount, setDpAmount] = useState<number>(transaction.cost / 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ dp_amount: dpAmount });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-4 border rounded-md bg-white"
    >
      <h2 className="text-2xl font-semibold text-center">Pembayaran</h2>
      <div className="flex justify-evenly">
        <div>
          <label className="text-gray-600 text-sm">Total Biaya Transaksi</label>
          <p className="text-xl font-bold">
            {formatCurrency(transaction.cost)}
          </p>
        </div>

        <div>
          <label className=" text-gray-600 text-sm">Pembayaran Awal</label>
          <p className="text-xl font-bold">{formatCurrency(dpAmount)}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonComponent
          label="Simpan Pembayaran"
          type="submit"
          variant="save"
          className="px-36"
        />
      </div>
    </form>
  );
};

export default DownPaymentForm;
