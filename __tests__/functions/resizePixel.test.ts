import resizePixel from "@functions/resizePixel";
import { Dimensions } from "react-native";

jest.mock("react-native", () => ({
  Dimensions: {
    get: jest.fn(),
  },
}));

describe("resizePixel", () => {
  beforeEach(() => {
    // @ts-ignore
    Dimensions.get.mockImplementation((type: string) => {
      if (type === "screen") {
        return { width: 400, height: 800 };
      }
      return { width: 0, height: 0 };
    });
  });

  it("should resize based on width", () => {
    expect(resizePixel(100, "width")).toBe(100);
  });

  it("should resize based on height", () => {
    expect(resizePixel(200, "height")).toBe(200);
  });

  it("should resize using default", () => {
    expect(resizePixel(100)).toBe(112.5);
  });
});