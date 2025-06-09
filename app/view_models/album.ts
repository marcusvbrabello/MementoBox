import { albumStore } from "@store/album";
import { Photo } from "@store/types";
import { useRouter } from "expo-router";

export function useAlbumViewModel() {
  const router = useRouter();
  const store = albumStore((state) => state);

  const { photos, changePhotos, changeSelectedPhoto } = store;

  const data = [{ id: "camera" }, ...photos];

  function openCamera() {
    router.navigate("/views/take_photo");
  }

  function openDetails(item: Photo) {
    changeSelectedPhoto(item);
    router.navigate("/views/details");
  }

  return {
    ...store,
    data,
    openDetails,
    openCamera
  };
}
