import React, { useState, useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DeviceEventEmitter } from 'react-native';
import { useNotifications } from '../hooks/useNotifications';
import { MedicationPopup } from '../components/common/MedicationPopup';
import { getMedicationRecord, saveMedicationRecord, getTodayDateString } from '../utils/storage';

export default function RootLayout() {
  useNotifications({
    onMedicationNotificationTap: () => setShowPopup(true),
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    checkMedicationRecord();
  }, []);

  const checkMedicationRecord = async () => {
    const today = getTodayDateString();
    const record = await getMedicationRecord(today);
    if (!record) {
      setShowPopup(true);
    }
  };

  const handleTaken = useCallback(async () => {
    const today = getTodayDateString();
    await saveMedicationRecord({ date: today, taken: true, recordedAt: new Date().toISOString() });
    DeviceEventEmitter.emit('medicationRecordUpdated', { date: today });
    setShowPopup(false);
  }, []);

  const handleNotTaken = useCallback(async () => {
    const today = getTodayDateString();
    await saveMedicationRecord({ date: today, taken: false, recordedAt: new Date().toISOString() });
    DeviceEventEmitter.emit('medicationRecordUpdated', { date: today });
    setShowPopup(false);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <MedicationPopup visible={showPopup} onTaken={handleTaken} onNotTaken={handleNotTaken} />
    </SafeAreaProvider>
  );
}
