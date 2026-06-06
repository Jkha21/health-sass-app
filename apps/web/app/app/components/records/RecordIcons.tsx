export const SearchSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8a888" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export const GridSvg = ({ active }: { active: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill={active ? "#fff" : "currentColor"}>
    <rect x="0" y="0" width="6" height="6" rx="1.5"/>
    <rect x="10" y="0" width="6" height="6" rx="1.5"/>
    <rect x="0" y="10" width="6" height="6" rx="1.5"/>
    <rect x="10" y="10" width="6" height="6" rx="1.5"/>
  </svg>
);

export const ListSvgIcon = ({ active }: { active: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={active ? "#fff" : "currentColor"} strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="3" x2="15" y2="3"/><line x1="4" y1="8" x2="15" y2="8"/><line x1="4" y1="13" x2="15" y2="13"/>
    <circle cx="1.5" cy="3" r="1" fill={active ? "#fff" : "currentColor"}/>
    <circle cx="1.5" cy="8" r="1" fill={active ? "#fff" : "currentColor"}/>
    <circle cx="1.5" cy="13" r="1" fill={active ? "#fff" : "currentColor"}/>
  </svg>
);

export const DownloadSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export const FileSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

export const PlusSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const FilterSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);