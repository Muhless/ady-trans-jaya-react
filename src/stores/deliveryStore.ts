import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DeliveryItem, useDeliveryItemStore } from "./deliveryItemStore";

type Driver = {
  id: number;
  name: string;
  status: string;
};

type Vehicle = {
  id: number;
  plate_number: string;
  status: string;
};

export type Delivery = {
  driver: any;
  vehicle: any;
  id: number;
  driver_id: number | null;
  vehicle_id: number | null;
  delivery_code: string;
  load_type: string;
  total_weight: number;
  total_item: number;
  pickup_address: string;
  pickup_address_lat: number | null;
  pickup_address_lang: number | null;
  destination_address: string;
  destination_address_lat: number | null;
  destination_address_lang: number | null;
  delivery_date: string | null;
  delivery_deadline_date: string | null;
  delivery_status: string;
  delivery_cost: number;
  approved_at: string | null;
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
  updateDelivery: (id: string, updatedDelivery: Partial<Delivery>) => void;

  drivers: Driver[];
  vehicles: Vehicle[];
  setDrivers: (data: Driver[]) => void;
  setVehicles: (data: Vehicle[]) => void;
  updateDriverStatus: (driverId: number, status: string) => void;
  updateVehicleStatus: (vehicleId: number, status: string) => void;
};

export const useDeliveryStore = create<DeliveryStore>()(
  devtools((set) => ({
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
      set((state) => ({
        deliveryList: [...state.deliveryList, newDelivery],
      })),

    removeDelivery: (id: number) =>
      set((state) => {
        const deliveryToRemove = state.deliveryList.find((d) => d.id === id);

        let updatedDrivers = state.drivers;
        let updatedVehicles = state.vehicles;

        if (deliveryToRemove) {
          updatedDrivers = state.drivers.map((driver) =>
            driver.id === deliveryToRemove.driver_id
              ? { ...driver, status: "tersedia" }
              : driver
          );

          updatedVehicles = state.vehicles.map((vehicle) =>
            vehicle.id === deliveryToRemove.vehicle_id
              ? { ...vehicle, status: "tersedia" }
              : vehicle
          );
        }

        return {
          deliveryList: state.deliveryList.filter(
            (delivery) => delivery.id !== id
          ),
          drivers: updatedDrivers,
          vehicles: updatedVehicles,
        };
      }),

    updateDelivery: (id: number, updatedDelivery: Partial<Delivery>) =>
      set((state) => ({
        deliveryList: state.deliveryList.map((delivery) =>
          delivery.id === id ? { ...delivery, ...updatedDelivery } : delivery
        ),
      })),
    delivery: {
      id: null,
      driver_id: null,
      vehicle_id: null,
      load_type: "",
      total_weight: 0,
      total_item: 0,
      pickup_address: "",
      pickup_address_lat: null,
      pickup_address_lang: null,
      destination_address: "",
      destination_address_lat: null,
      destination_address_lang: null,
      delivery_date: null,
      delivery_deadline_date: null,
      delivery_status: "menunggu persetujuan",
      delivery_cost: 0,
      approved_at: null,
      items: [],
    },

    setDelivery: (data: Partial<Delivery>) =>
      set((state) => ({
        delivery: {
          ...state.delivery,
          ...data,
        },
      })),

    setAllDelivery: (data: Delivery) => set({ delivery: data }),

    resetDelivery: () => {
      useDeliveryItemStore.getState().resetDeliveryItems();
      set({
        delivery: {
          id: 0,
          driver: null,
          vehicle: null,
          driver_id: null,
          vehicle_id: null,
          delivery_code: "",
          load_type: "",
          total_weight: 0,
          total_item: 0,
          pickup_address: "",
          pickup_address_lat: null,
          pickup_address_lang: null,
          destination_address: "",
          destination_address_lat: null,
          destination_address_lang: null,
          delivery_date: null,
          delivery_deadline_date: null,
          delivery_status: "menunggu persetujuan",
          delivery_cost: 0,
          approved_at: null,
          items: [],
        },
      });
    },
  }))
);
