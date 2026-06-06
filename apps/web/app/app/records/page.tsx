"use client";

import React, { useState, useMemo } from "react";
import AppLayout from "../components/common/AppLayout";
import {
  RecordGridCard,
  RecordListRow,
  RecordModal,
  RecordToolbar,
  RecordTypeFilters,
  RecordStats,
} from "../components/records";
import { MedicalRecord, RecordType, RecordStatus, ViewMode, TYPE_META, STATUS_META } from "../types/records";

/* ─── Mock data ─────────────────────────────────────────── */
const RECORDS: MedicalRecord[] = [
  { id: "R2001", patient: "Sarah Mitchell", initials: "SM", patientId: "P247891", type: "lab", title: "Complete Blood Count", date: "2026-04-10", doctor: "Dr. James Carter", department: "Pathology", status: "abnormal", summary: "WBC elevated at 11.2 × 10⁹/L. Platelets within range. Haemoglobin slightly low.", tags: ["CBC", "Blood", "Haematology"], fileSize: "248 KB", pages: 3 },
  { id: "R2002", patient: "John Ramirez", initials: "JR", patientId: "P248012", type: "imaging", title: "Chest X-Ray Report", date: "2026-04-09", doctor: "Dr. Arun Kumar", department: "Radiology", status: "normal", summary: "No acute cardiopulmonary process. Heart size normal. Lung fields clear.", tags: ["X-Ray", "Chest", "Radiology"], fileSize: "4.2 MB", pages: 2 },
  { id: "R2003", patient: "Emma Larson", initials: "EL", patientId: "P248103", type: "prescription", title: "Antibiotic Course — Amoxicillin", date: "2026-04-11", doctor: "Dr. Arun Kumar", department: "Pulmonology", status: "reviewed", summary: "Amoxicillin 500mg TDS × 7 days. Advised adequate hydration.", tags: ["Antibiotic", "Respiratory"], fileSize: "96 KB", pages: 1 },
  { id: "R2004", patient: "Raj Kumar", initials: "RK", patientId: "P248204", type: "discharge", title: "Post-Op Discharge Summary", date: "2026-04-05", doctor: "Dr. James Carter", department: "Orthopedics", status: "reviewed", summary: "Patient discharged 48hr post knee replacement. Follow-up in 2 weeks. Physio initiated.", tags: ["Surgery", "Ortho", "Post-op"], fileSize: "512 KB", pages: 5 },
  { id: "R2005", patient: "Lisa Park", initials: "LP", patientId: "P248305", type: "lab", title: "Thyroid Function Test", date: "2026-04-12", doctor: "Dr. Meera Nair", department: "Endocrinology", status: "critical", summary: "TSH critically suppressed at 0.01 mU/L. Free T4 markedly elevated. Urgent review required.", tags: ["Thyroid", "TFT", "Urgent"], fileSize: "180 KB", pages: 2 },
  { id: "R2006", patient: "Arjun Mehta", initials: "AM", patientId: "P248406", type: "imaging", title: "ECG — 12 Lead", date: "2026-04-13", doctor: "Dr. Priya Patel", department: "Cardiology", status: "critical", summary: "ST elevation noted in leads II, III, aVF. Inferior STEMI pattern. Immediate cath lab referral.", tags: ["ECG", "STEMI", "Cardiac", "Urgent"], fileSize: "1.1 MB", pages: 1 },
  { id: "R2007", patient: "Priya Sharma", initials: "PS", patientId: "P248507", type: "consultation", title: "Neurology Consultation Note", date: "2026-04-08", doctor: "Dr. Arun Kumar", department: "Neurology", status: "reviewed", summary: "Chronic migraine with aura. MRI head unremarkable. Commenced topiramate prophylaxis.", tags: ["Neurology", "Migraine", "MRI"], fileSize: "320 KB", pages: 4 },
  { id: "R2008", patient: "David Chen", initials: "DC", patientId: "P248608", type: "lab", title: "Lipid Panel", date: "2026-04-07", doctor: "Dr. James Carter", department: "Cardiology", status: "abnormal", summary: "LDL elevated at 4.8 mmol/L. HDL borderline low. Dietary and statin review recommended.", tags: ["Lipids", "Cholesterol", "CVD"], fileSize: "210 KB", pages: 2 },
  { id: "R2009", patient: "Ananya Singh", initials: "AS", patientId: "P248709", type: "vaccination", title: "Influenza Vaccination Record", date: "2026-04-06", doctor: "Dr. Meera Nair", department: "General", status: "reviewed", summary: "Inactivated influenza vaccine (quadrivalent) administered. No adverse reaction observed.", tags: ["Vaccine", "Influenza", "Preventive"], fileSize: "64 KB", pages: 1 },
  { id: "R2010", patient: "Marcus Williams", initials: "MW", patientId: "P248810", type: "imaging", title: "MRI Lumbar Spine", date: "2026-04-03", doctor: "Dr. James Carter", department: "Orthopedics", status: "abnormal", summary: "L4-L5 disc herniation with mild nerve root compression. No cauda equina signs.", tags: ["MRI", "Spine", "Ortho"], fileSize: "18 MB", pages: 8 },
  { id: "R2011", patient: "Fatima Al-Said", initials: "FA", patientId: "P248911", type: "lab", title: "HbA1c & Glucose Panel", date: "2026-04-11", doctor: "Dr. Priya Patel", department: "Endocrinology", status: "pending", summary: "Sample received. Results expected within 24 hours.", tags: ["Diabetes", "HbA1c", "Pending"], fileSize: "—", pages: 0 },
  { id: "R2012", patient: "Tom Bradley", initials: "TB", patientId: "P249012", type: "prescription", title: "Antihypertensive — Amlodipine", date: "2026-04-12", doctor: "Dr. Priya Patel", department: "Cardiology", status: "reviewed", summary: "Amlodipine 5mg OD. Review in 4 weeks. Advised salt restriction and BP monitoring.", tags: ["Hypertension", "CCB", "Cardiac"], fileSize: "88 KB", pages: 1 },
];

