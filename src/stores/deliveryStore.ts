import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DeliveryItem, useDeliveryItemStore } from "./deliveryItemStore";

export type Driver = {
  id: number;
  name: string;
  status: string;
};

export type Vehicle = {
  id: number;
  name: string;
  status: string;
  type: string;
  rate_per_km: number;
};

export type Delivery = {
  id: number;
  driver_id: number | null;
  vehicle_id: number | null;
  driver: Driver | null;
  vehicle: Vehicle | null;
  delivery_code: string;
  total_weight: number;
  total_item: number;
  pickup_address: string;
  pickup_address_lat: number | null;
  pickup_address_lang: number | null;
  destination_address: string;
  destination_address_lat: number | null;
  destination_address_lang: number | null;
  delivery_date: string | null;
  delivery_status: string;
  delivery_cost: number;
  approved_at: string | null;
  note: string;
  items: DeliveryItem[];
};

type DeliveryStore = {
  delivery: Delivery;
  setDelivery: (data: Partial<Delivery>) => void;
  setAllDelivery: (data: Delivery) => void;
  resetDelivery: () => void;
  deliveryList: Delivery[];
  addDelivery: (newDelivery: Delivery) => void;
  removeDelivery: (id: number) => void;
  updateDelivery: (id: number, updatedDelivery: Partial<Delivery>) => void;

  addItemToDelivery: (item: DeliveryItem) => void;
  removeItemFromDelivery: (itemId: number) => void;
  updateItemInDelivery: (
    itemId: number,
    updates: Partial<DeliveryItem>
  ) => void;
  setDeliveryItems: (items: DeliveryItem[]) => void;

  calculateTotalWeight: () => void;
  calculateTotalItems: () => void;
  updateTotals: () => void;

  drivers: Driver[];
  vehicles: Vehicle[];
  setDrivers: (data: Driver[]) => void;
  setVehicles: (data: Vehicle[]) => void;
  updateDriverStatus: (driverId: number, status: string) => void;
  updateVehicleStatus: (vehicleId: number, status: string) => void;
};

