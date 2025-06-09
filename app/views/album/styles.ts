import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: resizePixel(32, "width"),
    paddingVertical: resizePixel(32, "height"),
    gap: resizePixel(16, "height"),
  },
  photoItem: {
    width: resizePixel(Platform.OS === "android" ? 104 : 110, "width"),
    height: resizePixel(Platform.OS === "android" ? 104 : 110, "height"),
    borderRadius: resizePixel(12),
    resizeMode: "cover",
    marginBottom: resizePixel(16, "height"),
  },
  cameraButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: colors.SECONDARY,
  },
  list: {
    flex: 1,
  },
  columnWrapperStyle: {
    gap: resizePixel(18, "width"),
  },
});

export const style = () => {
  const { cameraButton, photoItem } = styles;

  const dyynamicCameraButton = {
    ...cameraButton,
    ...photoItem,
  };

  return {
    ...styles,
    cameraButton: dyynamicCameraButton,
  };
};
