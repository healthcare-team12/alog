import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/patients/:id — 환자 정보 조회 (비민감 + 민감 조인)
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const row = db.prepare(`
    SELECT
      p.id,
      p.primary_diagnosis AS "primaryDiagnosis",
      p.created_at AS "createdAt",
      s.name,
      s.birth_date AS "birthDate",
      s.gender,
      s.phone
    FROM patients p
    JOIN patient_sensitive s ON s.patient_id = p.id
    WHERE p.id = ?
  `).get(id);

  if (!row) {
    res.status(404).json({ error: '환자를 찾을 수 없습니다.' });
    return;
  }

  res.json(row);
});

export default router;
