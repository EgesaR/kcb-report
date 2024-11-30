import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the toast
export interface Toast {
  message: string;
  type: "success" | "error" | "info";
}

// Define the context's properties
export interface ToastContextProps {
  showToast: (toast: Toast) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Render ToastContainer or similar here */}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
