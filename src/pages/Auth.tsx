import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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
          alert("Login successful! Redirecting to dashboard...");
          // TODO: Redirect to dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-full mb-4">
              <FontAwesomeIcon icon={faHeart} className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-pink-600 mb-2">
              Aplikasi KIA Digital
            </h1>
            <p className="text-gray-600">
              Welcome! Please sign in or create an account.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => handleTabChange("login")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "login"
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("register")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "register"
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-500 hover:text-gray-700"
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
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {errors.length > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form - Menggunakan handleSubmit dari React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field (Hanya untuk Register) */}
            {activeTab === "register" && (
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <div className="absolute left-3 top-10 text-gray-400">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className={`w-full px-10 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${
                    formErrors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.name.message}
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="absolute left-3 top-10 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} />
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
                className={`w-full px-10 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${
                  formErrors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                {activeTab === "login" && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faLock} />
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
                  className={`w-full px-10 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${
                    formErrors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit" // Ubah menjadi 'submit'
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700 active:transform active:scale-95"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" />
                  Processing...
                </div>
              ) : activeTab === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {activeTab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() =>
                  handleTabChange(activeTab === "login" ? "register" : "login")
                }
                className="text-pink-600 hover:text-pink-700 font-medium"
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
