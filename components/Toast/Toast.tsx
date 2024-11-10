// Toast.tsx
import React from "react";
import { Toast as ToastType } from "./ToastContext";

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const baseStyles =
    "flex items-center p-4 rounded-md shadow-lg mb-3 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105";

  const typeStyles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-600 text-black",
  };

  const handleRemove = () => onClose(toast.id);

  return (
    <div
      className={`${baseStyles} ${typeStyles[toast.type]} animate-fadeIn`}
      onClick={handleRemove}
    >
      <span className="mr-2">{toast.message}</span>
      <button
        onClick={handleRemove}
        className="ml-auto text-white hover:text-gray-300"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
