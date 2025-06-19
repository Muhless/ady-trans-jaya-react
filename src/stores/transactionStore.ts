import { create } from "zustand";
import { Delivery } from "./deliveryStore";
import { useDeliveryStore } from "./deliveryStore";

export type Transaction = {
  id?: number;
  customer_id: number | null;
  total_delivery: number;
  cost: number | null;
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

type Customer = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
};

type TransactionStore = {
  transaction: Transaction;
  transactionIdCounter: number;
  setTransaction: (data: Partial<Transaction>) => void;
  generateTransactionId: () => number;
  addDeliveryToTransaction: (delivery: Delivery) => void;
  addDeliveryFromStoreById: (deliveryId: number) => void;
  addAllDeliveriesFromStore: () => void;
  syncSelectedDeliveries: (deliveryIds: number[]) => void;
  resetTransaction: () => void;
  editingDelivery: Delivery | null;
  setEditingDelivery: (delivery: Delivery) => void;
  updateDeliveryInTransaction: (updatedDelivery: Delivery) => void;
  clearEditingDelivery: () => void;
  removeDeliveryFromTransaction: (deliveryId: number) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer) => void;
  clearSelectedCustomer: () => void;
  getUsedDriverIds: () => number[];
  getUsedVehicleIds: () => number[];
  isDriverUsed: (driverId: number, excludeDeliveryId?: number) => boolean;
  isVehicleUsed: (vehicleId: number, excludeDeliveryId?: number) => boolean;
};

