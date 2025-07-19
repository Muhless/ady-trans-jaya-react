import { create } from "zustand";
import { DeliveryItem } from "./deliveryItemStore";

let destinationIdCounter = 0;
let itemIdCounter = 0;

const generateDestinationId = () =>
  Date.now() * 1000 + (destinationIdCounter++ % 1000);

const generateItemId = () => Date.now() * 1000 + (itemIdCounter++ % 1000);

export type DeliveryDestination = {
  id: number;
  address: string;
  lat: number | null;
  lng: number | null;
  sequence: number;
  arrival_time?: string;
  arrival_photo_url?: string;
  status?: string;
  items: DeliveryItem[];
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
  addItemToDestination: (
    destinationIndex: number,
    item: Omit<DeliveryItem, "id" | "destination_id">
  ) => void;
  removeItemFromDestination: (
    destinationIndex: number,
    itemIndex: number
  ) => void;
  resetDestinations: () => void;
};

// Zustand store
export const DeliveryDestinationStore = create<DeliveryDestinationStoreType>(
  (set, get) => ({
    pickup_address: "",
    destinations: [],

    setPickupAddress: (value) => set({ pickup_address: value }),

    setDestinations: (destinations) => set({ destinations }),

    updateDestination: (index, field, value) =>
      set((state) => {
        if (index < 0 || index >= state.destinations.length) return state;
        const updated = [...state.destinations];
        (updated[index] as any)[field] = value;
        return { destinations: updated };
      }),

    addDestination: () =>
      set((state) => {
        const newDestination: DeliveryDestination = {
          id: generateDestinationId(),
          address: "",
          lat: null,
          lng: null,
          sequence: state.destinations.length + 1,
          items: [],
        };
        return { destinations: [...state.destinations, newDestination] };
      }),

    removeDestination: (index) =>
      set((state) => {
        const filtered = state.destinations.filter((_, i) => i !== index);
        const resequenced = filtered.map((dest, i) => ({
          ...dest,
          sequence: i + 1,
        }));
        return { destinations: resequenced };
      }),

    addItemToDestination: (destinationIndex, item) =>
      set((state) => {
        if (
          destinationIndex < 0 ||
          destinationIndex >= state.destinations.length
        ) {
          console.error(`Invalid destination index: ${destinationIndex}`);
          return state;
        }

        const targetDestination = state.destinations[destinationIndex];
        const newItem: DeliveryItem = {
          ...item,
          id: generateItemId(),
          destination_id: targetDestination.id,
        };

        const updatedDestinations = state.destinations.map((dest, index) =>
          index === destinationIndex
            ? {
                ...dest,
                items: [...(dest.items || []), newItem],
              }
            : dest
        );

        return { destinations: updatedDestinations };
      }),

    removeItemFromDestination: (destinationIndex, itemIndex) =>
      set((state) => {
        if (
          destinationIndex < 0 ||
          destinationIndex >= state.destinations.length
        ) {
          return state;
        }

        const destination = state.destinations[destinationIndex];
        if (
          !destination?.items ||
          itemIndex < 0 ||
          itemIndex >= destination.items.length
        ) {
          return state;
        }

        const updatedDestinations = state.destinations.map((dest, index) =>
          index === destinationIndex
            ? {
                ...dest,
                items: dest.items.filter((_, i) => i !== itemIndex),
              }
            : dest
        );

        return { destinations: updatedDestinations };
      }),

    resetDestinations: () =>
      set(() => {
        destinationIdCounter = 0;
        itemIdCounter = 0;

        return {
          pickup_address: "",
          destinations: [],
        };
      }),
  })
);
