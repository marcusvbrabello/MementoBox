import { albumStore } from "@store/album";
import { Photo } from "@store/types";
import * as FileSystem from "expo-file-system";

export async function loadPhotosFromFolder() {
  const store = albumStore((state) => state);
  const { changePhotos } = store;

  try {
    const folderUri = FileSystem.documentDirectory + "MementoBoxPhotos";
    const folderInfo = await FileSystem.getInfoAsync(folderUri);
    if (!folderInfo.exists) {
      store.changePhotos([]);
      return;
    }

    const files = await FileSystem.readDirectoryAsync(folderUri);
    const photoFiles = files.filter((f) => f.endsWith(".jpg"));

    const photos: Photo[] = [];

    for (const photoFile of photoFiles) {
      const id = photoFile.replace("photo_", "").replace(".jpg", "");
      const uri = `${folderUri}/${photoFile}`;
      const metadataUri = `${folderUri}/photo_${id}.json`;

      let timestamp = 0;
      let lat = "";
      let long = "";

      try {
        const metadataStr = await FileSystem.readAsStringAsync(metadataUri);
        const metadata = JSON.parse(metadataStr);
        timestamp = metadata.timestamp || 0;
        lat = metadata.location?.coords?.latitude?.toString() || "";
        long = metadata.location?.coords?.longitude?.toString() || "";
      } catch (e) {
        console.log("error metadata", e);
      }

      photos.push({ id, uri, timestamp, lat, long });
    }
    changePhotos(photos);
  } catch (e) {
    console.error("Error loading photos:", e);
    changePhotos([]);
  }
}
