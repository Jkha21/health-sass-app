import { create } from 'zustand';
import {
  DashboardPatient,
  DashboardAlert,
  ScheduleItem,
  DashboardStats,
  PatientStatus,
} from '../types/dashboard';

interface DashboardStore {
  // ── State ──────────────────────────────────────────────
  patients: DashboardPatient[];
  alerts: DashboardAlert[];
  schedule: ScheduleItem[];
  stats: DashboardStats;
  activeTab: PatientStatus | 'all';
  searchQuery: string;
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;

  // ── Actions ────────────────────────────────────────────
  setActiveTab: (tab: PatientStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  fetchDashboardData: () => Promise<void>;
}

// ── Static seed data (replace with real API calls) ────────
const INITIAL_PATIENTS: DashboardPatient[] = [
  { initials: 'SM', name: 'Sarah Mitchell', age: 42, reason: 'Blood Pressure Review',  time: '10:30 AM', status: 'active'   },
  { initials: 'JR', name: 'John Ramirez',   age: 56, reason: 'Follow-up Consultation', time: '11:00 AM', status: 'pending'  },
  { initials: 'EL', name: 'Emma Larson',    age: 31, reason: 'Urgent Review',           time: '2:15 PM',  status: 'priority' },
  { initials: 'RK', name: 'Raj Kumar',      age: 48, reason: 'Diabetes Check',          time: '9:00 AM',  status: 'complete' },
  { initials: 'LP', name: 'Lisa Park',      age: 27, reason: 'Annual Checkup',          time: '9:45 AM',  status: 'complete' },
];

const INITIAL_ALERTS: DashboardAlert[] = [
  { level: 'urgent',  title: 'Emma Larson — Critical',  sub: 'Lab results require immediate review', time: 'Now'    },
  { level: 'warning', title: 'Medication Renewal',       sub: '3 patients pending prescription',      time: '1h ago' },
  { level: 'info',    title: 'Lab Report Ready',         sub: 'John Ramirez — blood panel',           time: '2h ago' },
];

const INITIAL_SCHEDULE: ScheduleItem[] = [
  { time: '2:15', name: 'Emma Larson',  type: 'Urgent Review · Room 3',        status: 'now'      },
  { time: '3:00', name: 'Michael Chen', type: 'Cardiology Follow-up · Room 1', status: 'upcoming' },
  { time: '3:45', name: 'Priya Sharma', type: 'Diabetes Review · Room 2',      status: 'upcoming' },
  { time: '4:30', name: 'Tom Bradley',  type: 'Annual Physical · Room 4',      status: 'upcoming' },
  { time: '5:15', name: 'Nadia Okafor', type: 'Telehealth · Video Call',       status: 'upcoming' },
];

const INITIAL_STATS: DashboardStats = {
  activePatients: 247,
  appointments:   14,
  priorityAlerts: 2,
  completedToday: 9,
};

// ── Store ─────────────────────────────────────────────────
const useDashboardStore = create<DashboardStore>((set, get) => ({
  patients:    INITIAL_PATIENTS,
  alerts:      INITIAL_ALERTS,
  schedule:    INITIAL_SCHEDULE,
  stats:       INITIAL_STATS,
  activeTab:   'all',
  searchQuery: '',
  sidebarOpen: false,
  loading:     false,
  error:       null,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  fetchDashboardData: async () => {
    try {
      set({ loading: true, error: null });
      // TODO: Replace with real API calls, e.g.:
      // const [patients, alerts, schedule, stats] = await Promise.all([...])
      // Simulating async fetch with seed data for now
      await new Promise((r) => setTimeout(r, 300));
      set({
        patients: INITIAL_PATIENTS,
        alerts:   INITIAL_ALERTS,
        schedule: INITIAL_SCHEDULE,
        stats:    INITIAL_STATS,
        loading:  false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load dashboard data', loading: false });
    }
  },
}));

// ── Derived selector: filtered patients ───────────────────
export const selectFilteredPatients = (state: DashboardStore): DashboardPatient[] => {
  const { patients, activeTab, searchQuery } = state;
  const q = searchQuery.toLowerCase().trim();
  return patients.filter((p) => {
    const matchTab = activeTab === 'all' || p.status === activeTab;
    const matchQ   = !q || p.name.toLowerCase().includes(q);
    return matchTab && matchQ;
  });
};

export default useDashboardStore;