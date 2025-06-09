import React, { memo } from "react";
import { Text } from "react-native";
import { style } from "./styles";
import { GenericTextProps } from "./types";

export const GenericText = memo(function GenericText(props: GenericTextProps) {
	const { text, children } = props;

	const { textStyle } = style(props);

	return <Text style={textStyle}>{text || children}</Text>;
});
