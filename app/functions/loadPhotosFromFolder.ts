import { albumStore } from "@store/album";
import { Photo } from "@store/types";
import * as FileSystem from "expo-file-system";

export async function loadPhotosFromFolder() {
  console.log("loadPhotosFromFolder");
  const store = albumStore((state) => state);
  const { changePhotos } = store;

  try {
    console.log("entrou");
    const folderUri = FileSystem.documentDirectory + "MementoBoxPhotos";
    const folderInfo = await FileSystem.getInfoAsync(folderUri);
    console.log("folderInfo: ", JSON.stringify(folderInfo));
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
    console.log("loaded photos ", JSON.stringify(photos));
    changePhotos(photos);
  } catch (e) {
    console.error("Error loading photos:", e);
    changePhotos([]);
  }
}
