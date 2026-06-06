"use client";

import React from "react";
import { useRouter } from "next/navigation";

/* ─── Types ──────────────────────────────────────────────── */
export type ActiveNavItem =
  | "dashboard" | "patients" | "appointments" | "records"
  | "prescriptions" | "lab-results" | "telehealth"
  | "analytics" | "settings";

interface SidebarProps {
  open:         boolean;
  onClose:      () => void;
  activeItem?:  ActiveNavItem;
  displayName:  string;
  initials:     string;
}

/* ─── Route map ──────────────────────────────────────────── */
const NAV_ROUTES: Record<ActiveNavItem, string> = {
  dashboard:     "/dashboard",
  patients:      "/patients",
  appointments:  "/appointments",
  records:       "/records",
  prescriptions: "/prescriptions",
  "lab-results": "/lab-results",
  telehealth:    "/telehealth",
  analytics:     "/analytics",
  settings:      "/settings",
};

/* ─── Nav data ───────────────────────────────────────────── */
const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { id: "dashboard",    icon: "⬡",  label: "Dashboard",    badge: null  },
      { id: "patients",     icon: "👥", label: "Patients",     badge: "247" },
      { id: "appointments", icon: "📅", label: "Appointments", badge: "14"  },
      { id: "records",      icon: "📋", label: "Records",      badge: null  },
    ],
  },
  {
    label: "Clinical",
    items: [
      { id: "prescriptions", icon: "💊", label: "Prescriptions", badge: null },
      { id: "lab-results",   icon: "🧪", label: "Lab Results",   badge: null },
      { id: "telehealth",    icon: "📞", label: "Telehealth",    badge: null },
    ],
  },
  {
    label: "Insights",
    items: [
      { id: "analytics", icon: "📊", label: "Analytics", badge: null },
      { id: "settings",  icon: "⚙️", label: "Settings",  badge: null },
    ],
  },
] as const;

/* ─── Logo ───────────────────────────────────────────────── */
const LogoSvg = () => (
  <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
    <path d="M15 3L27 9.5V20.5L15 27L3 20.5V9.5L15 3Z" stroke="#e85520" strokeWidth="1.8" fill="none"/>
    <path d="M15 9L21 12.5V19.5L15 23L9 19.5V12.5L15 9Z" fill="#ffd09a" fillOpacity="0.7"/>
  </svg>
);

/* ─── Sidebar ────────────────────────────────────────────── */
export default function Sidebar({
  open,
  onClose,
  activeItem = "dashboard",
  displayName,
  initials,
}: SidebarProps) {
  const router = useRouter();

  const handleNavClick = (id: ActiveNavItem) => {
    router.push(NAV_ROUTES[id]);
    onClose(); // close mobile drawer after navigation
  };

  return (
    <>
      {/* Panel */}
      <aside
        aria-label="Main navigation"
        className={[
          "fixed top-0 left-0 z-[200] h-screen w-60",
          "flex flex-col bg-white border-r border-[#e8c8a8] overflow-y-auto",
          "transition-transform duration-200 ease-[cubic-bezier(.4,0,.2,1)]",
          "-translate-x-full md:translate-x-0",
          open ? "!translate-x-0 shadow-[4px_0_32px_rgba(0,0,0,.15)]" : "",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 pt-5 pb-4 border-b border-[#f3e8d9]">
          <LogoSvg />
          <span className="font-display text-base font-bold text-[#e85520] tracking-[.8px]">
            HEALTHSAAS
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-2 mb-2 text-[10.5px] font-semibold tracking-[1.2px] uppercase text-[#c8a888]">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id as ActiveNavItem)}
                      className={[
                        "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl",
                        "text-sm font-medium text-left transition-all duration-200",
                        isActive
                          ? "bg-orange-500/10 text-[#e85520] font-semibold"
                          : "text-[#8a6650] hover:bg-[#fdf3ec] hover:text-[#e85520]",
                      ].join(" ")}
                    >
                      <span className="w-5 text-center text-[17px] shrink-0">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto min-w-[20px] rounded-full bg-[#e85520] px-1.5 py-px text-center text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-t border-[#f3e8d9] shrink-0">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd09a] to-[#f68540] text-[13px] font-bold text-white">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-[13px] font-semibold text-[#1f2937]">{displayName}</div>
            <div className="text-[11px] text-[#8a6650]">General Practitioner</div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[199] bg-black/45 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}