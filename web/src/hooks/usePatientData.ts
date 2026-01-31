import { useState, useEffect } from 'react';
import type { Patient, Visit, ClinicalSummary } from '../types/patient';
import { compareVisits } from '../utils/compareVisits';
import { useAuditLog } from './useAuditLog';

interface PatientDataResult {
  data: ClinicalSummary | null;
  loading: boolean;
  notFound: boolean;
}

export function usePatientData(patientId: string | undefined): PatientDataResult {
  const [state, setState] = useState<PatientDataResult>({
    data: null,
    loading: true,
    notFound: false,
  });
  const { logView } = useAuditLog();

  useEffect(() => {
    if (!patientId) {
      setState({ data: null, loading: false, notFound: true });
      return;
    }

    setState({ data: null, loading: true, notFound: false });
    let cancelled = false;

    (async () => {
      try {
        const [patientRes, visitsRes] = await Promise.all([
          fetch(`/api/patients/${encodeURIComponent(patientId)}`),
          fetch(`/api/patients/${encodeURIComponent(patientId)}/visits`),
        ]);

        if (cancelled) return;

        if (!patientRes.ok) {
          setState({ data: null, loading: false, notFound: true });
          return;
        }

        const patient: Patient = await patientRes.json();
        const visits: Visit[] = await visitsRes.json();

        logView(patientId);

        const activePrescriptions =
          visits.length > 0
            ? visits[0].prescriptions.filter((p) => p.active)
            : [];

        const recentChanges =
          visits.length >= 2 ? compareVisits(visits[0], visits[1]) : [];

        const summary: ClinicalSummary = {
          patient,
          visits,
          activePrescriptions,
          recentChanges,
          lastVisitDate: visits.length > 0 ? visits[0].date : '',
        };

        if (!cancelled) {
          setState({ data: summary, loading: false, notFound: false });
        }
      } catch {
        if (!cancelled) {
          setState({ data: null, loading: false, notFound: true });
        }
      }
    })();

    return () => { cancelled = true; };
  }, [patientId, logView]);

  return state;
}
