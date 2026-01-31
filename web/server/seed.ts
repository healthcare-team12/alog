import db from './db.js';

export function seed() {
  const patientCount = db.prepare('SELECT COUNT(*) as cnt FROM patients').get() as { cnt: number };
  if (patientCount.cnt > 0) return;

  const insertPatient = db.prepare('INSERT INTO patients (id, primary_diagnosis, created_at) VALUES (?, ?, ?)');
  const insertSensitive = db.prepare('INSERT INTO patient_sensitive (patient_id, name, birth_date, gender, phone) VALUES (?, ?, ?, ?, ?)');
  const insertVisit = db.prepare('INSERT INTO visits (id, patient_id, date, doctor_name) VALUES (?, ?, ?, ?)');
  const insertSymptom = db.prepare('INSERT INTO symptoms (visit_id, name, severity, source) VALUES (?, ?, ?, ?)');
  const insertPrescription = db.prepare('INSERT INTO prescriptions (visit_id, drug_name, dosage, frequency, active) VALUES (?, ?, ?, ?, ?)');
  const insertIndicator = db.prepare('INSERT INTO indicators (visit_id, name, value, unit, trend) VALUES (?, ?, ?, ?, ?)');
  const insertNote = db.prepare('INSERT INTO clinical_notes (visit_id, content, source, timestamp) VALUES (?, ?, ?, ?)');

  const transaction = db.transaction(() => {
    // ── 환자 1: 김지훈 (ADHD 복합형) ──
    insertPatient.run('A20250001', 'ADHD 복합형', '2024-06-10');
    insertSensitive.run('A20250001', '김지훈', '2015-03-22', '남', '010-1111-2222');

    // 방문 1 (최근)
    insertVisit.run('V001', 'A20250001', '2025-01-15', '정민호');
    insertSymptom.run('V001', '집중력 저하', 'moderate', 'patient');
    insertSymptom.run('V001', '과잉행동', 'mild', 'patient');
    insertSymptom.run('V001', '수면 문제', 'mild', 'patient');
    insertPrescription.run('V001', '메틸페니데이트 서방정(콘서타)', '27mg', '1일 1회 아침', 1);
    insertPrescription.run('V001', '멜라토닌', '2mg', '취침 전', 1);
    insertIndicator.run('V001', 'K-ARS 점수', '18', '점', 'improved');
    insertIndicator.run('V001', 'CGI-S', '3', '점', 'improved');
    insertIndicator.run('V001', 'ADHD-RS 점수', '22', '점', 'improved');
    insertNote.run('V001', '학교에서 수업 집중이 좀 나아졌다고 합니다. 숙제도 혼자 하려고 노력해요.', 'patient', '2025-01-15T09:00:00');
    insertNote.run('V001', 'K-ARS 점수 개선 추세. 콘서타 27mg 유지. 수면 위해 멜라토닌 추가. 3개월 후 재평가.', 'doctor', '2025-01-15T09:30:00');

    // 방문 2
    insertVisit.run('V002', 'A20250001', '2024-10-10', '정민호');
    insertSymptom.run('V002', '집중력 저하', 'severe', 'patient');
    insertSymptom.run('V002', '과잉행동', 'moderate', 'patient');
    insertSymptom.run('V002', '충동성', 'moderate', 'doctor');
    insertSymptom.run('V002', '수면 문제', 'moderate', 'patient');
    insertPrescription.run('V002', '메틸페니데이트 서방정(콘서타)', '18mg', '1일 1회 아침', 0);
    insertIndicator.run('V002', 'K-ARS 점수', '28', '점', 'worsened');
    insertIndicator.run('V002', 'CGI-S', '4', '점', 'unchanged');
    insertIndicator.run('V002', 'ADHD-RS 점수', '30', '점', 'worsened');
    insertNote.run('V002', '수업 시간에 자리를 자꾸 이탈한다고 선생님이 연락했어요. 밤에 잠을 못 자요.', 'patient', '2024-10-10T10:00:00');
    insertNote.run('V002', '증상 악화. 콘서타 18mg에서 27mg으로 증량 예정. 행동치료 병행 권고.', 'doctor', '2024-10-10T10:30:00');

    // 방문 3
    insertVisit.run('V003', 'A20250001', '2024-06-10', '정민호');
    insertSymptom.run('V003', '집중력 저하', 'severe', 'patient');
    insertSymptom.run('V003', '과잉행동', 'severe', 'patient');
    insertSymptom.run('V003', '충동성', 'moderate', 'doctor');
    insertPrescription.run('V003', '메틸페니데이트 서방정(콘서타)', '18mg', '1일 1회 아침', 1);
    insertIndicator.run('V003', 'K-ARS 점수', '32', '점', 'unchanged');
    insertIndicator.run('V003', 'CGI-S', '4', '점', 'unchanged');
    insertIndicator.run('V003', 'ADHD-RS 점수', '34', '점', 'unchanged');
    insertNote.run('V003', '학교에서 집중을 전혀 못하고 친구들과 다툼이 잦아요.', 'patient', '2024-06-10T14:00:00');
    insertNote.run('V003', 'ADHD 복합형 초진. K-ARS 32점. 콘서타 18mg 처방 시작. 부모교육 시행.', 'doctor', '2024-06-10T14:30:00');

    // ── 환자 2: 이서연 (ADHD 주의력결핍 우세형) ──
    insertPatient.run('A20250002', 'ADHD 주의력결핍 우세형', '2024-05-20');
    insertSensitive.run('A20250002', '이서연', '2013-08-14', '여', '010-3333-4444');

    insertVisit.run('V004', 'A20250002', '2025-01-20', '김수진');
    insertSymptom.run('V004', '집중력 저하', 'moderate', 'patient');
    insertSymptom.run('V004', '멍때림', 'moderate', 'patient');
    insertSymptom.run('V004', '물건 분실', 'mild', 'patient');
    insertPrescription.run('V004', '아토목세틴(스트라테라)', '25mg', '1일 1회 아침', 1);
    insertIndicator.run('V004', 'K-ARS 점수', '15', '점', 'improved');
    insertIndicator.run('V004', 'CGI-S', '3', '점', 'improved');
    insertIndicator.run('V004', 'ADHD-RS 점수', '20', '점', 'improved');
    insertNote.run('V004', '수업 시간에 딴생각이 줄었어요. 학용품도 덜 잃어버려요.', 'patient', '2025-01-20T11:00:00');
    insertNote.run('V004', '아토목세틴 반응 양호. 현 용량 유지. 학습 전략 상담 병행.', 'doctor', '2025-01-20T11:20:00');

    insertVisit.run('V005', 'A20250002', '2024-09-15', '김수진');
    insertSymptom.run('V005', '집중력 저하', 'severe', 'patient');
    insertSymptom.run('V005', '멍때림', 'severe', 'patient');
    insertSymptom.run('V005', '물건 분실', 'moderate', 'patient');
    insertSymptom.run('V005', '과제 완수 어려움', 'severe', 'doctor');
    insertPrescription.run('V005', '아토목세틴(스트라테라)', '18mg', '1일 1회 아침', 0);
    insertIndicator.run('V005', 'K-ARS 점수', '24', '점', 'worsened');
    insertIndicator.run('V005', 'CGI-S', '4', '점', 'unchanged');
    insertIndicator.run('V005', 'ADHD-RS 점수', '28', '점', 'worsened');
    insertNote.run('V005', '수업 시간에 멍하니 있고, 선생님 말씀을 못 듣는다고 합니다. 학용품을 자꾸 잃어버려요.', 'patient', '2024-09-15T14:00:00');
    insertNote.run('V005', '주의력결핍 증상 지속. 아토목세틴 25mg으로 증량. 조직화 기술 훈련 권고.', 'doctor', '2024-09-15T14:30:00');

    insertVisit.run('V006', 'A20250002', '2024-05-20', '김수진');
    insertSymptom.run('V006', '집중력 저하', 'severe', 'patient');
    insertSymptom.run('V006', '멍때림', 'moderate', 'patient');
    insertSymptom.run('V006', '과제 완수 어려움', 'moderate', 'doctor');
    insertPrescription.run('V006', '아토목세틴(스트라테라)', '18mg', '1일 1회 아침', 1);
    insertIndicator.run('V006', 'K-ARS 점수', '22', '점', 'unchanged');
    insertIndicator.run('V006', 'CGI-S', '4', '점', 'unchanged');
    insertIndicator.run('V006', 'ADHD-RS 점수', '26', '점', 'unchanged');
    insertNote.run('V006', '학교 성적이 떨어지고 숙제를 끝까지 못해요.', 'patient', '2024-05-20T10:00:00');
    insertNote.run('V006', 'ADHD 주의력결핍 우세형 초진. 과잉행동 없음. 아토목세틴 처방. 학습 환경 조정 권고.', 'doctor', '2024-05-20T10:30:00');

    // ── 환자 3: 박민준 (ADHD 과잉행동-충동 우세형) ──
    insertPatient.run('A20250003', 'ADHD 과잉행동-충동 우세형', '2024-07-05');
    insertSensitive.run('A20250003', '박민준', '2016-11-03', '남', '010-5555-6666');

    insertVisit.run('V007', 'A20250003', '2025-01-10', '정민호');
    insertSymptom.run('V007', '과잉행동', 'moderate', 'patient');
    insertSymptom.run('V007', '충동성', 'moderate', 'patient');
    insertSymptom.run('V007', '감정 조절 어려움', 'mild', 'doctor');
    insertPrescription.run('V007', '메틸페니데이트 서방정(콘서타)', '18mg', '1일 1회 아침', 1);
    insertIndicator.run('V007', 'K-ARS 점수', '20', '점', 'improved');
    insertIndicator.run('V007', 'CGI-S', '3', '점', 'improved');
    insertIndicator.run('V007', 'ADHD-RS 점수', '24', '점', 'improved');
    insertNote.run('V007', '교실에서 돌아다니는 게 줄었대요. 차례 기다리기도 좀 나아졌어요.', 'patient', '2025-01-10T10:00:00');
    insertNote.run('V007', '과잉행동-충동 증상 호전. 콘서타 18mg 유지. 사회기술훈련 병행 권고.', 'doctor', '2025-01-10T10:30:00');

    insertVisit.run('V008', 'A20250003', '2024-10-05', '정민호');
    insertSymptom.run('V008', '과잉행동', 'severe', 'patient');
    insertSymptom.run('V008', '충동성', 'severe', 'patient');
    insertSymptom.run('V008', '감정 조절 어려움', 'moderate', 'doctor');
    insertSymptom.run('V008', '또래 관계 어려움', 'moderate', 'patient');
    insertPrescription.run('V008', '메틸페니데이트 속방정', '10mg', '1일 2회', 0);
    insertIndicator.run('V008', 'K-ARS 점수', '30', '점', 'worsened');
    insertIndicator.run('V008', 'CGI-S', '5', '점', 'worsened');
    insertIndicator.run('V008', 'ADHD-RS 점수', '32', '점', 'worsened');
    insertNote.run('V008', '친구를 때리고, 수업 중에 소리를 지른다고 합니다. 화를 참지 못해요.', 'patient', '2024-10-05T14:00:00');
    insertNote.run('V008', '행동 문제 심화. 서방정(콘서타)으로 전환 예정. 분노 조절 프로그램 의뢰.', 'doctor', '2024-10-05T14:30:00');

    insertVisit.run('V009', 'A20250003', '2024-07-05', '정민호');
    insertSymptom.run('V009', '과잉행동', 'severe', 'patient');
    insertSymptom.run('V009', '충동성', 'severe', 'patient');
    insertSymptom.run('V009', '감정 조절 어려움', 'moderate', 'patient');
    insertPrescription.run('V009', '메틸페니데이트 속방정', '10mg', '1일 2회', 1);
    insertIndicator.run('V009', 'K-ARS 점수', '34', '점', 'unchanged');
    insertIndicator.run('V009', 'CGI-S', '5', '점', 'unchanged');
    insertIndicator.run('V009', 'ADHD-RS 점수', '36', '점', 'unchanged');
    insertNote.run('V009', '잠시도 가만히 있지 못하고, 위험한 행동을 자주 해요.', 'patient', '2024-07-05T11:00:00');
    insertNote.run('V009', 'ADHD 과잉행동-충동 우세형 초진. K-ARS 34점. 메틸페니데이트 속방정 처방. 행동치료 시작.', 'doctor', '2024-07-05T11:30:00');

    // ── 환자 4: 최하은 (ADHD 복합형, 성인) ──
    insertPatient.run('A20250004', 'ADHD 복합형 (성인)', '2024-08-15');
    insertSensitive.run('A20250004', '최하은', '1992-04-18', '여', '010-7777-8888');

    insertVisit.run('V010', 'A20250004', '2025-01-08', '김수진');
    insertSymptom.run('V010', '집중력 저하', 'moderate', 'patient');
    insertSymptom.run('V010', '시간 관리 어려움', 'moderate', 'patient');
    insertSymptom.run('V010', '감정 기복', 'mild', 'patient');
    insertPrescription.run('V010', '리스덱스암페타민(비반스)', '30mg', '1일 1회 아침', 1);
    insertPrescription.run('V010', '에스시탈로프람', '10mg', '1일 1회', 1);
    insertIndicator.run('V010', 'CAARS 점수', '58', '점', 'improved');
    insertIndicator.run('V010', 'CGI-S', '3', '점', 'improved');
    insertIndicator.run('V010', 'ADHD-RS 점수', '20', '점', 'improved');
    insertNote.run('V010', '업무 집중이 좀 나아졌어요. 회의 중에 딴생각이 줄었습니다. 감정 기복은 아직 있어요.', 'patient', '2025-01-08T13:00:00');
    insertNote.run('V010', 'ADHD 증상 호전. 비반스 30mg 유지. 동반 불안에 에스시탈로프람 추가. 인지행동치료 권고.', 'doctor', '2025-01-08T13:30:00');

    insertVisit.run('V011', 'A20250004', '2024-10-20', '김수진');
    insertSymptom.run('V011', '집중력 저하', 'severe', 'patient');
    insertSymptom.run('V011', '시간 관리 어려움', 'severe', 'patient');
    insertSymptom.run('V011', '감정 기복', 'moderate', 'patient');
    insertSymptom.run('V011', '미루기 습관', 'severe', 'doctor');
    insertPrescription.run('V011', '리스덱스암페타민(비반스)', '30mg', '1일 1회 아침', 1);
    insertIndicator.run('V011', 'CAARS 점수', '72', '점', 'worsened');
    insertIndicator.run('V011', 'CGI-S', '4', '점', 'unchanged');
    insertIndicator.run('V011', 'ADHD-RS 점수', '28', '점', 'worsened');
    insertNote.run('V011', '업무 마감을 계속 놓치고 있어요. 하루 계획을 세워도 지키지 못합니다. 우울감도 있어요.', 'patient', '2024-10-20T10:00:00');
    insertNote.run('V011', '성인 ADHD 증상 지속. 비반스 30mg 처방 시작. 시간 관리 전략 교육.', 'doctor', '2024-10-20T10:30:00');

    insertVisit.run('V012', 'A20250004', '2024-08-15', '김수진');
    insertSymptom.run('V012', '집중력 저하', 'severe', 'patient');
    insertSymptom.run('V012', '시간 관리 어려움', 'moderate', 'patient');
    insertSymptom.run('V012', '미루기 습관', 'moderate', 'patient');
    insertPrescription.run('V012', '아토목세틴(스트라테라)', '40mg', '1일 1회', 0);
    insertIndicator.run('V012', 'CAARS 점수', '68', '점', 'unchanged');
    insertIndicator.run('V012', 'CGI-S', '4', '점', 'unchanged');
    insertIndicator.run('V012', 'ADHD-RS 점수', '30', '점', 'unchanged');
    insertNote.run('V012', '어릴 때부터 산만하다는 이야기를 들었는데, 직장생활이 힘들어서 왔습니다.', 'patient', '2024-08-15T15:00:00');
    insertNote.run('V012', '성인 ADHD 복합형 초진. CAARS 68점. 아토목세틴 처방 시작. 종합심리검사 의뢰.', 'doctor', '2024-08-15T15:30:00');
  });

  transaction();
  console.log('[SEED] ADHD 목업 데이터 4명 (방문 12건) 삽입 완료');
}
