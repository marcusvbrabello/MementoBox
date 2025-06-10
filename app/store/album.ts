import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Actions, Photo, States } from "./types";

const initialState: States = {
  photos: [],
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