/* ─── RecordsPage ────────────────────────────────────────── */
export default function RecordsPage() {
  const [view, setView] = useState<ViewMode>("grid");
  const [searchQ, setSearchQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<RecordType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<RecordStatus | "all">("all");
  const [selected, setSelected] = useState<MedicalRecord | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  /* Stats */
  const criticalCount = RECORDS.filter((r) => r.status === "critical").length;
  const pendingCount = RECORDS.filter((r) => r.status === "pending").length;
  const totalCount = RECORDS.length;
  const recentCount = RECORDS.filter((r) => {
    const d = new Date(r.date);
    const week = new Date();
    week.setDate(week.getDate() - 7);
    return d >= week;
  }).length;

  /* Filtered list */
  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase().trim();
    return RECORDS.filter((r) => {
      const matchQ =
        !q ||
        r.patient.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.doctor.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      const matchT = typeFilter === "all" || r.type === typeFilter;
      const matchS = statusFilter === "all" || r.status === statusFilter;
      return matchQ && matchT && matchS;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [searchQ, typeFilter, statusFilter]);

  return (
    <AppLayout
      title="Records"
      activeItem="records"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Records" }]}
    >
      {/* ══ Hero ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="pointer-events-none absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/[.06]" />
        <span className="pointer-events-none absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/[.04]" />
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1">
            Medical Records
          </h1>
          <p className="text-sm text-white/75">
            {totalCount} total records · {criticalCount} critical · {pendingCount} pending
          </p>
        </div>
        <RecordStats
          totalCount={totalCount}
          recentCount={recentCount}
          criticalCount={criticalCount}
          pendingCount={pendingCount}
        />
      </div>

      {/* ══ Toolbar ═════════════════════════════════════════ */}
      <RecordToolbar
        searchQ={searchQ}
        setSearchQ={setSearchQ}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        view={view}
        setView={setView}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filteredCount={filtered.length}
      />

      {/* ══ Type quick-filters ══════════════════════════════ */}
      <RecordTypeFilters
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* ══ Empty state ════════════════════════════════════ */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#e8c8a8]">
          <div className="text-5xl mb-4">🗂️</div>
          <div className="font-display text-lg font-bold text-gray-800 mb-1">No records found</div>
          <div className="text-sm text-orange-800/50">Try adjusting your search or filters</div>
        </div>
      )}

      {/* ══ Grid view ══════════════════════════════════════ */}
      {filtered.length > 0 && view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((r, i) => (
            <RecordGridCard key={r.id} rec={r} idx={i} onSelect={setSelected} />
          ))}
        </div>
      )}

      {/* ══ List view ══════════════════════════════════════ */}
      {filtered.length > 0 && view === "list" && (
        <div>
          {/* Header — hidden on mobile */}
          <div
            className="hidden sm:grid px-5 py-2.5 text-[11.5px] font-semibold text-orange-800/50 tracking-[.5px] uppercase mb-1"
            style={{ gridTemplateColumns: "1fr 150px 150px 130px 120px" }}
          >
            <span>Record</span>
            <span>Patient</span>
            <span className="hidden lg:block">Doctor</span>
            <span className="hidden md:block">Date</span>
            <span className="text-right">Actions</span>
          </div>
          {filtered.map((r, i) => (
            <RecordListRow key={r.id} rec={r} idx={i} onSelect={setSelected} />
          ))}
        </div>
      )}

      {/* ══ Detail modal ═══════════════════════════════════ */}
      {selected && (
        <RecordModal rec={selected} onClose={() => setSelected(null)} />
      )}
    </AppLayout>
  );
}