import { create } from 'zustand';
import {
  Period,
  PeriodDataset,
  AnalyticsMetric,
  DiagnosisRow,
  DonutSegment,
} from '../types/analytics';

interface AnalyticsStore {
  // ── State ──────────────────────────────────────────────
  period: Period;
  datasets: Record<Period, PeriodDataset>;
  metrics: AnalyticsMetric[];
  diagnoses: DiagnosisRow[];
  donutData: DonutSegment[];
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;

  // ── Actions ────────────────────────────────────────────
  setPeriod: (period: Period) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  fetchAnalyticsData: () => Promise<void>;
}

// ── Static seed data (replace with real API calls) ────────
const PERIOD_DATASETS: Record<Period, PeriodDataset> = {
  7: {
    labels:    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    volume:    [65, 59, 80, 81, 56, 42, 38],
    volPrev:   [58, 52, 70, 74, 48, 35, 30],
    billed:    [12000, 19000, 15000, 22000, 18000, 11000, 9000],
    collected: [11000, 17500, 14000, 20000, 16500, 10200, 8500],
    types: {
      general:    [22, 18, 28, 30, 20, 12, 10],
      followUp:   [25, 22, 30, 28, 18, 16, 14],
      specialist: [12, 10, 14, 15, 11,  8,  7],
      telehealth: [ 6,  9,  8,  8,  7,  6,  7],
    },
  },
  30: {
    labels:    ['W1','W2','W3','W4'],
    volume:    [320, 288, 341, 297],
    volPrev:   [298, 275, 310, 280],
    billed:    [72000, 84000, 91000, 78000],
    collected: [66000, 77000, 83000, 72000],
    types: {
      general:    [110, 100, 120, 105],
      followUp:   [120, 108, 130, 112],
      specialist: [ 55,  48,  62,  52],
      telehealth: [ 35,  32,  29,  28],
    },
  },
  90: {
    labels:    ['Jan','Feb','Mar'],
    volume:    [1024, 1140, 1246],
    volPrev:   [ 920, 1020, 1124],
    billed:    [280000, 320000, 340000],
    collected: [256000, 295000, 313000],
    types: {
      general:    [360, 400, 420],
      followUp:   [430, 465, 500],
      specialist: [150, 180, 200],
      telehealth: [ 84,  95, 126],
    },
  },
  365: {
    labels:    ['Q1','Q2','Q3','Q4'],
    volume:    [3200, 3540, 3280, 3820],
    volPrev:   [2900, 3200, 3100, 3500],
    billed:    [900000, 1020000,  980000, 1100000],
    collected: [830000,  940000,  906000, 1015000],
    types: {
      general:    [1100, 1200, 1100, 1280],
      followUp:   [1350, 1500, 1400, 1620],
      specialist: [ 490,  560,  520,  620],
      telehealth: [ 260,  280,  260,  300],
    },
  },
};

const INITIAL_METRICS: AnalyticsMetric[] = [
  { icon: '👥', change: '↑ 12%',   changeClass: 'change-up',      value: '247',    label: 'Total Patients',   sub: 'vs 220 last period'   },
  { icon: '📊', change: '↑ 3.2%',  changeClass: 'change-up',      value: '92%',    label: 'Records Complete', sub: 'vs 89.1% last period'  },
  { icon: '💰', change: '↑ 8%',    changeClass: 'change-up',      value: '$28.4K', label: 'Monthly Revenue',  sub: 'vs $26.3K last period' },
  { icon: '⏱️', change: '↓ 2 min', changeClass: 'change-down',    value: '18m',    label: 'Avg Wait Time',    sub: 'vs 20 min last period' },
];

const INITIAL_DIAGNOSES: DiagnosisRow[] = [
  { name: 'Hypertension',          patients: 58, pct: 23, trend: 'up'      },
  { name: 'Type 2 Diabetes',       patients: 44, pct: 18, trend: 'up'      },
  { name: 'Upper Respiratory',     patients: 37, pct: 15, trend: 'down'    },
  { name: 'Anxiety / Depression',  patients: 29, pct: 12, trend: 'up'      },
  { name: 'Musculoskeletal Pain',  patients: 22, pct:  9, trend: 'neutral' },
];

const INITIAL_DONUT: DonutSegment[] = [
  { label: 'Completed', value: 120, color: '#e85520' },
  { label: 'Scheduled', value:  80, color: '#f68540' },
  { label: 'Follow-up', value:  32, color: '#ffd09a' },
  { label: 'No-show',   value:  15, color: '#c8a888' },
];

// ── Store ─────────────────────────────────────────────────
const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  period:      7,
  datasets:    PERIOD_DATASETS,
  metrics:     INITIAL_METRICS,
  diagnoses:   INITIAL_DIAGNOSES,
  donutData:   INITIAL_DONUT,
  sidebarOpen: false,
  loading:     false,
  error:       null,

  setPeriod: (period) => set({ period }),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  fetchAnalyticsData: async () => {
    try {
      set({ loading: true, error: null });
      // TODO: Replace with real API calls, e.g.:
      // const [metrics, diagnoses, donut] = await Promise.all([...])
      await new Promise((r) => setTimeout(r, 300));
      set({
        metrics:   INITIAL_METRICS,
        diagnoses: INITIAL_DIAGNOSES,
        donutData: INITIAL_DONUT,
        loading:   false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load analytics data', loading: false });
    }
  },
}));

// ── Derived selector: active period dataset ───────────────
export const selectCurrentDataset = (state: AnalyticsStore): PeriodDataset =>
  state.datasets[state.period];

export default useAnalyticsStore;