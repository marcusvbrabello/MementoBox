import typography from "@theme/typography";

export const fontMap = {
	THIN: typography.FONT.THIN,
	EXTRA_LIGHT: typography.FONT.EXTRA_LIGHT,
	LIGHT: typography.FONT.LIGHT,
	REGULAR: typography.FONT.REGULAR,
	MEDIUM: typography.FONT.MEDIUM,
	SEMI_BOLD: typography.FONT.SEMI_BOLD,
	BOLD: typography.FONT.BOLD,
	EXTRA_BOLD: typography.FONT.EXTRA_BOLD,
	BLACK: typography.FONT.BLACK,
};

export const sizeMap = {
	SMALL: typography.SIZE.SMALL,
	SMALL_MEDIUM: typography.SIZE.SMALL_MEDIUM,
	SUB_MEDIUM: typography.SIZE.SUB_MEDIUM,
	MEDIUM: typography.SIZE.MEDIUM,
	LARGE: typography.SIZE.LARGE,
	EXTRA_LARGE: typography.SIZE.EXTRA_LARGE,
	HUGE: typography.SIZE.HUGE,
	VERY_HUGE: typography.SIZE.VERY_HUGE,
	EXTRA_SMALL: typography.SIZE.EXTRA_SMALL,
	MID_MEDIUM: typography.SIZE.MID_MEDIUM,
	EXTRA_MEDIUM: typography.SIZE.EXTRA_MEDIUM,
	MID_LARGE: typography.SIZE.MID_LARGE,
};

export const lineHeightMap = {
	SMALL: typography.LINEHEIGHT.SMALL,
	SUB_MEDIUM: typography.LINEHEIGHT.SUB_MEDIUM,
	MEDIUM: typography.LINEHEIGHT.MEDIUM,
	LARGE: typography.LINEHEIGHT.LARGE,
	EXTRA_LARGE: typography.LINEHEIGHT.EXTRA_LARGE,
	HUGE: typography.LINEHEIGHT.HUGE,
	VERY_HUGE: typography.LINEHEIGHT.VERY_HUGE,
	EXTRA_SMALL: typography.LINEHEIGHT.EXTRA_SMALL,
	MID_MEDIUM: typography.LINEHEIGHT.MID_MEDIUM,
	EXTRA_MEDIUM: typography.LINEHEIGHT.EXTRA_MEDIUM,
	MID_LARGE: typography.LINEHEIGHT.MID_LARGE,
};

export interface GenericTextProps {
	font?: keyof typeof fontMap;
	size?: keyof typeof sizeMap;
	color?: string;
	lineHeight?: keyof typeof lineHeightMap;
	textDecoration?: string;
	text?: string | null;
	children?: React.ReactNode;
	align?: "left" | "center" | "right" | "justify";
	[key: string]: any;
}

export type TextDecorationProps =
	| "none"
	| "underline"
	| "line-through"
	| "underline line-through"
	| undefined;