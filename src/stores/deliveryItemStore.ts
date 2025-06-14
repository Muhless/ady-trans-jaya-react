import { create } from "zustand";

export type DeliveryItem = {
  item_name: string;
  quantity: string;
  weight: number;
};

type DeliveryItemStore = {
  items: DeliveryItem[];
  addItems: (newItems: DeliveryItem[]) => void;
  resetDeliveryItems: () => void;
};

export const useDeliveryItemStore = create<DeliveryItemStore>((set) => ({
  items: [],
  addItems: (newItems) => set({ items: newItems }),
  resetDeliveryItems: () => set({ items: [] }),
}));
