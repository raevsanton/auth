export interface ApiError {
	message: string;
	code: string;
	field?: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	success: true;
	user: {
		id: string;
		email: string;
		name: string;
	};
}

export interface LoginErrorResponse {
	success: false;
	error: ApiError;
}

export interface TwoFactorRequest {
	email: string;
	code: string;
}

export interface TwoFactorResponse {
	success: true;
	message: string;
}

export interface TwoFactorErrorResponse {
	success: false;
	error: ApiError;
}

export const ErrorCodes = {
	INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
	INVALID_EMAIL: "INVALID_EMAIL",
	WEAK_PASSWORD: "WEAK_PASSWORD",
	ACCOUNT_NOT_VERIFIED: "ACCOUNT_NOT_VERIFIED",
	NETWORK_ERROR: "NETWORK_ERROR",
	INVALID_2FA_CODE: "INVALID_2FA_CODE",
	TWO_FACTOR_CODE_NOT_CONFIRMED: "TWO_FACTOR_CODE_NOT_CONFIRMED",
} as const;
