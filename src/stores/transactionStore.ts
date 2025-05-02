import { create } from "zustand";

type Transaction = {
  customer_id: string;
};

type TransactionStore = {
  transaction: Transaction;
  setTransaction: (data: Partial<Transaction>) => void;
  resetTransaction: () => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transaction: {
    customer_id: "",
    deliveries: [],
  },
  setTransaction: (data) =>
    set((state) => ({
      transaction: { ...state.transaction, ...data },
    })),
  resetTransaction: () => set({ transaction: { customer_id: "" } }),
}));
