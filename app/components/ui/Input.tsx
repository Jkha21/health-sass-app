"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 outline-none text-[13.5px] text-gray-800 placeholder:text-[#c8a888] w-full ${className}`}
      {...props}
    />
  );
}
