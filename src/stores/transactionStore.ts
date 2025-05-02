import { create } from "zustand";
import { type Delivery } from "./deliveryStore";

type Transaction = {
  customer_id: number;
  total_delivery: number;
  cost: number;
  payment_deadline: string | null;
  down_payment: number;
  down_payment_status: string;
  down_payment_time: string | null;
  full_payment: number;
  full_payment_status: string;
  full_payment_time: string | null;
  transaction_status: string;
  deliveries: Delivery[];
};

type TransactionStore = {
  transaction: Transaction;
  setTransaction: (data: Partial<Transaction>) => void;
  resetTransaction: () => void;
  addDeliveryToTransaction: (delivery: Delivery) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: {
    customer_id: 0,
    total_delivery: 0,
    cost: 0,
    payment_deadline: null,
    down_payment: 0,
    down_payment_status: "",
    down_payment_time: null,
    full_payment: 0,
    full_payment_status: "",
    full_payment_time: null,
    transaction_status: "",
    deliveries: [],
  },
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
  resetTransaction: () =>
    set({
      transaction: {
        customer_id: 0,
        total_delivery: 0,
        cost: 0,
        payment_deadline: null,
        down_payment: 0,
        down_payment_status: "",
        down_payment_time: null,
        full_payment: 0,
        full_payment_status: "",
        full_payment_time: null,
        transaction_status: "",
        deliveries: [],
      },
    }),
}));