import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingVertical: resizePixel(28, "height"),
    paddingHorizontal: resizePixel(24, "width"),
    backgroundColor: colors.PRIMARY,
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: colors.GRAY,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: resizePixel(8),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: resizePixel(42, "height"),
    width: resizePixel(42, "width"),
    borderRadius: resizePixel(50),
  },
  textHeaderContent: {
    height: resizePixel(42, "height"),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export const style = (props: {
  textHeaderContent: { paddingHorizontal: boolean };
  header: { height: number | "auto", straight: boolean };
  spacer: { orientation: "vertical" | "horizontal"; size?: number };
}) => {
  const { header, textHeaderContent } = styles;

  const dynamicHeader = {
    ...header,
    height: props.header.height,
    borderBottomLeftRadius: !props.header.straight ? resizePixel(24) : 0,
    borderBottomRightRadius: !props.header.straight ? resizePixel(24) : 0,
  };

  const dynamicTextHeaderContent = {
    ...textHeaderContent,
    paddingRight: resizePixel(
      props.textHeaderContent.paddingHorizontal ? 0 : 80,
      "width"
    ),
  };

  const dynamicSpacer = {
    height: resizePixel(props.spacer.size ?? 0, "height"),
    width: resizePixel(props.spacer.size ?? 0, "width"),
  };

  return {
    ...styles,
    header: dynamicHeader,
    textHeaderContent: dynamicTextHeaderContent,
    spacer: dynamicSpacer,
  };
};
