import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { Modal } from "./components/Modal";
import { TwoFactorForm } from "./components/TwoFactorForm";
import type { LoginResponse } from "./types/api";

type AppState = "login" | "2fa";

function App() {
	const [appState, setAppState] = useState<AppState>("login");
	const [loginData, setLoginData] = useState<LoginResponse | null>(null);
	const [userEmail, setUserEmail] = useState<string>("");

	const handleLoginSuccess = (data: LoginResponse, email: string) => {
		setLoginData(data);
		setUserEmail(email);
		setAppState("2fa");
	};

	const handleBackToLogin = () => {
		setAppState("login");
		setLoginData(null);
		setUserEmail("");
	};

	const handle2FASubmit = (code: string) => {
		console.log("2FA Code submitted:", code);
		console.log("Login data:", loginData);
	};

	return (
		<Modal
			showBackButton={appState === "2fa"}
			onBackClick={appState === "2fa" ? handleBackToLogin : undefined}
		>
			{appState === "login" && <LoginForm onSuccess={handleLoginSuccess} />}

			{appState === "2fa" && (
				<TwoFactorForm onSubmit={handle2FASubmit} email={userEmail} />
			)}
		</Modal>
	);
}

export default App;
