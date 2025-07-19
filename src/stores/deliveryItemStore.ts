import { create } from "zustand";

export type DeliveryItem = {
  id?: number;
  item_name: string;
  quantity: number;
  unit: string;
  weight: number;
  destination_id?: number; // opsional, karena tidak digunakan langsung di form
};

type DeliveryItemStore = {
  items: DeliveryItem[];
  addItem: (item: DeliveryItem) => void;
  addItems: (newItems: DeliveryItem[]) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, updates: Partial<DeliveryItem>) => void;
  getItemsByDestination: (destinationId: number) => DeliveryItem[];
  resetDeliveryItems: () => void;
  resetItemsByDestination: (destinationId: number) => void;
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

  getItemsByDestination: (destinationId) => {
    return get().items.filter((item) => item.destination_id === destinationId);
  },

  resetDeliveryItems: () => set({ items: [] }),

  resetItemsByDestination: (destinationId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.destination_id !== destinationId
      ),
    })),
}));
