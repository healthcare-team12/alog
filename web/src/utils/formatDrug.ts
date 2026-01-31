import type { Prescription } from '../types/patient';

export function formatDrug(rx: Prescription): string {
  return `${rx.drugName} ${rx.dosage} (${rx.frequency})`;
}
