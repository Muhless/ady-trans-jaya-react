import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Delivery = {
  driver: any;
  vehicle: any;
  id: number;
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
  delivery: Delivery;
  setDelivery: (data: Partial<Delivery>) => void;
  setAllDelivery: (data: Delivery) => void;
  resetDelivery: () => void;
  deliveryList: Delivery[];
  addDelivery: (newDelivery: Delivery) => void;
  removeDelivery: (id: number) => void;
  updateDelivery: (id: string, updatedDelivery: Partial<Delivery>) => void;
};

export const useDeliveryStore = create<DeliveryStore>()(
  devtools((set) => ({
    deliveryList: [],
    addDelivery: (newDelivery: Delivery) =>
      set((state) => ({
        deliveryList: [...state.deliveryList, newDelivery],
      })),
    removeDelivery: (id: number) =>
      set((state) => ({
        deliveryList: state.deliveryList.filter(
          (delivery) => delivery.id !== id
        ),
      })),
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
          id: 0,
          driver: null,
          vehicle: null,
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
