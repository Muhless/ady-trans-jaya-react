import { create } from "zustand";

export type DeliveryDestination = {
  id?: number;
  address: string;
  lat: number | null;
  lng: number | null;
  sequence: number;
  arrival_time?: string;
  arrival_photo_url?: string;
  status?: string;
};

export const DeliveryDestinationStore = create((set) => ({
  pickup_address: "",
  destinations: [
    {
      address: "",
      lat: null,
      lng: null,
      sequence: 1,
    },
  ],
  setPickupAddress: (value) => set({ pickup_address: value }),
  setDestinations: (destinations) => set({ destinations }),
  updateDestination: (index, field, value) =>
    set((state) => {
      const updated = [...state.destinations];
      updated[index][field] = value;
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
}));
