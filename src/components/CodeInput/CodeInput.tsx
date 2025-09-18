import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

interface CodeInputProps {
	code: string[];
	onChange: (code: string[]) => void;
	isSuccess: boolean;
	hasError: boolean;
	disabled?: boolean;
}

export const CodeInput = ({
	code,
	onChange,
	isSuccess,
	hasError,
	disabled = false,
}: CodeInputProps) => {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	useEffect(() => {
		if (!disabled) {
			inputRefs.current[0]?.focus();
		}
	}, [disabled]);

	const handleInputChange = (index: number, value: string) => {
		if (!/^\d*$/.test(value) || disabled) return;

		const newCode = [...code];
		newCode[index] = value;
		onChange(newCode);

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (disabled) return;

		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		if (disabled) return;

		e.preventDefault();
		const pastedData = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, 6);
		const newCode = Array.from({ length: 6 }, (_, i) => pastedData[i] || "");
		onChange(newCode);

		let lastFilledIndex = -1;
		for (let i = newCode.length - 1; i >= 0; i--) {
			if (newCode[i] !== "") {
				lastFilledIndex = i;
				break;
			}
		}
		const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
		inputRefs.current[focusIndex]?.focus();
	};

	return (
		<div className="flex justify-center gap-3 mb-6">
			{code.map((digit, index) => (
				<input
					key={index}
					ref={(el) => {
						inputRefs.current[index] = el;
					}}
					type="text"
					inputMode="numeric"
					maxLength={1}
					value={digit}
					disabled={disabled}
					onChange={(e) => handleInputChange(index, e.target.value)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					onPaste={handlePaste}
					className={cn(
						"w-16 h-18 text-center text-xl font-semibold border-1 rounded-lg focus:outline-none focus:ring-1 transition-colors focus:border-transparent",
						disabled && "bg-gray-100 cursor-not-allowed",
						isSuccess && "border-green-500 focus:ring-green-500",
						hasError && "border-red-500 focus:ring-red-500",
						!isSuccess &&
							!hasError &&
							digit &&
							"border-[#1677FF] focus:ring-[#1677FF]",
						!isSuccess &&
							!hasError &&
							!digit &&
							"border-gray-300 focus:ring-[#1677FF]",
					)}
				/>
			))}
		</div>
	);
};
