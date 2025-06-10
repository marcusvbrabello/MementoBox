import { Toast } from "react-native-toast-notifications";
import useToast from "../../app/hooks/useToast";
import colors from "../../app/theme/colors";

jest.mock("react-native-toast-notifications", () => ({
  Toast: { show: jest.fn() },
}));
jest.mock("../../app/functions/resizePixel", () => jest.fn((val) => val));
jest.mock("../../app/theme/colors", () => ({
  SUCCESS: "#22C55E",
  ERROR: "#BF130D",
  PRIMARY: "#3A86FF",
}));
jest.mock("react-native", () => ({
  Dimensions: { get: () => ({ width: 400 }) },
}));

describe("useToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows toast with default values", () => {
    useToast("Hello");
    expect(Toast.show).toHaveBeenCalledWith(
      "Hello",
      expect.objectContaining({
        type: "success",
        duration: 3000,
        placement: "bottom",
        animationType: "slide-in",
        successColor: colors.SUCCESS,
        dangerColor: colors.ERROR,
        normalColor: colors.PRIMARY,
        onPress: undefined,
      })
    );
  });

  it("shows toast with custom values", () => {
    const onPress = jest.fn();
    useToast("Test", "danger", 5000, "top", onPress);
    expect(Toast.show).toHaveBeenCalledWith(
      "Test",
      expect.objectContaining({
        type: "danger",
        duration: 5000,
        placement: "top",
        onPress,
      })
    );
  });

  it("applies correct style values", () => {
    useToast("Styled");
    const call = (Toast.show as jest.Mock).mock.calls[0][1];
    expect(call.style).toMatchObject({
      minWidth: 400 - 32,
      borderRadius: 16,
      height: 64,
      paddingHorizontal: 16,
    });
  });
});
