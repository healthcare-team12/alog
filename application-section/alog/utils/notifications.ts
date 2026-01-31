import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function getExpoPushToken(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('[Alog] 푸시 토큰은 실제 기기에서만 발급됩니다.');
    return null;
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'alog-push-test',
    });
    console.log('[Alog] Expo Push Token:', token.data);
    return token.data;
  } catch (e) {
    console.log('[Alog] 푸시 토큰 발급 실패:', e);
    return null;
  }
}

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  return true;
}

export async function scheduleMorningNotification(hour: number, minute: number): Promise<string | null> {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alog 복약 알림',
        body: '오늘 복약 여부를 기록하면 나의 기록 리포트를 채울 수 있어요!',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
    return id;
  } catch {
    return null;
  }
}

export async function scheduleAfternoonNotification(hour: number, minute: number): Promise<string | null> {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alog 설문 알림',
        body: '오늘 하루 어땠나요? 2분만 기록하면 오늘 요약이 완성돼요',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
    return id;
  } catch {
    return null;
  }
}

export async function sendTestMedicationNotification(): Promise<string | null> {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alog 복약 알림',
        body: '오늘 복약 여부를 기록하면 나의 기록 리포트를 채울 수 있어요!',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
      },
    });
    return id;
  } catch {
    return null;
  }
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
