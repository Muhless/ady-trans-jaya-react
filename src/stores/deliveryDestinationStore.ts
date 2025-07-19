import { create } from "zustand";

export type DeliveryItem = {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
  weight: number;
  destination_id: number; // ✅ Add destination_id to match deliveryItemStore
};

export type DeliveryDestination = {
  id?: number;
  address: string;
  lat: number | null;
  lng: number | null;
  sequence: number;
  arrival_time?: string;
  arrival_photo_url?: string;
  status?: string;
  items?: DeliveryItem[];
};

type DeliveryDestinationStoreType = {
  pickup_address: string;
  destinations: DeliveryDestination[];
  setPickupAddress: (value: string) => void;
  setDestinations: (destinations: DeliveryDestination[]) => void;
  updateDestination: <K extends keyof DeliveryDestination>(
    index: number,
    field: K,
    value: DeliveryDestination[K]
  ) => void;
  addDestination: () => void;
  removeDestination: (index: number) => void;
  addItemToDestination: (index: number, item: DeliveryItem) => void;
  removeItemFromDestination: (index: number, itemIndex: number) => void;
  resetDestinations: () => void;
};

export const DeliveryDestinationStore = create<DeliveryDestinationStoreType>(
  (set) => ({
    pickup_address: "",
    destinations: [
      {
        address: "",
        lat: null,
        lng: null,
        sequence: 1,
        items: [],
      },
    ],
    setPickupAddress: (value) => set({ pickup_address: value }),
    setDestinations: (destinations) => set({ destinations }),
    updateDestination: (index, field, value) =>
      set((state) => {
        const updated = [...state.destinations];
        (updated[index] as any)[field] = value;
        return { destinations: updated };
      }),
    addDestination: () =>
      set((state) => ({
        destinations: [
          ...state.destinations,
          {
            address: "",
            lat: null,
            lng: null,
            sequence: state.destinations.length + 1,
            items: [],
          },
        ],
      })),
    removeDestination: (index) =>
      set((state) => {
        const filtered = state.destinations.filter((_, i) => i !== index);
        const resequenced = filtered.map((dest, i) => ({
          ...dest,
          sequence: i + 1,
        }));
        return { destinations: resequenced };
      }),
    addItemToDestination: (index, item) =>
      set((state) => {
        const updated = [...state.destinations];
        const dest = updated[index];
        if (!dest.items) dest.items = [];
        // ✅ Ensure destination_id is set correctly
        const itemWithDestinationId = {
          ...item,
          destination_id: index
        };
        dest.items.push(itemWithDestinationId);
        return { destinations: updated };
      }),
    removeItemFromDestination: (index, itemIndex) =>
      set((state) => {
        const updated = [...state.destinations];
        const dest = updated[index];
        if (dest.items) {
          dest.items = dest.items.filter((_, i) => i !== itemIndex);
        }
        return { destinations: updated };
      }),
    resetDestinations: () =>
      set(() => ({
        pickup_address: "",
        destinations: [
          {
            address: "",
            lat: null,
            lng: null,
            sequence: 1,
            items: [],
          },
        ],
      })),
  })
);