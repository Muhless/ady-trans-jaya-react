import { create } from "zustand";
import { type Delivery } from "./deliveryStore";

type Transaction = {
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

type Driver = {
  id: number;
  name: string;
  status: string;
};

type Vehicle = {
  id: number;
  name: string;
  status: string;
};

type TransactionStore = {
  transaction: Transaction;
  drivers: Driver[];
  vehicles: Vehicle[];
  setTransaction: (data: Partial<Transaction>) => void;
  resetTransaction: () => void;
  addDeliveryToTransaction: (delivery: Delivery) => void;

  setDrivers: (drivers: Driver[]) => void;
  setVehicles: (vehicles: Vehicle[]) => void;

  updateDriverStatus: (id: number, status: string) => void;
  updateVehicleStatus: (id: number, status: string) => void;
};

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transaction: {
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
  },
  drivers: [],
  vehicles: [],

  setTransaction: (data) =>
    set((state) => ({
      transaction: { ...state.transaction, ...data },
    })),

  resetTransaction: () =>
    set({
      transaction: {
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
      },
      drivers: [],
      vehicles: [],
    }),

  addDeliveryToTransaction: (delivery) =>
    set((state) => {
      console.log("Drivers available:", state.drivers);
      console.log("Delivery driver_id:", delivery.driver_id);

      const driver = state.drivers.find((d) => d.id === delivery.driver_id);
      if (!driver || driver.status !== "tersedia") {
        console.error("Driver tidak tersedia:", driver);
        throw new Error("Driver tidak tersedia");
      }

      const vehicle = state.vehicles.find((v) => v.id === delivery.vehicle_id);
      if (!vehicle || vehicle.status !== "tersedia")
        throw new Error("Vehicle tidak tersedia");

      const updateStatus = (items, id, newStatus) =>
        items.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        );

      return {
        transaction: {
          ...state.transaction,
          deliveries: [...state.transaction.deliveries, delivery],
          total_delivery: state.transaction.total_delivery + 1,
          cost: state.transaction.cost + (delivery.delivery_cost || 0),
        },
        drivers: updateStatus(
          state.drivers,
          delivery.driver_id,
          "tidak tersedia"
        ),
        vehicles: updateStatus(
          state.vehicles,
          delivery.vehicle_id,
          "tidak tersedia"
        ),
      };
    }),

  setDrivers: (drivers) => set({ drivers }),
  setVehicles: (vehicles) => set({ vehicles }),

  updateDriverStatus: (id, status) =>
    set((state) => ({
      drivers: state.drivers.map((driver) =>
        driver.id === id ? { ...driver, status } : driver
      ),
      transaction: {
        ...state.transaction,
        deliveries: state.transaction.deliveries.map((delivery) =>
          delivery.driver_id === id
            ? {
                ...delivery,
                driver: { ...delivery.driver, status },
              }
            : delivery
        ),
      },
    })),

  updateVehicleStatus: (id, status) =>
    set((state) => ({
      vehicles: state.vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, status } : vehicle
      ),
      transaction: {
        ...state.transaction,
        deliveries: state.transaction.deliveries.map((delivery) =>
          delivery.vehicle_id === id
            ? {
                ...delivery,
                vehicle: { ...delivery.vehicle, status },
              }
            : delivery
        ),
      },
    })),
  removeDeliveryFromTransaction: (deliveryId: number) =>
    set((state) => {
      const deliveryToRemove = state.transaction.deliveries.find(
        (d) => d.id === deliveryId
      );

      if (!deliveryToRemove) return {};

      return {
        transaction: {
          ...state.transaction,
          deliveries: state.transaction.deliveries.filter(
            (d) => d.id !== deliveryId
          ),
          total_delivery: state.transaction.total_delivery - 1,
          cost: state.transaction.cost - (deliveryToRemove.delivery_cost || 0),
        },
        drivers: state.drivers.map((driver) =>
          driver.id === deliveryToRemove.driver_id
            ? { ...driver, status: "tersedia" }
            : driver
        ),
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === deliveryToRemove.vehicle_id
            ? { ...vehicle, status: "tersedia" }
            : vehicle
        ),
      };
    }),
  availableDrivers: () => {
    const state = get();
    return state.drivers.filter((d) => d.status === "tersedia");
  },

  availableVehicles: () => {
    const state = get();
    return state.vehicles.filter((v) => v.status === "tersedia");
  },
}));
