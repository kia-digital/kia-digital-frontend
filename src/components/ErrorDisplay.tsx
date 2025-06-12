import React from "react";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = "Terjadi Kesalahan",
  message,
  error,
  onRetry,
  className = "",
}) => {
  const errorMessage =
    message || error?.message || "Terjadi kesalahan yang tidak diketahui";

  return (
    <div
      className={`bg-white rounded-xl p-8 shadow-sm border border-red-200 ${className}`}
    >
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>

        <p className="text-red-600 mb-4">{errorMessage}</p>

        <div className="text-sm text-gray-500 mb-6">
          <p>Kemungkinan penyebab:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Koneksi internet terputus</li>
            <li>Server sedang mengalami gangguan</li>
            <li>Token autentikasi tidak valid</li>
          </ul>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
