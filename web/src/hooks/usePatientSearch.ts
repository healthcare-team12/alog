import { useState, useCallback } from 'react';
import type { Patient } from '../types/patient';
import { useAuditLog } from './useAuditLog';

interface SearchResult {
  patient: Patient | null;
  notFound: boolean;
  loading: boolean;
}

export function usePatientSearch() {
  const [result, setResult] = useState<SearchResult>({
    patient: null,
    notFound: false,
    loading: false,
  });
  const { logSearch } = useAuditLog();

  const search = useCallback(
    async (query: string) => {
      setResult({ patient: null, notFound: false, loading: true });
      logSearch(query);

      try {
        const res = await fetch(`/api/patients/${encodeURIComponent(query)}`);
        if (!res.ok) {
          setResult({ patient: null, notFound: true, loading: false });
          return;
        }
        const patient: Patient = await res.json();
        setResult({ patient, notFound: false, loading: false });
      } catch {
        setResult({ patient: null, notFound: true, loading: false });
      }
    },
    [logSearch]
  );

  const reset = useCallback(() => {
    setResult({ patient: null, notFound: false, loading: false });
  }, []);

  return { ...result, search, reset };
}
