import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import arrowIcon from "../assets/arrow.svg";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";

interface ModalProps {
	children: ReactNode;
	className?: string;
	showLogo?: boolean;
	showBackButton?: boolean;
	onBackClick?: () => void;
}

export const Modal = ({
	children,
	className,
	showLogo = true,
	showBackButton = false,
	onBackClick,
}: ModalProps) => {
	const modalContent = (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className={cn(
					"relative bg-white rounded-lg shadow-lg w-[440px] h-[372px] p-8 flex flex-col",
					className,
				)}
			>
				<div className="relative flex justify-center items-center mt-10 h-10">
					{showBackButton && (
						<button
							onClick={onBackClick}
							className="absolute left-4 bottom-6 flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer"
						>
							<img src={arrowIcon} alt="Back" className="w-4 h-4" />
						</button>
					)}

					{showLogo && <Logo />}
				</div>
				<div className="flex-1 flex flex-col justify-center">{children}</div>
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
};
