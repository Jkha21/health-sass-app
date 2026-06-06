import { create } from 'zustand';
import {
  Patient,
  PatientFilters,
  PatientStats,
  PatientStatus,
  ViewMode,
  StatusFilter,
} from '../types/patients';

interface PatientStore {
  // ── State ──────────────────────────────────────────────
  patients: Patient[];
  filters: PatientFilters;
  stats: PatientStats;
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;

  // ── Actions ────────────────────────────────────────────
  setSearch: (query: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setViewMode: (view: ViewMode) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  fetchPatients: () => Promise<void>;
}

// ── Static seed data (replace with real API calls) ────────
const INITIAL_PATIENTS: Patient[] = [
  { id: 'P247891', name: 'Sarah Mitchell', initials: 'SM', status: 'urgent',   condition: 'Hypertension',          age: 41, location: 'Bengaluru, KA', nextVisit: 'Mar 25, 2026', doctor: 'Dr. James',  ward: 'Cardiology'  },
  { id: 'P248012', name: 'John Ramirez',   initials: 'JR', status: 'active',   condition: 'Diabetes Type 2',       age: 35, location: 'Mumbai, MH',    nextVisit: 'Mar 26, 2026', doctor: 'Dr. Patel',  ward: 'Endocrine'   },
  { id: 'P248103', name: 'Emma Larson',    initials: 'EL', status: 'pending',  condition: 'Respiratory Infection', age: 28, location: 'Delhi, DL',     nextVisit: 'Mar 27, 2026', doctor: 'Dr. Kumar',  ward: 'Pulmonary'   },
  { id: 'P248204', name: 'Raj Kumar',      initials: 'RK', status: 'complete', condition: 'Osteoarthritis',        age: 52, location: 'Chennai, TN',   nextVisit: 'Apr 02, 2026', doctor: 'Dr. James',  ward: 'Orthopedic'  },
  { id: 'P248305', name: 'Lisa Park',      initials: 'LP', status: 'active',   condition: 'Thyroid Disorder',      age: 44, location: 'Pune, MH',      nextVisit: 'Mar 28, 2026', doctor: 'Dr. Nair',   ward: 'Endocrine'   },
  { id: 'P248406', name: 'Arjun Mehta',    initials: 'AM', status: 'urgent',   condition: 'Coronary Artery',       age: 58, location: 'Hyderabad, TG', nextVisit: 'Mar 20, 2026', doctor: 'Dr. Patel',  ward: 'ICU'         },
  { id: 'P248507', name: 'Priya Sharma',   initials: 'PS', status: 'active',   condition: 'Migraine',              age: 31, location: 'Bengaluru, KA', nextVisit: 'Apr 01, 2026', doctor: 'Dr. Kumar',  ward: 'Neurology'   },
  { id: 'P248608', name: 'David Chen',     initials: 'DC', status: 'pending',  condition: 'Back Pain',             age: 47, location: 'Kolkata, WB',   nextVisit: 'Mar 29, 2026', doctor: 'Dr. James',  ward: 'Orthopedic'  },
];

function computeStats(patients: Patient[]): PatientStats {
  return {
    total:  patients.length,
    active: patients.filter((p) => p.status === 'active').length,
    urgent: patients.filter((p) => p.status === 'urgent').length,
  };
}

// ── Store ─────────────────────────────────────────────────
const usePatientStore = create<PatientStore>((set, get) => ({
  patients:    INITIAL_PATIENTS,
  filters:     { search: '', status: 'all', view: 'grid' },
  stats:       computeStats(INITIAL_PATIENTS),
  sidebarOpen: false,
  loading:     false,
  error:       null,

  setSearch: (query) =>
    set((state) => ({ filters: { ...state.filters, search: query } })),

  setStatusFilter: (status) =>
    set((state) => ({ filters: { ...state.filters, status } })),

  setViewMode: (view) =>
    set((state) => ({ filters: { ...state.filters, view } })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  fetchPatients: async () => {
    try {
      set({ loading: true, error: null });
      // TODO: Replace with real API call, e.g.:
      // const patients = await api.get('/patients')
      await new Promise((r) => setTimeout(r, 300));
      const patients = INITIAL_PATIENTS;
      set({ patients, stats: computeStats(patients), loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load patients', loading: false });
    }
  },
}));

// ── Derived selector: filtered patients ───────────────────
export const selectFilteredPatients = (state: PatientStore): Patient[] => {
  const { patients, filters } = state;
  const q = filters.search.toLowerCase().trim();
  return patients.filter((p) => {
    const matchStatus = filters.status === 'all' || p.status === filters.status;
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.condition.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
    return matchStatus && matchQ;
  });
};

export default usePatientStore;