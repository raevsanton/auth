import { cn } from "../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder?: string;
	classNames?: {
		label?: string;
		input?: string;
	};
	icon?: string;
	isValid?: boolean;
}

export const Input = ({
	label,
	placeholder,
	classNames,
	icon,
	isValid = true,
	...props
}: InputProps) => {
	return (
		<>
			{label && (
				<label className={cn("mb-2 block", classNames?.label)}>{label}</label>
			)}
			<div className="relative">
				{icon && (
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<img src={icon} alt="" className="h-5 w-5 text-gray-400" />
					</div>
				)}
				<input
					{...props}
					placeholder={placeholder}
					className={cn(
						"w-full border rounded-lg focus:ring-1 outline-none transition-colors placeholder-gray-400",
						icon ? "pl-10 pr-4 py-3" : "p-2",
						!isValid
							? "border-red-500 focus:ring-red-500 focus:border-transparent"
							: "border-[#D9D9D9] focus:ring-[#1677FF] focus:border-transparent",
						classNames?.input,
					)}
				/>
			</div>
		</>
	);
};
