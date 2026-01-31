import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients.js';
import visitsRouter from './routes/visits.js';
import auditRouter from './routes/audit.js';
import { seed } from './seed.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 시드 데이터 삽입 (비어있을 때만)
seed();

// 라우트 등록
app.use('/api/patients', patientsRouter);
app.use('/api/patients', visitsRouter);
app.use('/api/audit', auditRouter);

app.listen(PORT, () => {
  console.log(`[SERVER] Express 서버 시작: http://localhost:${PORT}`);
});
