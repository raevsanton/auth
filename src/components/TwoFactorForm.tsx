import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type {
  TwoFactorErrorResponse,
  TwoFactorRequest,
  TwoFactorResponse,
} from "../types/api";
import { ErrorCodes } from "../types/api";
import { BUTTON_VARIANT, Button } from "./Button";
import { CodeInput } from "./CodeInput";
import { ErrorMessage } from "./ErrorMessage";
import { Spinner } from "./Spinner";

const verify2FACode = async (
  data: TwoFactorRequest,
): Promise<TwoFactorResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { code } = data;

  if (code === "111111") {
    const error: TwoFactorErrorResponse = {
      success: false,
      error: {
        message: "Invalid code",
        code: ErrorCodes.INVALID_2FA_CODE,
      },
    };
    throw error;
  }

  if (code === "000000") {
    const error: TwoFactorErrorResponse = {
      success: false,
      error: {
        message: "Network error. Please check your connection and try again",
        code: ErrorCodes.NETWORK_ERROR,
      },
    };
    throw error;
  }

  return {
    success: true,
    message: "2FA verification successful",
  };
};

interface TwoFactorFormProps {
  email: string;
  onSubmit: (code: string) => void;
}

export const TwoFactorForm = ({ email, onSubmit }: TwoFactorFormProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [apiError, setApiError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const verifyMutation = useMutation({
    mutationFn: verify2FACode,
    onSuccess: () => {
      setApiError("");
      setIsSuccess(true);
      onSubmit(code.join(""));
    },
    onError: (error: TwoFactorErrorResponse) => {
      if (error?.error?.message) {
        setApiError(error.error.message);
      } else {
        setApiError("An unknown error occurred. Please try again");
      }
    },
    onMutate: () => {
      setApiError("");
      setIsSuccess(false);
    },
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (newCode: string[]) => {
    setCode(newCode);
    if (apiError) setApiError("");
    if (isSuccess) setIsSuccess(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGetNewCode = () => {
    setTimeLeft(45);
    setCode(["", "", "", "", "", ""]);
  };

  const handleContinue = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      setTimeLeft(45);
      verifyMutation.mutate({ email, code: fullCode });
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl mt-2 font-semibold text-gray-800 mb-4">
          Two-Factor Authentication
        </h1>
        <p className="text-gray-600 text-lg">
          Enter the 6-digit code from the Google Authenticator app
        </p>
      </div>

      <CodeInput
        code={code}
        onChange={handleCodeChange}
        isSuccess={isSuccess}
        hasError={!!apiError}
        disabled={verifyMutation.isPending}
      />

      {apiError && <ErrorMessage message={apiError} />}

      <div className="h-10 flex flex-col justify-center items-center">
        {isCodeComplete ? (
          <Button
            onClick={
              isSuccess ? () => window.location.reload() : handleContinue
            }
            disabled={verifyMutation.isPending || !!apiError}
            variant={BUTTON_VARIANT.PRIMARY}
            icon={
              verifyMutation.isPending ? (
                <Spinner size="sm" className="text-white" />
              ) : undefined
            }
          >
            {verifyMutation.isPending
              ? "Verifying..."
              : isSuccess
                ? "Done"
                : "Continue"}
          </Button>
        ) : (
          <div className="text-center w-full">
            {timeLeft > 0 ? (
              <span className="text-gray-500">
                Get a new code in {formatTime(timeLeft)}
              </span>
            ) : (
              <Button
                onClick={handleGetNewCode}
                variant={BUTTON_VARIANT.PRIMARY}
              >
                Get new
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
