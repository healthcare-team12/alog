export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  gender: '남' | '여';
  primaryDiagnosis: string;
  phone: string;
}

export interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  source: 'patient' | 'doctor';
}

export interface Prescription {
  drugName: string;
  dosage: string;
  frequency: string;
  active: boolean;
}

export interface Indicator {
  name: string;
  value: string;
  unit: string;
  trend: 'improved' | 'worsened' | 'unchanged';
}

export interface ClinicalNote {
  content: string;
  source: 'patient' | 'doctor';
  timestamp: string;
}

export interface Visit {
  id: string;
  patientId: string;
  date: string;
  symptoms: Symptom[];
  prescriptions: Prescription[];
  indicators: Indicator[];
  notes: ClinicalNote[];
  doctorName: string;
}

export interface ChangeItem {
  field: string;
  description: string;
  type: 'improved' | 'worsened' | 'unchanged';
}

export interface ClinicalSummary {
  patient: Patient;
  visits: Visit[];
  activePrescriptions: Prescription[];
  recentChanges: ChangeItem[];
  lastVisitDate: string;
}
