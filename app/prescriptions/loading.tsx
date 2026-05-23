// app/records/loading.tsx
import React from "react";
import AppLayout from "../components/common/AppLayout";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <AppLayout
      title="Prescriptions"
      activeItem="prescriptions"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Prescriptions" }]}
    >
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          {/* Reusing your custom UI Spinner */}
          <LoadingSpinner size="lg" />
          <p className="text-orange-800/60 font-medium animate-pulse">
            Loading prescriptions...
          </p>
        </div>
      </div>
    </AppLayout>
  );
}