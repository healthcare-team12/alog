import AsyncStorage from '@react-native-async-storage/async-storage';
import { Medication, MedicationRecord, SurveyResponse } from '../types';
import { SEED_MEDICATIONS } from '../constants/mockData';

const KEYS = {
  MEDICATIONS: '@alog/medications',
  MEDICATION_RECORDS: '@alog/medication_records',
  SURVEY_RESPONSES: '@alog/survey_responses',
  INITIALIZED: '@alog/initialized',
};

// --- Medications ---

export async function initializeMedications(): Promise<void> {
  const initialized = await AsyncStorage.getItem(KEYS.INITIALIZED);
  if (!initialized) {
    await AsyncStorage.setItem(KEYS.MEDICATIONS, JSON.stringify(SEED_MEDICATIONS));
    await AsyncStorage.setItem(KEYS.INITIALIZED, 'true');
  }
}

export async function getMedications(): Promise<Medication[]> {
  await initializeMedications();
  const data = await AsyncStorage.getItem(KEYS.MEDICATIONS);
  return data ? JSON.parse(data) : [];
}

export async function getMedicationById(id: string): Promise<Medication | null> {
  const medications = await getMedications();
  return medications.find((m) => m.id === id) ?? null;
}

export async function updateMedication(updated: Medication): Promise<void> {
  const medications = await getMedications();
  const index = medications.findIndex((m) => m.id === updated.id);
  if (index !== -1) {
    medications[index] = updated;
    await AsyncStorage.setItem(KEYS.MEDICATIONS, JSON.stringify(medications));
  }
}

// --- Medication Records (복용 여부) ---

function getMedicationRecordKey(date: string): string {
  return `${KEYS.MEDICATION_RECORDS}/${date}`;
}

export async function getMedicationRecord(date: string): Promise<MedicationRecord | null> {
  const data = await AsyncStorage.getItem(getMedicationRecordKey(date));
  return data ? JSON.parse(data) : null;
}

export async function saveMedicationRecord(record: MedicationRecord): Promise<void> {
  await AsyncStorage.setItem(getMedicationRecordKey(record.date), JSON.stringify(record));
}

// --- Survey Responses ---

function getSurveyKey(date: string): string {
  return `${KEYS.SURVEY_RESPONSES}/${date}`;
}

export async function getSurveyResponse(date: string): Promise<SurveyResponse | null> {
  const data = await AsyncStorage.getItem(getSurveyKey(date));
  return data ? JSON.parse(data) : null;
}

export async function saveSurveyResponse(response: SurveyResponse): Promise<void> {
  await AsyncStorage.setItem(getSurveyKey(response.date), JSON.stringify(response));
}

// 설문 응답 삭제
export async function deleteSurveyResponse(date: string): Promise<void> {
  await AsyncStorage.removeItem(getSurveyKey(date));
}

// 특정 날짜의 기록 상태 계산
export async function getDayRecordStatus(date: string): Promise<'complete' | 'partial' | 'incomplete'> {
  const medRecord = await getMedicationRecord(date);
  const surveyResponse = await getSurveyResponse(date);

  const medRecorded = medRecord !== null;
  const surveyComplete = surveyResponse !== null;

  if (medRecorded && surveyComplete) return 'complete';
  if (medRecorded || surveyComplete) return 'partial';
  return 'incomplete';
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
