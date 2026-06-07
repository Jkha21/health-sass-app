import React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
  children: React.ReactNode;
}

const variants = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-600",
};

export function Badge({ variant = "default", className = "", children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
