import { Dimensions } from "react-native";

export default function resizePixel(
  size: number,
  type?: "width" | "height"
): number {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  let percent: number;
  let total: number;

  switch (type) {
    case "width":
      percent = size / windowWidth;
      total = windowWidth * percent;
      break;
    case "height":
      percent = size / windowHeight;
      total = windowHeight * percent;
      break;

    default:
      percent = (size / windowHeight + size / windowWidth) / 2;
      const media = (windowHeight + windowWidth) / 2;
      total = media * percent;
      break;
  }

  return total;
}
