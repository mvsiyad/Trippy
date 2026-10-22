import React from "react";

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-notification show" id="toastNotification">
      <div className="toast-icon">
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <div className="toast-message" id="toastMessage">
        {message}
      </div>
    </div>
  );
};
