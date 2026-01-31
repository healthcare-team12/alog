import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import {
  requestNotificationPermissions,
  getExpoPushToken,
  scheduleMorningNotification,
  scheduleAfternoonNotification,
  cancelAllNotifications,
} from '../utils/notifications';
import { getNotificationSettings } from '../utils/storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface UseNotificationsOptions {
  onMedicationNotificationTap?: () => void;
}

export function useNotifications(options?: UseNotificationsOptions) {
  const responseListener = useRef<Notifications.EventSubscription | null>(null);
  const callbackRef = useRef(options?.onMedicationNotificationTap);
  callbackRef.current = options?.onMedicationNotificationTap;

  useEffect(() => {
    async function setup() {
      const granted = await requestNotificationPermissions();
      if (granted) {
        const settings = await getNotificationSettings();
        const [mHour, mMinute] = settings.morningTime.split(':').map(Number);
        const [aHour, aMinute] = settings.afternoonTime.split(':').map(Number);
        await cancelAllNotifications();
        await scheduleMorningNotification(mHour, mMinute);
        await scheduleAfternoonNotification(aHour, aMinute);
        await getExpoPushToken();
      }
    }
    setup();

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const title = response.notification.request.content.title ?? '';
      if (title.includes('복약') && callbackRef.current) {
        callbackRef.current();
      }
    });

    return () => {
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);
}
