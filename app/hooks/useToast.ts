import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import { Dimensions } from "react-native";
import { Toast } from "react-native-toast-notifications";

const { width } = Dimensions.get("screen");

const useToast = (
  title: string,
  type: "success" | "danger" | "info" = "success",
  duration: number = 3000,
  placement?: "top" | "bottom",
  onPress?: () => void
) => {
  Toast.show(title, {
    type,
    duration,
    placement: placement || "bottom",
    animationType: "slide-in",
    successColor: colors.SUCCESS,
    dangerColor: colors.ERROR,
    normalColor: colors.PRIMARY,
    style: {
      minWidth: width - resizePixel(32),
      borderRadius: 16,
      height: resizePixel(64, "height"),
      paddingHorizontal: resizePixel(16),
    },

    onPress: onPress || undefined,
  });
};

export default useToast;
