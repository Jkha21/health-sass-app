export type ResultStatus = "normal" | "abnormal" | "critical" | "pending";
export type LabCategory = "haematology" | "biochemistry" | "microbiology" | "immunology" | "endocrinology" | "cardiology";
export type TrendDirection = "up" | "down" | "stable";

export interface LabValue {
  parameter:  string;
  value:      string;
  unit:       string;
  refRange:   string;
  status:     ResultStatus;
  trend?:     TrendDirection;
  prevValue?: string;
}

export interface LabResult {
  id:          string;
  patient:     string;
  initials:    string;
  patientId:   string;
  doctor:      string;
  department:  string;
  category:    LabCategory;
  testName:    string;
  orderedDate: string;
  reportedDate:string;
  status:      ResultStatus;
  priority:    "routine" | "urgent" | "stat";
  lab:         string;
  values:      LabValue[];
  notes?:      string;
  interpretation?: string;
}
