"use client";

import React, { useEffect } from "react";
import AppLayout from "../components/common/AppLayout";
import { ActiveNavItem } from "../components/common";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  activeItem?: ActiveNavItem;
}

export default function DashboardErrorBoundary({
  error,
  reset,
  title = "Dashboard Error",
  activeItem = "dashboard",
}: ErrorProps) {
  
  useEffect(() => {
    console.error("Caught Dashboard Route Error:", error);
  }, [error]);

  return (
    <AppLayout
      title={title}
      activeItem={activeItem}
      breadcrumbs={[{ label: "Overview" }, { label: "System Error" }]}
    >
      <div className="flex items-center justify-center min-h-[450px] p-6 text-center">
        <div className="max-w-md bg-white rounded-2xl border border-red-100 p-8 shadow-sm flex flex-col items-center">
          
          {/* Danger/Warning Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">
            Failed to load dashboard workspace
          </h2>
          
          {/* Subtle Context Message */}
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            We encountered a temporary issue while assembling your central command widgets. No data has been lost. Please attempt to reset the session or perform a fresh workspace load below.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold font-display text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:opacity-95 shadow-md transition-all duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold font-display text-orange-600 border border-orange-200 bg-white hover:bg-orange-50/50 transition-all duration-200"
            >
              Hard Refresh
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}