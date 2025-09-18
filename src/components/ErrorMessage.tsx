import { cn } from "../utils/cn";

interface ErrorMessageProps {
	message?: string;
	className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
	if (!message) return null;

	return (
		<p className={cn("mt-[-10px] mb-2 text-red-500 text-sm", className)}>
			{message}
		</p>
	);
};
