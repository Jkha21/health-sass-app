export type ResetFlowState = "form" | "success" | "expired";

export interface Leaf {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  color: string;
}

export const LEAF_COLORS = ["#c04018", "#d05030", "#e07040", "#b82808", "#d04828"];

export const STRENGTH_LEVELS = [
  { text: "Weak", color: "#e05252", count: 1 },
  { text: "Fair", color: "#e09040", count: 2 },
  { text: "Good", color: "#c8c030", count: 3 },
  { text: "Strong", color: "#52c87a", count: 4 },
];