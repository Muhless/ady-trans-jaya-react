import { create } from "zustand";

export type DeliveryItem = {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
  weight: number;
  destination_id: number;
};

type DeliveryItemStore = {
  items: DeliveryItem[];
  addItem: (item: DeliveryItem) => void;
  addItems: (newItems: DeliveryItem[]) => void;
  removeItem: (id: number) => void; // ✅ Tambah method untuk remove item
  updateItem: (id: number, updates: Partial<DeliveryItem>) => void; // ✅ Tambah method untuk update
  getItemsByDestination: (destinationId: number) => DeliveryItem[]; // ✅ Helper method
  resetDeliveryItems: () => void;
  resetItemsByDestination: (destinationId: number) => void; // ✅ Reset per destination
};

export const useDeliveryItemStore = create<DeliveryItemStore>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  addItems: (newItems) =>
    set((state) => ({
      items: [...state.items, ...newItems],
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
