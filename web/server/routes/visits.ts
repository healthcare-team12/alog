import { Router } from 'express';
import db from '../db.js';

const router = Router();

interface VisitRow {
  id: string;
  patient_id: string;
  date: string;
  doctor_name: string;
}

interface SymptomRow {
  name: string;
  severity: string;
  source: string;
}

interface PrescriptionRow {
  drug_name: string;
  dosage: string;
  frequency: string;
  active: number;
}

interface IndicatorRow {
  name: string;
  value: string;
  unit: string;
  trend: string;
}

interface NoteRow {
  content: string;
  source: string;
  timestamp: string;
}

// GET /api/patients/:id/visits — 환자 방문 기록 전체 조회
router.get('/:id/visits', (req, res) => {
  const { id } = req.params;

  const visitRows = db.prepare(
    'SELECT id, patient_id, date, doctor_name FROM visits WHERE patient_id = ? ORDER BY date DESC'
  ).all(id) as VisitRow[];

  if (visitRows.length === 0) {
    res.json([]);
    return;
  }

  const getSymptoms = db.prepare('SELECT name, severity, source FROM symptoms WHERE visit_id = ?');
  const getPrescriptions = db.prepare('SELECT drug_name, dosage, frequency, active FROM prescriptions WHERE visit_id = ?');
  const getIndicators = db.prepare('SELECT name, value, unit, trend FROM indicators WHERE visit_id = ?');
  const getNotes = db.prepare('SELECT content, source, timestamp FROM clinical_notes WHERE visit_id = ? ORDER BY timestamp');

  const visits = visitRows.map((v) => ({
    id: v.id,
    patientId: v.patient_id,
    date: v.date,
    doctorName: v.doctor_name,
    symptoms: (getSymptoms.all(v.id) as SymptomRow[]).map((s) => ({
      name: s.name,
      severity: s.severity,
      source: s.source,
    })),
    prescriptions: (getPrescriptions.all(v.id) as PrescriptionRow[]).map((p) => ({
      drugName: p.drug_name,
      dosage: p.dosage,
      frequency: p.frequency,
      active: p.active === 1,
    })),
    indicators: (getIndicators.all(v.id) as IndicatorRow[]).map((i) => ({
      name: i.name,
      value: i.value,
      unit: i.unit,
      trend: i.trend,
    })),
    notes: (getNotes.all(v.id) as NoteRow[]).map((n) => ({
      content: n.content,
      source: n.source,
      timestamp: n.timestamp,
    })),
  }));

  res.json(visits);
});

export default router;
