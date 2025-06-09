export interface Colors {
	PRIMARY: string;
	SECONDARY: string;
	GRAY_900: string;
	GRAY_500: string;
	GRAY_400: string;
	GRAY_200: string;
	GRAY_100: string;
	GRAY_75: string;
	GRAY_50: string;
	GRAY: string;
	SUCCESS: string;
	WARN: string;
	ERROR: string;
	WHITE: string;
	BLACK: string;
}

type Sizes = {
    EXTRA_SMALL: number,
    SMALL: number,
    SMALL_MEDIUM: number,
    MID_MEDIUM: number,
    SUB_MEDIUM: number,
    MEDIUM: number,
    EXTRA_MEDIUM: number,
    LARGE: number,
    MID_LARGE: number,
    EXTRA_LARGE: number,
    HUGE: number,
    VERY_HUGE: number,
}

type LineHeights = {
    EXTRA_SMALL: number,
    SMALL: number,
    MID_MEDIUM: number,
    SUB_MEDIUM: number,
    MEDIUM: number,
    EXTRA_MEDIUM: number,
    LARGE: number,
    MID_LARGE: number,
    EXTRA_LARGE: number,
    HUGE: number,
    VERY_HUGE: number,
}

type Fonts = {
    THIN: string,
    EXTRA_LIGHT: string,
    LIGHT: string,
    REGULAR: string,
    MEDIUM: string,
    SEMI_BOLD: string,
    BOLD: string,
    EXTRA_BOLD: string,
    BLACK: string,
}

export type Typography = {
    SIZE: Sizes;
    LINEHEIGHT: LineHeights;
    FONT: Fonts;
}
