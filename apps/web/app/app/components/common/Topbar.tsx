"use client";

import React, { FC } from "react";
import NotificationBell from "../notifications/Notifications";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface TopbarProps {
  title: string;
  initials: string;
  firstName: string;
  onMenuClick: () => void;
  onSignOut: () => void;
  breadcrumbs?: BreadcrumbItem[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

/* ─── SVGs ───────────────────────────────────────────────── */
const MenuSvg: FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    stroke="#e85520"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="2" y1="4.5" x2="16" y2="4.5" />
    <line x1="2" y1="9" x2="16" y2="9" />
    <line x1="2" y1="13.5" x2="16" y2="13.5" />
  </svg>
);

const SearchSvg: FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c8a888"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* ─── Topbar ─────────────────────────────────────────────── */
const Topbar: FC<TopbarProps> = ({
  title,
  initials,
  firstName,
  onMenuClick,
  onSignOut,
  breadcrumbs = [],
  showSearch = false,
  searchPlaceholder = "Search patients, records…",
  onSearchChange,
}) => (
  <header className="sticky top-0 z-[100] flex h-16 shrink-0 items-center gap-4 border-b border-[#f3e8d9] bg-white px-6 shadow-[0_2px_12px_rgba(232,85,32,.07)]">
    {/* Hamburger — mobile only */}
    <button
      aria-label="Toggle menu"
      onClick={onMenuClick}
      className="flex md:hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e8c8a8] transition-all hover:bg-[#fdf3ec] hover:border-[#e85520]"
    >
      <MenuSvg />
    </button>

    {/* Title + breadcrumbs */}
    <div className="flex flex-1 items-center gap-3 min-w-0">
      <span className="font-display text-[17px] font-bold text-[#1f2937] whitespace-nowrap">
        {title}
      </span>
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="hidden sm:flex items-center gap-1.5 text-[13px] text-[#8a6650]"
        >
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span>/</span>
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="font-medium text-[#e85520] hover:opacity-75 transition-opacity bg-transparent border-none"
                >
                  {crumb.label}
                </button>
              ) : (
                <span>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
    </div>

    {/* Search */}
    {showSearch && (
      <div className="hidden sm:flex flex-1 max-w-[360px] items-center gap-2 rounded-xl border border-[#e8c8a8] bg-[#fdf8f2] px-3.5 py-2 transition-all focus-within:border-[#e85520] focus-within:ring-2 focus-within:ring-[#e85520]/10">
        <SearchSvg />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange?.(e.target.value)
          }
          aria-label={searchPlaceholder}
          className="w-full bg-transparent border-none outline-none text-[13.5px] text-[#1f2937] placeholder:text-[#c8a888]"
        />
      </div>
    )}

    {/* Right actions */}
    <div className="flex items-center gap-2.5 shrink-0">
      {/* Live notification bell */}
      <NotificationBell />

      {/* User chip */}
      <div className="flex items-center gap-2 rounded-full border border-[#e8c8a8] bg-[#fdf3ec] pl-1 pr-3 py-1 cursor-pointer transition-all hover:border-[#e85520]">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd09a] to-[#f68540] text-xs font-bold text-white">
          {initials}
        </div>
        <span className="hidden sm:block text-[13px] font-semibold text-[#1f2937]">
          {firstName}
        </span>
      </div>

      {/* Sign out */}
      <button
        onClick={onSignOut}
        className="hidden sm:block px-4 py-2 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-[13px] font-semibold whitespace-nowrap transition-all hover:bg-[#e85520] hover:text-white hover:border-[#e85520]"
      >
        Sign Out
      </button>
    </div>
  </header>
);

export default Topbar;