export const initialTransaction: Transaction = {
  id: undefined,
  customer_id: null,
  total_delivery: 0,
  cost: 0,
  payment_deadline: null,
  down_payment: null,
  down_payment_status: "belum dibayar",
  down_payment_time: null,
  full_payment: null,
  full_payment_status: "belum ditentukan",
  full_payment_time: null,
  transaction_status: "tertunda",
  deliveries: [],
};

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transaction: initialTransaction,
  transactionIdCounter: 1,

  selectedCustomer: null,
  editingDelivery: null,

  generateTransactionId: () => {
    const currentCounter = get().transactionIdCounter;
    set((state) => ({
      transactionIdCounter: state.transactionIdCounter + 1,
    }));
    return currentCounter;
  },

  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  clearSelectedCustomer: () => set({ selectedCustomer: null }),

  setTransaction: (data) =>
    set((state) => {
      const updatedData = { ...data };
      if (!updatedData.id && !state.transaction.id) {
        updatedData.id = get().generateTransactionId();
      }

      return {
        transaction: { ...state.transaction, ...updatedData },
      };
    }),

  addDeliveryToTransaction: (delivery) =>
    set((state) => {
      // Generate transaction ID jika belum ada
      const transactionId =
        state.transaction.id || get().generateTransactionId();

      return {
        transaction: {
          ...state.transaction,
          id: transactionId,
          deliveries: [...state.transaction.deliveries, delivery],
          total_delivery: state.transaction.total_delivery + 1,
          cost: state.transaction.cost + (delivery.delivery_cost || 0),
        },
      };
    }),

  addDeliveryFromStoreById: (deliveryId) => {
    const deliveryStore = useDeliveryStore.getState();
    const delivery = deliveryStore.deliveryList.find(
      (d) => d.id === deliveryId
    );

    if (delivery) {
      const currentState = get();
      const exists = currentState.transaction.deliveries.some(
        (d) => d.id === delivery.id
      );

      if (!exists) {
        set((state) => {
          // Generate transaction ID jika belum ada
          const transactionId =
            state.transaction.id || get().generateTransactionId();

          return {
            transaction: {
              ...state.transaction,
              id: transactionId,
              deliveries: [...state.transaction.deliveries, delivery],
              total_delivery: state.transaction.total_delivery + 1,
              cost: state.transaction.cost + (delivery.delivery_cost || 0),
            },
          };
        });
      }
    }
  },

  addAllDeliveriesFromStore: () => {
    const deliveryStore = useDeliveryStore.getState();
    const totalCost = deliveryStore.deliveryList.reduce(
      (sum, delivery) => sum + (delivery.delivery_cost || 0),
      0
    );

    set((state) => {
      const transactionId =
        state.transaction.id || get().generateTransactionId();

      return {
        transaction: {
          ...state.transaction,
          id: transactionId,
          deliveries: deliveryStore.deliveryList,
          total_delivery: deliveryStore.deliveryList.length,
          cost: totalCost,
        },
      };
    });
  },

  syncSelectedDeliveries: (deliveryIds) => {
    const deliveryStore = useDeliveryStore.getState();
    const selectedDeliveries = deliveryStore.deliveryList.filter((delivery) =>
      deliveryIds.includes(delivery.id)
    );
    const totalCost = selectedDeliveries.reduce(
      (sum, delivery) => sum + (delivery.delivery_cost || 0),
      0
    );

    set((state) => {
      const transactionId =
        state.transaction.id || get().generateTransactionId();

      return {
        transaction: {
          ...state.transaction,
          id: transactionId,
          deliveries: selectedDeliveries,
          total_delivery: selectedDeliveries.length,
          cost: totalCost,
        },
      };
    });
  },

  resetTransaction: () => {
    set({ transaction: initialTransaction });
  },

  setEditingDelivery: (delivery) => set({ editingDelivery: delivery }),

  clearEditingDelivery: () => set({ editingDelivery: null }),

  updateDeliveryInTransaction: (updatedDelivery: Delivery) =>
    set((state) => {
      const updatedDeliveries = state.transaction.deliveries.map((d) =>
        d.id === updatedDelivery.id ? updatedDelivery : d
      );

      const newCost = updatedDeliveries.reduce(
        (sum, d) => sum + (d.delivery_cost || 0),
        0
      );

      return {
        transaction: {
          ...state.transaction,
          deliveries: updatedDeliveries,
          cost: newCost,
        },
      };
    }),

  removeDeliveryFromTransaction: (deliveryId: number) => {
    const deliveryStore = useDeliveryStore.getState();

    const stateBefore = get();
    const deliveryToRemove = stateBefore.transaction.deliveries.find(
      (d) => d.id === deliveryId
    );

    const filtered = stateBefore.transaction.deliveries.filter(
      (d) => d.id !== deliveryId
    );
    const newCost = filtered.reduce(
      (sum, d) => sum + (d.delivery_cost || 0),
      0
    );

    if (deliveryToRemove) {
      deliveryStore.updateDriverStatus(deliveryToRemove.driver_id, "tersedia");
      deliveryStore.updateVehicleStatus(
        deliveryToRemove.vehicle_id,
        "tersedia"
      );
      deliveryStore.removeDelivery(deliveryToRemove.id);
      console.log("Setelah remove:");
      console.log("Delivery list:", deliveryStore.deliveryList);
      console.log("Drivers:", deliveryStore.drivers);
    }

    set({
      transaction: {
        ...stateBefore.transaction,
        deliveries: filtered,
        total_delivery: filtered.length,
        cost: newCost,
      },
    });
  },

  getUsedDriverIds: () => {
    const { transaction } = get();
    return transaction.deliveries
      .map((d) => d.driver_id)
      .filter((id): id is number => id !== null);
  },

  getUsedVehicleIds: () => {
    const { transaction } = get();
    return transaction.deliveries
      .map((d) => d.vehicle_id)
      .filter((id): id is number => id !== null);
  },

  isDriverUsed: (driverId: number, excludeDeliveryId?: number) => {
    const { transaction } = get();
    return transaction.deliveries.some(
      (d) =>
        d.driver_id === driverId &&
        (excludeDeliveryId ? d.id !== excludeDeliveryId : true)
    );
  },

  isVehicleUsed: (vehicleId: number, excludeDeliveryId?: number) => {
    const { transaction } = get();
    return transaction.deliveries.some(
      (d) =>
        d.vehicle_id === vehicleId &&
        (excludeDeliveryId ? d.id !== excludeDeliveryId : true)
    );
  },
}));
