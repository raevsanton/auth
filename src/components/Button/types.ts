export const BUTTON_VARIANT = {
	PRIMARY: "PRIMARY",
	SECONDARY: "SECONDARY",
} as const;

export type BUTTON_VARIANT =
	(typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
