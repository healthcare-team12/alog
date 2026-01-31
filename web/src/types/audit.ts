export interface AuditLogEntry {
  timestamp: string;
  action: 'search' | 'view' | 'view_records';
  doctorName: string;
  patientId?: string;
  query?: string;
  details: string;
}
