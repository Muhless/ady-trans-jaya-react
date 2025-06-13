import { create } from "zustand";
import { Delivery } from "./deliveryStore";

export type Transaction = {
  customer_id: number | null;
  total_delivery: number;
  cost: number;
  payment_deadline: string | null;
  down_payment: number | null;
  down_payment_status: string;
  down_payment_time: string | null;
  full_payment: number | null;
  full_payment_status: string;
  full_payment_time: string | null;
  transaction_status: string;
  deliveries: Delivery[];
};

type TransactionStore = {
  transaction: Transaction;
  setTransaction: (data: Partial<Transaction>) => void;
  addDeliveryToTransaction: (delivery: Delivery) => void;
  resetTransaction: () => void;
};

export const initialTransaction: Transaction = {
  customer_id: null,
  total_delivery: 0,
  cost: 0,
  payment_deadline: null,
  down_payment: null,
  down_payment_status: "",
  down_payment_time: null,
  full_payment: null,
  full_payment_status: "",
  full_payment_time: null,
  transaction_status: "tertunda",
  deliveries: [],
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: initialTransaction,

  setTransaction: (data) =>
    set((state) => ({
      transaction: { ...state.transaction, ...data },
    })),

  addDeliveryToTransaction: (delivery) =>
    set((state) => ({
      transaction: {
        ...state.transaction,
        deliveries: [...state.transaction.deliveries, delivery],
        total_delivery: state.transaction.total_delivery + 1,
        cost: state.transaction.cost + (delivery.delivery_cost || 0),
      },
    })),

  resetTransaction: () => set({ transaction: initialTransaction }),
}));
