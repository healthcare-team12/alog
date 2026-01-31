import { useCallback } from 'react';
import { useClinic } from '../contexts/ClinicContext';

export function useAuditLog() {
  const { doctorName } = useClinic();

  const postAudit = useCallback(
    (body: Record<string, string | undefined>) => {
      fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, doctorName }),
      }).catch(() => {
        // 감사 로그 실패는 사용자 플로우를 막지 않음
      });
    },
    [doctorName]
  );

  const logSearch = useCallback(
    (query: string) => {
      postAudit({
        action: 'search',
        details: `환자 검색: "${query}"`,
      });
    },
    [postAudit]
  );

  const logView = useCallback(
    (patientId: string) => {
      postAudit({
        action: 'view',
        patientId,
        details: `환자 진료 요약 조회: ${patientId}`,
      });
    },
    [postAudit]
  );

  const logViewRecords = useCallback(
    (patientId: string) => {
      postAudit({
        action: 'view_records',
        patientId,
        details: `환자 전체 기록 조회: ${patientId}`,
      });
    },
    [postAudit]
  );

  return { logSearch, logView, logViewRecords };
}
