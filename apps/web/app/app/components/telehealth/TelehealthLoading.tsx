"use client";

import { LoadingSpinner } from "../ui/LoadingSpinner";

export default function TelehealthLoading() {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6">
        <span className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/[.07]" />
        <div className="relative z-10">
          <div className="h-8 w-40 bg-white/20 rounded-lg mb-3 animate-pulse" />
          <div className="h-4 w-96 bg-white/10 rounded-lg animate-pulse max-w-md" />
        </div>
      </div>

      {/* Stat Badges Skeleton */}
      <div className="flex gap-3 flex-wrap mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-4 py-2.5 min-w-[80px] h-[80px] animate-pulse"
          />
        ))}
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-200 rounded-xl shrink-0 animate-pulse"
          />
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-5 py-3.5 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[160px] h-10 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-10 w-40 bg-gray-200 rounded-[10px] animate-pulse" />
          <div className="h-10 w-24 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl animate-pulse hidden sm:block" />
        </div>
      </div>

      {/* Session Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-5 h-32 animate-pulse"
          />
        ))}
      </div>

      {/* Center Loading Spinner */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 rounded-2xl">
        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-orange-800/60 font-medium">Loading telehealth sessions...</p>
        </div>
      </div>
    </div>
  );
}