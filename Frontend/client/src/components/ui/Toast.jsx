import React from "react";

const Toast = ({ message, type = "success" }) => {
  if (!message) return null;

  const colorClasses =
    type === "success"
      ? "border-green-100 bg-green-50 text-green-700"
      : "border-red-100 bg-red-50 text-red-600";

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className={`rounded-2xl border px-4 py-3 text-sm shadow-lg ${colorClasses}`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
