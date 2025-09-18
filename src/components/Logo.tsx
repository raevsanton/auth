import { cn } from "../utils/cn";

interface LogoProps {
	className?: string;
	showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
	return (
		<div className={cn("flex items-center space-x-3", className)}>
			<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
				<div className="w-4 h-4 bg-white rounded-full flex items-center justify-center"></div>
			</div>
			{showText && (
				<span className="text-lg font-semibold text-gray-800">Company</span>
			)}
		</div>
	);
};
