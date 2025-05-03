import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Delivery = {
  driver_id: string;
  vehicle_id: string;
  load_type: string;
  load: string;
  quantity: string;
  weight: number;
  pickup_address: string;
  pickup_address_lat: number;
  pickup_address_lang: number;
  destination_address: string;
  destination_address_lat: number;
  destination_address_lang: number;
  delivery_date: string;
  delivery_deadline_date: string;
  delivery_status: string;
  delivery_cost: number;
  approved_at: string;
};

type DeliveryStore = {
  delivery: Delivery;
  setDelivery: (data: Partial<Delivery>) => void;
  setAllDelivery: (data: Delivery) => void;
  resetDelivery: () => void;
  deliveryList: Delivery[];
  addDelivery: (newDelivery: Delivery) => void;
  removeDelivery: (index: number) => void;
};

export const useDeliveryStore = create<DeliveryStore>()(
  devtools((set) => ({
    deliveryList: [], // List pengiriman
    addDelivery: (newDelivery: Delivery) =>
      set((state) => ({
        deliveryList: [...state.deliveryList, newDelivery], // Menambahkan pengiriman baru ke list
      })),
    removeDelivery: (index: number) =>
      set((state) => ({
        deliveryList: state.deliveryList.filter((_, i) => i !== index), // Menghapus pengiriman berdasarkan index
      })),
    delivery: {
      driver_id: "",
      vehicle_id: "",
      load_type: "",
      load: "",
      quantity: "",
      weight: 0,
      pickup_address: "",
      pickup_address_lat: 0,
      pickup_address_lang: 0,
      destination_address: "",
      destination_address_lat: 0,
      destination_address_lang: 0,
      delivery_date: "",
      delivery_deadline_date: "",
      delivery_status: "menunggu persetujuan",
      delivery_cost: 0,
      approved_at: "",
    },
    setDelivery: (data) =>
      set((state) => ({
        delivery: { ...state.delivery, ...data },
      })),
    setAllDelivery: (data: Delivery) => set({ delivery: data }),
    resetDelivery: () =>
      set({
        delivery: {
          driver_id: "",
          vehicle_id: "",
          load_type: "",
          load: "",
          quantity: "",
          weight: 0,
          pickup_address: "",
          pickup_address_lat: 0,
          pickup_address_lang: 0,
          destination_address: "",
          destination_address_lat: 0,
          destination_address_lang: 0,
          delivery_date: "",
          delivery_deadline_date: "",
          delivery_status: "menunggu persetujuan",
          delivery_cost: 0,
          approved_at: "",
        },
      }),
  }))
);
