import { Router } from 'express';
import db from '../db.js';

const router = Router();

// POST /api/audit — 감사 로그 기록
router.post('/', (req, res) => {
  const { action, doctorName, patientId, details } = req.body;

  if (!action || !doctorName || !details) {
    res.status(400).json({ error: 'action, doctorName, details 필수' });
    return;
  }

  const stmt = db.prepare(
    'INSERT INTO audit_log (timestamp, action, doctor_name, patient_id, details) VALUES (?, ?, ?, ?, ?)'
  );

  const timestamp = new Date().toISOString();
  stmt.run(timestamp, action, doctorName, patientId ?? null, details);

  console.log(`[AUDIT] ${timestamp} | ${action} | 의사: ${doctorName} | ${details}`);

  res.json({ ok: true, timestamp });
});

export default router;
