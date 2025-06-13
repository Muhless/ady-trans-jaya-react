import { create } from "zustand";
import { Delivery } from "./deliveryStore";
import { useDeliveryStore } from "./deliveryStore";

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
  addDeliveryFromStoreById: (deliveryId: number) => void;
  addAllDeliveriesFromStore: () => void;
  syncSelectedDeliveries: (deliveryIds: number[]) => void;
  resetTransaction: () => void;
  removeDeliveryFromTransaction: (deliveryId: number) => void;
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

export const useTransactionStore = create<TransactionStore>((set, get) => ({
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

  // Tambahkan delivery dari store berdasarkan ID
  addDeliveryFromStoreById: (deliveryId) => {
    const deliveryStore = useDeliveryStore.getState();
    const delivery = deliveryStore.deliveryList.find(
      (d) => d.id === deliveryId
    );

    if (delivery) {
      const currentState = get();
      // Cek apakah delivery sudah ada di transaction
      const exists = currentState.transaction.deliveries.some(
        (d) => d.id === delivery.id
      );

      if (!exists) {
        set((state) => ({
          transaction: {
            ...state.transaction,
            deliveries: [...state.transaction.deliveries, delivery],
            total_delivery: state.transaction.total_delivery + 1,
            cost: state.transaction.cost + (delivery.delivery_cost || 0),
          },
        }));
      }
    }
  },

  // Tambahkan semua delivery dari store
  addAllDeliveriesFromStore: () => {
    const deliveryStore = useDeliveryStore.getState();
    const totalCost = deliveryStore.deliveryList.reduce(
      (sum, delivery) => sum + (delivery.delivery_cost || 0),
      0
    );

    set((state) => ({
      transaction: {
        ...state.transaction,
        deliveries: deliveryStore.deliveryList,
        total_delivery: deliveryStore.deliveryList.length,
        cost: totalCost,
      },
    }));
  },

  // Sync delivery yang dipilih berdasarkan array ID
  syncSelectedDeliveries: (deliveryIds) => {
    const deliveryStore = useDeliveryStore.getState();
    const selectedDeliveries = deliveryStore.deliveryList.filter((delivery) =>
      deliveryIds.includes(delivery.id)
    );
    const totalCost = selectedDeliveries.reduce(
      (sum, delivery) => sum + (delivery.delivery_cost || 0),
      0
    );

    set((state) => ({
      transaction: {
        ...state.transaction,
        deliveries: selectedDeliveries,
        total_delivery: selectedDeliveries.length,
        cost: totalCost,
      },
    }));
  },

  resetTransaction: () => {
    console.log("🔥 RESET TRANSACTION CALLED!");
    console.trace(); // Ini akan show stack trace siapa yang memanggil reset
    set({ transaction: initialTransaction });
  },

  removeDeliveryFromTransaction: (deliveryId) =>
    set((state) => {
      const filteredDeliveries = state.transaction.deliveries.filter(
        (delivery) => delivery.id !== deliveryId
      );
      const newCost = filteredDeliveries.reduce(
        (sum, delivery) => sum + (delivery.delivery_cost || 0),
        0
      );

      return {
        transaction: {
          ...state.transaction,
          deliveries: filteredDeliveries,
          total_delivery: filteredDeliveries.length,
          cost: newCost,
        },
      };
    }),
}));
