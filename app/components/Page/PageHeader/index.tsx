import { GenericText } from "@components/Texts/GenericText";
import colors from "@theme/colors";
import React from "react";
import { View } from "react-native";
import { style } from "./styles";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  const { spacer } = style({ spacer: { orientation: "vertical", size: 4 } });

  return (
    <>
      <GenericText
        text={title}
        align="left"
        size="EXTRA_MEDIUM"
        font="SEMI_BOLD"
        lineHeight="MID_LARGE"
      />
      {description && (
        <>
          <View style={spacer} />

          <GenericText
            color={colors.GRAY_400}
            text={description}
            align="left"
            size="SUB_MEDIUM"
            lineHeight="SUB_MEDIUM"
            font="REGULAR"
          />
        </>
      )}
    </>
  );
}
