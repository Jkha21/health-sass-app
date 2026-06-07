"use client";

import React, { useState, useEffect } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { useAuthActions } from "../../hooks/useAuthActions";
import Sidebar, { ActiveNavItem } from "./Sidebar";
import Topbar from "./Topbar";

/* ─── Types ──────────────────────────────────────────────── */
interface AppLayoutProps {
  title: string;
  activeItem?: ActiveNavItem;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  children: React.ReactNode;
}

/* ─── Helpers ────────────────────────────────────────────── */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ─── AppLayout ──────────────────────────────────────────── */
export default function AppLayout({
  title,
  activeItem,
  breadcrumbs = [],
  showSearch = false,
  searchPlaceholder,
  onSearchChange,
  children,
}: AppLayoutProps) {
  const { user } = useAuthStore();
  const { signOut } = useAuthActions();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const displayName = user?.displayName ?? "Doctor";
  const firstName = displayName.split(" ")[0];
  const initials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-[#fdeede] font-sans text-[#4a4a4a] antialiased w-full max-w-full overflow-hidden">
      <div className="flex min-h-screen w-full max-w-full">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeItem}
          displayName={displayName}
          initials={initials}
        />

        <div className="flex flex-col flex-1 min-h-screen w-full max-w-full min-w-0 overflow-x-hidden ml-0 md:ml-60 transition-[margin] duration-200">
          <Topbar
            title={title}
            initials={initials}
            firstName={firstName}
            onMenuClick={() => setSidebarOpen((o) => !o)}
            onSignOut={signOut}
            breadcrumbs={breadcrumbs}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={onSearchChange}
          />
          
          <main className="flex-1 w-full max-w-full min-w-0 px-4 py-6 sm:p-5 md:p-7 block">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}