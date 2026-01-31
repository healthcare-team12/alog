import { Medication } from '../types';

export interface ValidationErrors {
  name?: string;
  dosage?: string;
}

export function validateMedication(medication: Partial<Medication>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!medication.name || medication.name.trim().length === 0) {
    errors.name = '약 이름을 입력해주세요';
  }

  if (!medication.dosage || medication.dosage.trim().length === 0) {
    errors.dosage = '용량을 입력해주세요';
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
