import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faEyeSlash,
  faSpinner,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AuthService from "../services/AuthService";

// Definisikan tipe data untuk form
interface FormData {
  name?: string; // Opsional, hanya untuk registrasi
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  // Inisialisasi React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset, // Untuk mereset form setelah berpindah tab
  } = useForm<FormData>();
  // Mengubah tab dan mereset form
  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    setMessage("");
    setErrors([]);
    reset(); // Reset form dan error saat berganti tab
  };
  // Fungsi untuk menangani submit form
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setMessage("");
    setErrors([]);

    try {
      if (activeTab === "login") {
        const response = await AuthService.login({
          email: data.email,
          password: data.password,
        });

        console.log("Response: ", response);

        if (response.detail.status === "success") {
          setMessage("Login successful!");
          // Redirect to dashboard
          navigate("/dashboard", { replace: true });
        } else {
          setMessage(response.detail.message);
        }
      } else {
        const response = await AuthService.register({
          name: data.name || "",
          email: data.email,
          password: data.password,
        });

        if (response.status === "success") {
          setMessage("Registration successful! Please login.");
          reset();
          setActiveTab("login");
        } else {
          setMessage(response.message);
          if (response.errors && response.errors.length > 0) {
            setErrors(response.errors);
          }
        }
      }
    } catch (error: any) {
      console.error(`${activeTab} error:`, error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage(
          `${
            activeTab === "login" ? "Login" : "Registration"
          } failed. Please try again.`
        );
      }

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset link would be sent to your email");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-grey-50 rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full mb-3 sm:mb-4">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-grey-50 text-lg sm:text-2xl"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-600 mb-2">
              Aplikasi KIA (Kesehatan Ibu dan Anak) Digital
            </h1>
            <p className="text-grey-600 text-sm sm:text-base">
              Welcome! Please sign in or create an account.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4 sm:mb-6">
            <button
              type="button"
              onClick={() => handleTabChange("login")}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium transition-colors text-sm sm:text-base ${
                activeTab === "login"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-grey-500 hover:text-grey-700"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("register")}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium transition-colors text-sm sm:text-base ${
                activeTab === "register"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-grey-500 hover:text-grey-700"
              }`}
            >
              Register
            </button>{" "}
          </div>

          {/* Message and Error Display */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.includes("successful")
                  ? "bg-success-100 text-success-700 border border-success-200"
                  : "bg-error-100 text-error-700 border border-error-200"
              }`}
            >
              {message}
            </div>
          )}

          {errors.length > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-error-100 text-error-700 border border-error-200">
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form - Menggunakan handleSubmit dari React Hook Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Name Field (Hanya untuk Register) */}
            {activeTab === "register" && (
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-grey-700 mb-2"
                >
                  Name
                </label>
                <div className="absolute left-3 top-9 sm:top-10 text-grey-400">
                  <FontAwesomeIcon icon={faUser} size="sm" />
                </div>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className={`w-full px-8 sm:px-10 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm sm:text-base ${
                    formErrors.name
                      ? "border-error-500 bg-error-100"
                      : "border-grey-300 hover:border-grey-400"
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-error-600">
                    {formErrors.name.message}
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-grey-700 mb-2"
              >
                Email Address
              </label>
              <div className="absolute left-3 top-9 sm:top-10 text-grey-400">
                <FontAwesomeIcon icon={faEnvelope} size="sm" />
              </div>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="you@example.com"
                className={`w-full px-8 sm:px-10 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm sm:text-base ${
                  formErrors.email
                    ? "border-error-500 bg-error-100"
                    : "border-grey-300 hover:border-grey-400"
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs sm:text-sm text-error-600">
                  {formErrors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-grey-700"
                >
                  Password
                </label>
                {activeTab === "login" && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-400">
                  <FontAwesomeIcon icon={faLock} size="sm" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className={`w-full px-8 sm:px-10 py-2 sm:py-3 pr-10 sm:pr-12 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm sm:text-base ${
                    formErrors.password
                      ? "border-error-500 bg-error-100"
                      : "border-grey-300 hover:border-grey-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-500 hover:text-grey-700"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    size="sm"
                  />
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-1 text-xs sm:text-sm text-error-600">
                  {formErrors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium text-grey-50 transition-all text-sm sm:text-base ${
                isLoading
                  ? "bg-grey-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 active:transform active:scale-95"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-spin mr-2"
                    size="sm"
                  />
                  <span className="text-sm sm:text-base">Processing...</span>
                </div>
              ) : activeTab === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-grey-600 text-sm sm:text-base">
              {activeTab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() =>
                  handleTabChange(activeTab === "login" ? "register" : "login")
                }
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {activeTab === "login" ? "Register here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
