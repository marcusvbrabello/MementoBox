import resizePixel from "@functions/resizePixel";

export const style = (props: {
  spacer: { orientation: "vertical" | "horizontal"; size?: number };
}) => {
  const dynamicSpacer = {
    ...(props.spacer.orientation === "vertical"
      ? { height: resizePixel(props.spacer.size ?? 0, "height") }
      : { width: resizePixel(props.spacer.size ?? 0, "width") }),
  };

  return {
    spacer: dynamicSpacer,
  };
};
