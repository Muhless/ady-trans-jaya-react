import { create } from "zustand";

type Delivery = {
  driver_id: string;
  vehicle_id: string;
  load_type: string;
  load: string;
  quantity: string;
  weight: number;
  pickup_location: string;
  destination: string;
  delivery_date: string;
  delivery_deadline_date: string;
  delivery_status: string;
  delivery_cost: number;
};

type DeliveryStore = {
  delivery: Delivery;
  setDelivery: (data: Partial<Delivery>) => void;
  setPickupLocation: (value: string) => void;
  setAllDelivery: (data: Delivery) => void;
  setDestination: (value: string) => void;
  resetDelivery: () => void;
};

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  delivery: {
    driver_id: "",
    vehicle_id: "",
    load_type: "",
    load: "",
    quantity: "",
    weight: 0,
    pickup_location: "",
    destination: "",
    delivery_date: "",
    delivery_deadline_date: "",
    delivery_status: "",
    delivery_cost: 0,
  },
  setDelivery: (data) =>
    set((state) => ({
      delivery: { ...state.delivery, ...data },
    })),
  setPickupLocation: (value) =>
    set((state) => ({
      delivery: { ...state.delivery, pickup_location: value },
    })),
  setDestination: (value) =>
    set((state) => ({
      delivery: { ...state.delivery, destination: value },
    })),
  setAllDelivery: (data) => set({ delivery: data }),
  resetDelivery: () =>
    set({
      delivery: {
        driver_id: "",
        vehicle_id: "",
        load_type: "",
        load: "",
        quantity: "",
        weight: 0,
        pickup_location: "",
        destination: "",
        delivery_date: "",
        delivery_deadline_date: "",
        delivery_status: "",
        delivery_cost: 0,
      },
    }),
}));
