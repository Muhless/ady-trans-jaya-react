import { create } from "zustand";

export type DeliveryItem = {
  item_name: string;
  quantity: string;
  weight: string;
};

type DeliveryItemStore = {
  items: DeliveryItem[];
  addItems: (newItems: DeliveryItem[]) => void;
  resetItems: () => void;
};

export const useDeliveryItemStore = create<DeliveryItemStore>((set) => ({
  items: [],
  addItems: (newItems) => set({ items: newItems }),
  resetItems: () => set({ items: [] }),
}));
