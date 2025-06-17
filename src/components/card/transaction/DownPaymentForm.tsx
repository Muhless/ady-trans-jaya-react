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
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Pembayaran</h2>
      <div className="p-4 border rounded bg-gray-50">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="text-sm text-gray-600">Total Transaksi</label>
            <p className="text-lg font-bold text-gray-800">
              {formatCurrency(transaction.cost)}
            </p>
          </div>

          <InputComponent
            label="Pembayaran Awal"
            type="number"
            name="dp_amount"
            value={dpAmount}
            onChange={(e) => setDpAmount(Number(e.target.value))}
            placeholder="Masukkan nominal pembayaran"
          />

          <div className="flex justify-end">
            <ButtonComponent
              label="Simpan"
              type="submit"
              variant="save"
              className="w-32"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DownPaymentForm;
