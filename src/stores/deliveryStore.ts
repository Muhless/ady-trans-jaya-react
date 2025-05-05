import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Delivery = {
  id: string;
  driver_id: number | null;
  vehicle_id: number | null;
  load_type: string;
  load: string;
  quantity: string;
  weight: string;
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
};

type DeliveryStore = {
  delivery: Delivery; // Single delivery object (for form editing)
  setDelivery: (data: Partial<Delivery>) => void;
  setAllDelivery: (data: Delivery) => void;
  resetDelivery: () => void;
  deliveryList: Delivery[]; // List of deliveries
  addDelivery: (newDelivery: Delivery) => void;
  removeDelivery: (id: string) => void; // Changed parameter type to string to match ID
  updateDelivery: (id: string, updatedDelivery: Partial<Delivery>) => void; // Added update function
};

export const useDeliveryStore = create<DeliveryStore>()(
  devtools((set) => ({
    deliveryList: [], // Array of deliveries
    addDelivery: (newDelivery: Delivery) =>
      set((state) => ({
        deliveryList: [...state.deliveryList, newDelivery], 
      })),
    removeDelivery: (id: string) => // Changed parameter to match the function signature
      set((state) => ({
        deliveryList: state.deliveryList.filter(
          (delivery) => delivery.id !== id
        ),
      })),
    updateDelivery: (id: string, updatedDelivery: Partial<Delivery>) =>
      set((state) => ({
        deliveryList: state.deliveryList.map(delivery => 
          delivery.id === id ? { ...delivery, ...updatedDelivery } : delivery
        ),
      })),
    delivery: { // Default values for a single delivery
      id: "",
      driver_id: null,
      vehicle_id: null,
      load_type: "",
      load: "",
      quantity: "",
      weight: "",
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
    },
    setDelivery: (data) =>
      set((state) => ({
        delivery: { ...state.delivery, ...data },
      })),
    setAllDelivery: (data: Delivery) => set({ delivery: data }),
    resetDelivery: () =>
      set({
        delivery: {
          id: "",
          driver_id: null,
          vehicle_id: null,
          load_type: "",
          load: "",
          quantity: "",
          weight: "",
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
        },
      }),
  }))
);