import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={`bg-white border border-orange-100 rounded-3xl shadow-[0_12px_40px_rgba(232,85,32,.08)] ${className}`}>
      {children}
    </div>
  );
}
