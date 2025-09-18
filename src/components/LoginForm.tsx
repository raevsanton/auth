import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import lockIcon from "../assets/lock.svg";
import userIcon from "../assets/user.svg";
import type {
	LoginErrorResponse,
	LoginRequest,
	LoginResponse,
} from "../types/api";
import { ErrorCodes } from "../types/api";
import { BUTTON_VARIANT, Button } from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { Input } from "./Input";
import { Spinner } from "./Spinner";

const loginUser = async (loginData: LoginRequest): Promise<LoginResponse> => {
	await new Promise((resolve) => setTimeout(resolve, 1500));

	const { email, password } = loginData;

	if (email === "wrong@example.com" || password === "wrongpassword") {
		const error: LoginErrorResponse = {
			success: false,
			error: {
				message: "Invalid email or password",
				code: ErrorCodes.INVALID_CREDENTIALS,
			},
		};
		throw error;
	}

	if (email === "invalid@email") {
		const error: LoginErrorResponse = {
			success: false,
			error: {
				message: "Invalid email format",
				code: ErrorCodes.INVALID_EMAIL,
				field: "email",
			},
		};
		throw error;
	}

	if (password === "123") {
		const error: LoginErrorResponse = {
			success: false,
			error: {
				message: "Password is too weak. Use at least 8 characters",
				code: ErrorCodes.WEAK_PASSWORD,
				field: "password",
			},
		};
		throw error;
	}

	if (email === "unverified@example.com") {
		const error: LoginErrorResponse = {
			success: false,
			error: {
				message: "Please verify your email address to sign in",
				code: ErrorCodes.ACCOUNT_NOT_VERIFIED,
			},
		};
		throw error;
	}

	if (email === "network@error.com") {
		const error: LoginErrorResponse = {
			success: false,
			error: {
				message: "Network error. Please check your connection and try again",
				code: ErrorCodes.NETWORK_ERROR,
			},
		};
		throw error;
	}

	if (email === "no2fa@example.com") {
		const error: LoginErrorResponse = {
			success: false,
			error: {
				message:
					"Two-factor authentication code was not confirmed. Please verify your 2FA setup",
				code: ErrorCodes.TWO_FACTOR_CODE_NOT_CONFIRMED,
			},
		};
		throw error;
	}

	return {
		success: true,
		user: {
			id: "1",
			email: "test@example.com",
			name: "Test User",
		},
	};
};

interface LoginFormProps {
	onSuccess: (data: LoginResponse, email: string) => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
	const [apiError, setApiError] = useState<string>("");

	const loginMutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			setApiError("");
			onSuccess(data, formData.email);
		},
		onError: (error: LoginErrorResponse) => {
			if (error?.error?.message) {
				setApiError(error.error.message);
			} else {
				setApiError("An unknown error occurred. Please try again");
			}
		},
		onMutate: () => {
			setApiError("");
		},
	});

	const isFormValid =
		formData.email.trim() !== "" &&
		formData.password.trim() !== "" &&
		isValidEmail(formData.email) &&
		formData.password.length >= 8;
	const isButtonDisabled = !isFormValid || loginMutation.isPending;
	const showEmailError =
		hasTriedSubmit &&
		formData.email.trim() !== "" &&
		!isValidEmail(formData.email);
	const showPasswordError =
		hasTriedSubmit &&
		formData.password.trim() !== "" &&
		formData.password.length < 8;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setHasTriedSubmit(true);

		if (isFormValid) {
			loginMutation.mutate(formData);
		}
	};

	return (
		<div className="w-full">
			<h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
				Sign in to your account to continue
			</h1>

			<form className="space-y-6" onSubmit={handleSubmit}>
				<Input
					type="email"
					placeholder="Email"
					value={formData.email}
					onChange={(e) => {
						setFormData((prev) => ({ ...prev, email: e.target.value }));
						if (apiError) setApiError("");
					}}
					icon={userIcon}
					isValid={!showEmailError}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={formData.password}
					onChange={(e) => {
						setFormData((prev) => ({ ...prev, password: e.target.value }));
						if (apiError) setApiError("");
					}}
					icon={lockIcon}
					isValid={!showPasswordError}
				/>

				{apiError && <ErrorMessage message={apiError} />}

				<Button
					type="submit"
					disabled={isButtonDisabled}
					variant={BUTTON_VARIANT.PRIMARY}
					icon={
						loginMutation.isPending ? (
							<Spinner size="sm" className="text-white" />
						) : undefined
					}
				>
					{loginMutation.isPending ? "Logging" : "Log in"}
				</Button>
			</form>
		</div>
	);
};
