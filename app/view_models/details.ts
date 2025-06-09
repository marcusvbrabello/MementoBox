import { albumStore } from "@store/album";
import { useRouter } from "expo-router";

export function useDetailsViewModel() {
  const router = useRouter();
  const store = albumStore((state) => state);

  return {
    ...store,
  };
}
