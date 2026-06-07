"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  return (
    <div
      className={`inline-block ${SIZE_CLASSES[size]} ${className}`}
      style={{
        border: "2px solid rgba(232, 85, 32, 0.2)",
        borderTopColor: "#e85520",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
      aria-hidden="true"
    />
  );
}