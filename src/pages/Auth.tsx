import React, { useState } from "react";
import type { ChangeEvent, FormEvent, ReactElement } from "react";

// Interface for the AppIcon props (if any were needed)
interface AppIconProps {}

// Placeholder for an icon, you can replace this with an actual SVG or an icon library
const AppIcon: React.FC<AppIconProps> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

// Interface for the return type of useFormInput
interface FormInputHook {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

// Custom hook for form input handling with TypeScript
const useFormInput = (initialValue: string): FormInputHook => {
  const [value, setValue] = useState<string>(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return { value, onChange: handleChange, setValue };
};

// Interface for the message state
interface MessageState {
  text: string;
  type: "error" | "success" | "";
}

export default function Auth(): ReactElement {
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<MessageState>({ text: "", type: "" });

  // Login form states
  const loginEmail = useFormInput("");
  const loginPassword = useFormInput("");

  // Registration form states
  const registerName = useFormInput("");
  const registerEmail = useFormInput("");
  const registerPassword = useFormInput("");
  const confirmPassword = useFormInput("");

  const showMessage = (
    text: string,
    type: "error" | "success" = "error",
    duration: number = 3000
  ): void => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, duration);
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!loginEmail.value || !loginPassword.value) {
      showMessage("Please fill in all login fields.");
      return;
    }
    console.log("Login submitted:", {
      email: loginEmail.value,
      password: loginPassword.value,
    });
    showMessage(
      `Login attempt with ${loginEmail.value}. Check console. (Implement actual login logic)`,
      "success"
    );
    loginEmail.setValue("");
    loginPassword.setValue("");
  };

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      !registerName.value ||
      !registerEmail.value ||
      !registerPassword.value ||
      !confirmPassword.value
    ) {
      showMessage("Please fill in all registration fields.");
      return;
    }
    if (registerPassword.value !== confirmPassword.value) {
      showMessage("Passwords do not match!");
      return;
    }
    console.log("Registration submitted:", {
      name: registerName.value,
      email: registerEmail.value,
      password: registerPassword.value,
    });
    showMessage(
      `Registration attempt for ${registerName.value}. Check console. (Implement actual registration logic)`,
      "success"
    );
    registerName.setValue("");
    registerEmail.setValue("");
    registerPassword.setValue("");
    confirmPassword.setValue("");
  };

  const commonInputClasses: string =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300 placeholder-gray-400";
  const commonButtonClasses: string =
    "w-full bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105";

  return (
    // Added font-poppins to the main div and ensured body has it too.
    <div className="bg-pink-50 flex items-center justify-center min-h-screen p-4 selection:bg-pink-200 selection:text-pink-800 font-poppins">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Import Poppins font */
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

        body {
          font-family: "Poppins", sans-serif; /* Apply Poppins to body */
        }

        .form-container::before {
          content: "";
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          background-color: #fce7f3; /* pink-100 */
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.7;
          z-index: -1;
        }
        /* Ensure Tailwind's font-poppins class works if defined in tailwind.config.js */
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
      `,
        }}
      />

      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md relative form-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-pink-600 p-3 rounded-full mb-3 shadow-md">
            <AppIcon />
          </div>
          <h1 className="text-2xl font-bold text-pink-700">My Health App</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome! Please sign in or create an account.
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md text-sm text-center ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-6 flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 px-2 text-center font-semibold focus:outline-none transition-colors duration-300 ${
              activeForm === "login"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500 hover:text-pink-500"
            }`}
            onClick={() => {
              setActiveForm("login");
              setMessage({ text: "", type: "" });
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 px-2 text-center font-semibold focus:outline-none transition-colors duration-300 ${
              activeForm === "register"
                ? "text-pink-600 border-b-2 border-pink-600"
                : "text-gray-500 hover:text-pink-500"
            }`}
            onClick={() => {
              setActiveForm("register");
              setMessage({ text: "", type: "" });
            }}
          >
            Register
          </button>
        </div>

        {activeForm === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="loginEmail"
                name="loginEmail"
                required
                className={commonInputClasses}
                placeholder="you@example.com"
                value={loginEmail.value}
                onChange={loginEmail.onChange}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="loginPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-pink-600 hover:text-pink-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                required
                className={commonInputClasses}
                placeholder="••••••••"
                value={loginPassword.value}
                onChange={loginPassword.onChange}
              />
            </div>
            <div>
              <button type="submit" className={commonButtonClasses}>
                Sign In
              </button>
            </div>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-pink-600 hover:text-pink-500 hover:underline"
                onClick={() => {
                  setActiveForm("register");
                  setMessage({ text: "", type: "" });
                }}
              >
                Register here
              </button>
            </p>
          </form>
        )}

        {activeForm === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="registerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="registerName"
                name="registerName"
                required
                className={commonInputClasses}
                placeholder="Your Name"
                value={registerName.value}
                onChange={registerName.onChange}
              />
            </div>
            <div>
              <label
                htmlFor="registerEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="registerEmail"
                name="registerEmail"
                required
                className={commonInputClasses}
                placeholder="you@example.com"
                value={registerEmail.value}
                onChange={registerEmail.onChange}
              />
            </div>
            <div>
              <label
                htmlFor="registerPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="registerPassword"
                name="registerPassword"
                required
                className={commonInputClasses}
                placeholder="Create a strong password"
                value={registerPassword.value}
                onChange={registerPassword.onChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className={commonInputClasses}
                placeholder="Confirm your password"
                value={confirmPassword.value}
                onChange={confirmPassword.onChange}
              />
            </div>
            <div>
              <button type="submit" className={commonButtonClasses}>
                Create Account
              </button>
            </div>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-pink-600 hover:text-pink-500 hover:underline"
                onClick={() => {
                  setActiveForm("login");
                  setMessage({ text: "", type: "" });
                }}
              >
                Login here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
