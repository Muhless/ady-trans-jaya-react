import { create } from "zustand";

export type DeliveryItem = {
  id?: number;
  item_name: string;
  quantity: number;
  unit: string;
  weight: number;
  delivery_id?: number; // mengacu langsung ke delivery
};

type DeliveryItemStore = {
  items: DeliveryItem[];
  addItem: (item: DeliveryItem) => void;
  addItems: (newItems: DeliveryItem[]) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, updates: Partial<DeliveryItem>) => void;
  getItemsByDelivery: (deliveryId: number) => DeliveryItem[];
  resetDeliveryItems: () => void;
  resetItemsByDelivery: (deliveryId: number) => void;
};

export const useDeliveryItemStore = create<DeliveryItemStore>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  addItems: (newItems) =>
    set(() => ({
      items: newItems,
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  getItemsByDelivery: (deliveryId) => {
    return get().items.filter((item) => item.delivery_id === deliveryId);
  },

  resetDeliveryItems: () => set({ items: [] }),

  resetItemsByDelivery: (deliveryId) =>
    set((state) => ({
      items: state.items.filter((item) => item.delivery_id !== deliveryId),
    })),
}));