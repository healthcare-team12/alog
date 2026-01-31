export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // 항상 '1회'
  period?: string;
  memo?: string;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  medicationTaken: boolean | null; // null=미응답, true=복용, false=미복용
  surveyCompleted: boolean;
  surveyResponses?: SurveyResponse;
}

export interface WeeklyRecord {
  day: string;
  date: string;
  status: 'complete' | 'partial' | 'incomplete';
}

export interface ConditionBadge {
  label: string;
  status: 'good' | 'normal' | 'bad';
  description: string;
}

export interface SymptomDataPoint {
  day: string;
  value: number; // 1-5
}

export interface SymptomLine {
  label: string;
  color: string;
  data: SymptomDataPoint[];
}

export interface SurveyQuestion {
  id: number;
  question: string;
  options: SurveyOption[];
}

export interface SurveyOption {
  value: number; // 1, 2, 3
  label: string;
  description: string;
}

export interface SurveyResponse {
  date: string;
  answers: Record<number, number>; // questionId -> value
  completedAt: string;
}

export interface NotificationSettings {
  morningTime: string; // HH:mm
  afternoonTime: string; // HH:mm
  enabled: boolean;
}

export interface MedicationRecord {
  date: string;
  taken: boolean;
  recordedAt: string;
}

export interface UserProfile {
  nickname: string;
  avatar?: string;
}
