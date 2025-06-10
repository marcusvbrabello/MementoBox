import useToast from "@hooks/useToast";
import { albumStore } from "@store/album";
import { Photo } from "@store/types";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

export function useTakePhotoViewModel() {
  const router = useRouter();
  const store = albumStore((state) => state);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<boolean>(false);

  const { changePhotos } = store;

  const cameraRef = useRef<CameraView>(null);

  const goBack = () => router.dismiss();

  const takeAndSavePhoto = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync();

      if (!photo) {
        throw new Error("Failed to capture photo.");
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      let location = null;
      if (status === "granted") {
        location = await Location.getCurrentPositionAsync({});
      }

      const timestamp = Date.now();
      const metadata = {
        timestamp,
        location,
      };

      const folderUri = FileSystem.documentDirectory + "MementoBoxPhotos";
      const folderInfo = await FileSystem.getInfoAsync(folderUri);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
      }

      const fileName = `photo_${timestamp}.jpg`;
      const fileUri = `${folderUri}/${fileName}`;
      await FileSystem.copyAsync({ from: photo?.uri, to: fileUri });

      const metadataUri = `${folderUri}/photo_${timestamp}.json`;
      await FileSystem.writeAsStringAsync(
        metadataUri,
        JSON.stringify(metadata)
      );

      useToast("Foto adicionada com sucesso!", "success");

      setTimeout(() => {
        loadPhotosFromFolder();
      }, 1500);
    } catch (e) {
      console.error("Error taking or saving photo:", e);
    }
  };

  const loadPhotosFromFolder = async () => {
    try {
      const folderUri = FileSystem.documentDirectory + "MementoBoxPhotos";
      const folderInfo = await FileSystem.getInfoAsync(folderUri);
      if (!folderInfo.exists) {
        changePhotos([]);
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
      router.dismiss();
    } catch (e) {
      console.error("Error loading photos:", e);
      useToast("Erro ao carregar fotos", "danger");
      changePhotos([]);
    }
  };

  return {
    ...store,
    cameraRef,
    permission,
    facing,
    requestPermission,
    setFacing,
    goBack,
    takeAndSavePhoto,
  };
}
