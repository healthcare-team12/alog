import { useState, useEffect, useCallback } from 'react';
import { Medication } from '../types';
import { getMedications, updateMedication as storageUpdate } from '../utils/storage';

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getMedications();
    setMedications(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateMedication = useCallback(
    async (medication: Medication) => {
      await storageUpdate(medication);
      await refresh();
    },
    [refresh]
  );

  return { medications, loading, updateMedication, refresh };
}
