import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'clinic.db');

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    primary_diagnosis TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS patient_sensitive (
    patient_id TEXT PRIMARY KEY REFERENCES patients(id),
    name TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    gender TEXT NOT NULL,
    phone TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS visits (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL REFERENCES patients(id),
    date TEXT NOT NULL,
    doctor_name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS symptoms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id TEXT NOT NULL REFERENCES visits(id),
    name TEXT NOT NULL,
    severity TEXT NOT NULL,
    source TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id TEXT NOT NULL REFERENCES visits(id),
    drug_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS indicators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id TEXT NOT NULL REFERENCES visits(id),
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    unit TEXT NOT NULL,
    trend TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS clinical_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id TEXT NOT NULL REFERENCES visits(id),
    content TEXT NOT NULL,
    source TEXT NOT NULL,
    timestamp TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    action TEXT NOT NULL,
    doctor_name TEXT NOT NULL,
    patient_id TEXT,
    details TEXT NOT NULL
  );
`);

export default db;
