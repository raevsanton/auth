import type React from "react";
import { BUTTON_VARIANT } from "./types";

type ButtonProps = React.ComponentProps<"button"> & {
	variant?: BUTTON_VARIANT;
	icon?: React.ReactNode;
	iconClassName?: string;
};

const variantClasses = {
	[BUTTON_VARIANT.PRIMARY]:
		"bg-[#1677FF] border-none text-white hover:bg-[#0056D6] disabled:bg-black/[0.04] disabled:text-gray-400 disabled:border disabled:border-[#D9D9D9]",
	[BUTTON_VARIANT.SECONDARY]: null,
};

const baseClass =
	"py-3 px-4 rounded-lg disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200 font-medium w-full cursor-pointer";

export const Button = ({
	children,
	className = "",
	variant = BUTTON_VARIANT.PRIMARY,
	icon,
	iconClassName = "mr-2",
	...props
}: ButtonProps) => {
	return (
		<button
			className={`${baseClass} ${variantClasses[variant]} ${className}`}
			{...props}
		>
			{icon && <span className={`${iconClassName} block h-5 w-5`}>{icon}</span>}
			{children}
		</button>
	);
};
