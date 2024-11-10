"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AlertProps {
  button: React.ReactNode; // Can be a string, number, React element, etc.
}
const Alert: React.FC<AlertProps> = ({button}) => {
  const notify = () => toast("Wow so easy!", { position: "bottom-right" });
  return (
    <div>
      <div onClick={notify}>{button}</div>
      <ToastContainer />
    </div>
  );
};

export default Alert;
