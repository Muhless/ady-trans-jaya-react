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
  deliveryIdCounter: number; 
  generateDeliveryId: () => number; 
  setDelivery: (data: Partial<Delivery>) => void;
  setAllDelivery: (data: Delivery) => void;
  resetDelivery: () => void;
  deliveryList: Delivery[];
  addDelivery: (newDelivery: Delivery) => void;
  removeDelivery: (id: number) => void;
  updateDelivery: (id: number, updatedDelivery: Partial<Delivery>) => void;

  drivers: Driver[];
  vehicles: Vehicle[];
  setDrivers: (data: Driver[]) => void;
  setVehicles: (data: Vehicle[]) => void;
  updateDriverStatus: (driverId: number, status: string) => void;
  updateVehicleStatus: (vehicleId: number, status: string) => void;
};

export const useDeliveryStore = create<DeliveryStore>()(
  devtools((set, get) => ({
    deliveryIdCounter: 1,
    drivers: [],
    vehicles: [],

    generateDeliveryId: () => {
      const currentCounter = get().deliveryIdCounter;
      set((state) => ({
        deliveryIdCounter: state.deliveryIdCounter + 1,
      }));
      return currentCounter;
    },

    setDrivers: (data) => set({ drivers: data }),
    setVehicles: (data) => set({ vehicles: data }),

    updateDriverStatus: (driverId: number, status: string) =>
      set((state) => {
        console.log("Updating driver status:", driverId, status);
        const updatedDrivers = state.drivers.map((driver) => {
          if (driver.id === driverId) {
            console.log("Found driver to update:", driver);
            return { ...driver, status };
          }
          return driver;
        });
        console.log("Updated drivers:", updatedDrivers);
        return { drivers: updatedDrivers };
      }),

    updateVehicleStatus: (vehicleId: number, status: string) =>
      set((state) => {
        console.log("Updating vehicle status:", vehicleId, status);
        const updatedVehicles = state.vehicles.map((vehicle) => {
          if (vehicle.id === vehicleId) {
            console.log("Found vehicle to update:", vehicle);
            return { ...vehicle, status };
          }
          return vehicle;
        });
        console.log("Updated vehicles:", updatedVehicles);
        return { vehicles: updatedVehicles };
      }),

    deliveryList: [],

    addDelivery: (newDelivery: Delivery) =>
      set((state) => {
        const deliveryWithId = {
          ...newDelivery,
          id:
            newDelivery.id && newDelivery.id !== 0
              ? newDelivery.id
              : get().generateDeliveryId(),
        };

        const updatedDrivers = state.drivers.map((driver) =>
          driver.id === deliveryWithId.driver_id
            ? { ...driver, status: "digunakan" }
            : driver
        );

        const updatedVehicles = state.vehicles.map((vehicle) =>
          vehicle.id === deliveryWithId.vehicle_id
            ? { ...vehicle, status: "digunakan" }
            : vehicle
        );

        return {
          deliveryList: [...state.deliveryList, deliveryWithId],
          drivers: updatedDrivers,
          vehicles: updatedVehicles,
        };
      }),

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

    setDelivery: (data: Partial<Delivery>) =>
      set((state) => ({
        delivery: {
          ...state.delivery,
          ...data,
        },
      })),

    setAllDelivery: (data: Delivery) => {
      const deliveryWithId = {
        ...data,
        id: data.id && data.id !== 0 ? data.id : get().generateDeliveryId(),
      };
      set({ delivery: deliveryWithId });
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
