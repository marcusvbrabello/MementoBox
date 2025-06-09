import resizePixel from "@functions/resizePixel";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: resizePixel(16, "width"),
    paddingVertical: resizePixel(16, "height"),
    gap: resizePixel(4, "height"),
  },
  scrollView: {
    flex: 1,
  },
  photo: {
    width: "100%",
    height: resizePixel(600, "height"),
    resizeMode: "cover",
  },
});

export const style = () => {
  return styles;
};
