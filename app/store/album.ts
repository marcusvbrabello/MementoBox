import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Actions, Photo, States } from "./types";

const initialState: States = {
  photos: [
    {
      id: "1",
      uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "2",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "3",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "4",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "5",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "6",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "7",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "8",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "9",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
    {
      id: "10",
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      timestamp: 1749486469,
      lat: "-19.908725754016086",
      long: "-43.92476856931319",
    },
  ],
  selectedPhoto: { id: "", uri: "", timestamp: 0, lat: "", long: "" },
};

export const albumStore = create<States & Actions>(
  combine(initialState, (set) => ({
    changePhotos: (payload: Array<Photo>) =>
      set((state) => ({ photos: payload })),
    changeSelectedPhoto: (payload: Photo) =>
      set((state) => ({ selectedPhoto: payload })),
    reset: () => set(() => initialState),
  }))
);