export const useDeliveryStore = create<DeliveryStore>()(
  devtools((set, get) => ({
    drivers: [],
    vehicles: [],

    setDrivers: (data) => set({ drivers: data }),
    setVehicles: (data) => set({ vehicles: data }),

    updateDriverStatus: (driverId, status) =>
      set((state) => ({
        drivers: state.drivers.map((driver) =>
          driver.id === driverId ? { ...driver, status } : driver
        ),
      })),

    updateVehicleStatus: (vehicleId, status) =>
      set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === vehicleId ? { ...vehicle, status } : vehicle
        ),
      })),

    deliveryList: [],

    addDelivery: (newDelivery: Delivery) =>
      set((state) => {
        const driver = state.drivers.find(
          (d) => d.id === newDelivery.driver_id
        );
        const vehicle = state.vehicles.find(
          (v) => v.id === newDelivery.vehicle_id
        );

        const deliveryWithId = {
          ...newDelivery,
          id: newDelivery.id || Date.now(),
          driver: driver || null,
          vehicle: vehicle || null,
        };

        return {
          deliveryList: [...state.deliveryList, deliveryWithId],
        };
      }),

    removeDelivery: (id) =>
      set((state) => {
        return {
          deliveryList: state.deliveryList.filter(
            (delivery) => delivery.id !== id
          ),
        };
      }),

    updateDelivery: (id, updatedDelivery) =>
      set((state) => ({
        deliveryList: state.deliveryList.map((delivery) =>
          delivery.id === id ? { ...delivery, ...updatedDelivery } : delivery
        ),
      })),

    delivery: {
      id: 0,
      driver: null,
      vehicle: null,
      driver_id: null,
      vehicle_id: null,
      delivery_code: "",
      total_weight: 0,
      total_item: 0,
      pickup_address: "",
      pickup_address_lat: null,
      pickup_address_lang: null,
      destination_address: "",
      destination_address_lat: null,
      destination_address_lang: null,
      delivery_date: null,
      delivery_status: "menunggu persetujuan",
      delivery_cost: 0,
      note: "",
      approved_at: null,
      items: [],
    },

    setDelivery: (data: Partial<Delivery>) =>
      set((state) => {
        const isNewId = data.id === 0 || data.id === undefined;

        let updatedData = { ...data };

        if (data.driver_id !== undefined) {
          const driver = state.drivers.find((d) => d.id === data.driver_id);
          updatedData.driver = driver || null;
        }

        if (data.vehicle_id !== undefined) {
          const vehicle = state.vehicles.find((v) => v.id === data.vehicle_id);
          updatedData.vehicle = vehicle || null;
        }

        const updatedDelivery = {
          ...state.delivery,
          ...updatedData,
          id: isNewId ? Date.now() : data.id ?? state.delivery.id,
        };

        if (data.items) {
          setTimeout(() => get().updateTotals(), 0);
        }

        return { delivery: updatedDelivery };
      }),

    setAllDelivery: (data: Delivery) => {
      const deliveryWithId = {
        ...data,
        id: data.id === 0 || data.id === undefined ? Date.now() : data.id,
      };
      set({ delivery: deliveryWithId });

      setTimeout(() => get().updateTotals(), 0);
    },

    resetDelivery: () => {
      useDeliveryItemStore.getState().resetDeliveryItems();
      set({
        delivery: {
          id: 0,
          driver_id: null,
          vehicle_id: null,
          driver: null,
          vehicle: null,
          delivery_code: "",
          total_weight: 0,
          total_item: 0,
          pickup_address: "",
          pickup_address_lat: null,
          pickup_address_lang: null,
          destination_address: "",
          destination_address_lat: null,
          destination_address_lang: null,
          delivery_date: null,
          delivery_status: "menunggu persetujuan",
          delivery_cost: 0,
          note: "",
          approved_at: null,
          items: [],
        },
      });
    },

    addItemToDelivery: (item: DeliveryItem) =>
      set((state) => {
        const newItem = {
          ...item,
          id: item.id || Date.now(),
          delivery_id: state.delivery.id,
        };

        const updatedDelivery = {
          ...state.delivery,
          items: [...state.delivery.items, newItem],
        };

        useDeliveryItemStore.getState().addItem(newItem);

        setTimeout(() => get().updateTotals(), 0);

        return { delivery: updatedDelivery };
      }),

    removeItemFromDelivery: (itemId: number) =>
      set((state) => {
        const updatedDelivery = {
          ...state.delivery,
          items: state.delivery.items.filter((item) => item.id !== itemId),
        };

        useDeliveryItemStore.getState().removeItem(itemId);

        setTimeout(() => get().updateTotals(), 0);

        return { delivery: updatedDelivery };
      }),

    updateItemInDelivery: (itemId: number, updates: Partial<DeliveryItem>) =>
      set((state) => {
        const updatedDelivery = {
          ...state.delivery,
          items: state.delivery.items.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        };

        useDeliveryItemStore.getState().updateItem(itemId, updates);

        setTimeout(() => get().updateTotals(), 0);

        return { delivery: updatedDelivery };
      }),

    setDeliveryItems: (items: DeliveryItem[]) =>
      set((state) => {
        const updatedDelivery = {
          ...state.delivery,
          items: items.map((item) => ({
            ...item,
            delivery_id: state.delivery.id,
          })),
        };

        useDeliveryItemStore.getState().addItems(updatedDelivery.items);

        setTimeout(() => get().updateTotals(), 0);

        return { delivery: updatedDelivery };
      }),

    calculateTotalWeight: () => {
      const state = get();
      const totalWeight = state.delivery.items.reduce(
        (total, item) => total + (item.weight * item.quantity || 0),
        0
      );

      set((currentState) => ({
        delivery: { ...currentState.delivery, total_weight: totalWeight },
      }));
    },

    calculateTotalItems: () => {
      const state = get();
      const totalItems = state.delivery.items.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );

      set((currentState) => ({
        delivery: { ...currentState.delivery, total_item: totalItems },
      }));
    },

    updateTotals: () => {
      get().calculateTotalWeight();
      get().calculateTotalItems();
    },
  }))
);
