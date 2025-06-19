import { useEffect, useState } from "react";
import ButtonComponent from "@/components/button/Index";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  formatCurrency,
  formatDateNumeric,
} from "../../../../utils/Formatters";

type FullPaymentFormProps = {
  transaction: {
    down_payment: number;
    payment_deadline: string;
  };
  onSubmit?: () => void;
  showButton?: boolean;
  showTimer?: boolean;
  buttonLabel?: string;
};

const FullPaymentForm = ({
  transaction,
  onSubmit,
  buttonLabel,
  showButton,
  showTimer,
}: FullPaymentFormProps) => {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const deadline = new Date(transaction.payment_deadline).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance <= 0) {
        setCountdown("Waktu pembayaran telah berakhir");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}h ${hours}j ${minutes}m ${seconds}d`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [transaction.payment_deadline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="p-4 border rounded-xl bg-white space-y-3"
    >
      <div className="text-center">
        <h2 className="text-base">Sisa pembayaran yang belum dibayarkan</h2>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold">
          {formatCurrency(transaction.down_payment)}
        </p>
      </div>

      {showButton && (
        <div className="flex justify-center">
          <ConfirmDialog
            trigger={
              <ButtonComponent
                label={buttonLabel || "Konfirmasi Pelunasan"}
                variant="save"
                className="px-36"
                type="button"
              />
            }
            confirmText="Simpan Pembayaran?"
            onConfirm={() => {
              const form = document.getElementById(
                "payment-form"
              ) as HTMLFormElement;
              form?.requestSubmit();
            }}
          />
        </div>
      )}

      {showTimer && (
        <p className="text-center text-sx text-red-500 font-medium">
          {countdown}
        </p>
      )}
    </form>
  );
};

export default FullPaymentForm;
