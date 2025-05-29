// src/components/Modal.tsx
import React, { type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  overlayOpacity?: number; // 0–100, defaults to 50
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  overlayOpacity = 50,
}) => {
  if (!isOpen) return null;

  // Convert 0–100 to 0.0–1.0
  const opacityValue = overlayOpacity / 100;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacityValue})` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
