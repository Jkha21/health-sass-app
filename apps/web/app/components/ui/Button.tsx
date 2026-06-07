import React from 'react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 text-white " +
      "shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-orange-500",

    outline:
      "border-2 border-orange-500 text-orange-600 " +
      "hover:bg-orange-50 focus:ring-orange-200",

    /*
     * ghost — intentionally bare so that any className passed by the
     * consumer fully controls colours, borders, and shadows without
     * fighting against pre-set Tailwind classes.
     */
    ghost: "focus:ring-orange-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm h-10",
    md: "px-6 py-3 text-base h-12",
    lg: "px-8 py-4 text-lg h-14",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}