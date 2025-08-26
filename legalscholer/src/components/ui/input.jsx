import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
}
