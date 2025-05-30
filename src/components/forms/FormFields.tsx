// src/components/forms/FormFields.tsx
import React from "react";
import type { SelectOption } from "../../pages/Pemeriksaan/types";

interface InputFieldProps {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  optional = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}{" "}
      {optional && <span className="text-xs text-gray-500">(Opsional)</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
      required={required}
    />
    {required && !value && (
      <p className="text-xs text-red-500 mt-0.5">wajib di isi</p>
    )}
  </div>
);

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  optional = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}{" "}
      {optional && <span className="text-xs text-gray-500">(Opsional)</span>}
    </label>
    <select
      name={name}
      id={name}
      value={value || ""}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
      required={required}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {required && !value && (
      <p className="text-xs text-red-500 mt-0.5">wajib di isi</p>
    )}
  </div>
);

interface DatePickerProps {
  label: string;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  min?: string;
  max?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  optional = false,
  min,
  max,
}) => {
  // Format tanggal untuk display yang lebih readable
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}{" "}
        {optional && <span className="text-xs text-gray-500">(Opsional)</span>}
      </label>

      <div className="relative">
        <input
          type="date"
          name={name}
          id={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          min={min}
          max={max}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          required={required}
        />

        {/* Calendar icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Display formatted date */}
      {value && (
        <p className="text-xs text-gray-600 mt-1">{formatDisplayDate(value)}</p>
      )}

      {required && !value && (
        <p className="text-xs text-red-500 mt-0.5">wajib di isi</p>
      )}
    </div>
  );
};
