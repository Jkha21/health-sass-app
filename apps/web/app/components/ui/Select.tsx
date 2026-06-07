"use client";
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: React.ReactNode;
}

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 outline-none text-[13.5px] text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
