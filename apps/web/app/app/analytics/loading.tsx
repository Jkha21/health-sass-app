// app/analytics/loading.tsx
import React from "react";
import AppLayout from "../components/common/AppLayout";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <AppLayout
      title="Analytics"
      activeItem="analytics"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Analytics" }]}
    >
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          {/* Reusing your custom UI Spinner */}
          <LoadingSpinner size="lg" />
          <p className="text-orange-800/60 font-medium animate-pulse">
            Loading analytics data...
          </p>
        </div>
      </div>
    </AppLayout>
  );
}