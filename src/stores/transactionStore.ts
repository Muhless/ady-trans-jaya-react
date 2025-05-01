// src/stores/transactionStore.ts
import { create } from 'zustand';

type Transaction = {
  customer_id: string;
  total_delivery: string;
  cost: string;
  payment_deadline: string;
  down_payment: string;
  down_payment_status: string;
  down_payment_time: string;
  full_payment: string;
  full_payment_status: string;
  full_payment_time: string;
  transaction_status: string;
};

type TransactionStore = {
  transaction: Transaction;
  setTransaction: (data: Partial<Transaction>) => void;
  setAllTransaction: (data: Transaction) => void;
  resetTransaction: () => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: {
    customer_id: '',
    total_delivery: '',
    cost: '',
    payment_deadline: '',
    down_payment: '',
    down_payment_status: '',
    down_payment_time: '',
    full_payment: '',
    full_payment_status: '',
    full_payment_time: '',
    transaction_status: '',
  },
  setTransaction: (data) =>
    set((state) => ({
      transaction: { ...state.transaction, ...data },
    })),
  setAllTransaction: (data) => set({ transaction: data }),
  resetTransaction: () =>
    set({
      transaction: {
        customer_id: '',
        total_delivery: '',
        cost: '',
        payment_deadline: '',
        down_payment: '',
        down_payment_status: '',
        down_payment_time: '',
        full_payment: '',
        full_payment_status: '',
        full_payment_time: '',
        transaction_status: '',
      },
    }),
}));
