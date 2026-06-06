import React from "react";

export default function LoginLoading() {
  const backgroundColor = "#0B0806"; 
  const iconColor = "#FFFCF9";

  return (
    <div 
      className="right min-h-screen w-full flex items-center justify-center" 
      style={{ backgroundColor }}
    >
      <div className="box flex flex-col items-center justify-center p-8 text-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Main Dotted Loading Element */}
          <svg
            viewBox="0 0 100 100"
            className="w-24 h-24 animate-pulse"
            style={{ fill: iconColor }}
          >
            <circle cx="50" cy="15" r="4.5" />
            <circle cx="68" cy="20" r="4.5" />
            <circle cx="80" cy="35" r="4.5" />
            <circle cx="82" cy="55" r="4.5" />
            <circle cx="72" cy="72" r="4.5" />
            <circle cx="55" cy="82" r="4.5" />
            <circle cx="35" cy="80" r="4.5" />
            <circle cx="20" cy="68" r="4.5" />
            <circle cx="15" cy="50" r="4.5" />
            <circle cx="22" cy="32" r="4.5" />
            <circle cx="35" cy="18" r="4.5" />
            
            <circle cx="50" cy="40" r="4" />
            <circle cx="50" cy="60" r="4" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 opacity-60 animate-pulse"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </div>
    </div>
  );
}