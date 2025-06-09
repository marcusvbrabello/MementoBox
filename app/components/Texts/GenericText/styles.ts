import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import typography from "@theme/typography";
import { StyleSheet } from "react-native";
import {
    fontMap,
    GenericTextProps,
    lineHeightMap,
    sizeMap,
    TextDecorationProps,
} from "./types";

const styles = StyleSheet.create({
  textStyle: {},
});

export const style = ({
  font,
  size,
  color,
  lineHeight,
  textDecoration,
  align,
}: GenericTextProps) => {
  const { textStyle } = styles;

  const dynamicTextStyle = {
    ...textStyle,
    fontFamily: font ? fontMap[font] : typography.FONT.REGULAR,
    textDecorationLine: textDecoration as TextDecorationProps,
    textAlign: align,
    fontSize: resizePixel(
      size ? sizeMap[size] : typography.SIZE.MEDIUM,
      "width"
    ),
    color: color || colors.GRAY_900,
    lineHeight: resizePixel(lineHeightMap[lineHeight || "MEDIUM"], "height"),
  };

  return {
    textStyle: dynamicTextStyle,
  };
};
