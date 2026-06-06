// ─── Common Components — Barrel Export ────────────────────
//
// Usage:
//   import AppLayout            from '@/components/common';
//   import { Sidebar, Topbar }  from '@/components/common';
//   import type { ActiveNavItem } from '@/components/common';

export { default }                  from "./AppLayout";
export { default as AppLayout }     from "./AppLayout";
export { default as Sidebar }       from "./Sidebar";
export { default as Topbar }        from "./Topbar";
export type { ActiveNavItem }       from "./Sidebar";