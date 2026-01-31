import { useState, useEffect, useCallback } from 'react';
import { SurveyResponse } from '../types';
import { getSurveyResponse, saveSurveyResponse, deleteSurveyResponse, getTodayDateString } from '../utils/storage';

export function useSurvey() {
  const [todayResponse, setTodayResponse] = useState<SurveyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const today = getTodayDateString();

  const refresh = useCallback(async () => {
    setLoading(true);
    const response = await getSurveyResponse(today);
    setTodayResponse(response);
    setLoading(false);
  }, [today]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveResponse = useCallback(
    async (answers: Record<number, number>) => {
      const response: SurveyResponse = {
        date: today,
        answers,
        completedAt: new Date().toISOString(),
      };
      await saveSurveyResponse(response);
      setTodayResponse(response);
    },
    [today]
  );

  const deleteResponse = useCallback(async () => {
    await deleteSurveyResponse(today);
    setTodayResponse(null);
  }, [today]);

  const isCompleted = todayResponse !== null;

  return { todayResponse, loading, saveResponse, deleteResponse, isCompleted, refresh };
}
