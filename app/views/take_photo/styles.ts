import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.BLACK,
    width: "100%",
    height: resizePixel(Platform.OS === "ios" ? 108 : 80, "height"),
    flexDirection: "row",
    paddingHorizontal: resizePixel(16, "width"),
    alignItems: "center",
    justifyContent: "space-around",
  },
  cameraButton: {
    width: resizePixel(60, "width"),
    height: resizePixel(60, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: resizePixel(52),
    backgroundColor: colors.WHITE,
  },
  flex: {
    flex: 1
  }
});

export const style = () => {
  return styles;
};
