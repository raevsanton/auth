import { cn } from "../utils/cn";

interface SpinnerProps {
	className?: string;
	size?: "sm" | "md" | "lg";
}

export const Spinner = ({ className, size = "md" }: SpinnerProps) => {
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
	};

	return (
		<div
			className={cn(
				"animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
				sizeClasses[size],
				className,
			)}
			role="status"
			aria-label="Загрузка"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
};
