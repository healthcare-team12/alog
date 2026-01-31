import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { Header } from '../../../components/common/Header';
import { Card } from '../../../components/common/Card';
import { ProfileSection } from '../../../components/mypage/ProfileSection';
import { MedicationListCard } from '../../../components/mypage/MedicationListCard';
import { useMedications } from '../../../hooks/useMedications';
import { Button } from '../../../components/common/Button';
import { TimePickerSpinnerModal } from '../../../components/common/TimePickerSpinnerModal';
import { getNotificationSettings, saveNotificationSettings } from '../../../utils/storage';
import { rescheduleNotifications } from '../../../utils/notifications';
import { USER_PROFILE } from '../../../constants/mockData';
import { Colors } from '../../../constants/colors';
import { Typography } from '../../../constants/typography';
import { Spacing } from '../../../constants/spacing';

export default function MyPageScreen() {
  const router = useRouter();
  const { medications, loading, refresh } = useMedications();
  const [morningTime, setMorningTime] = useState('08:00');
  const [afternoonTime, setAfternoonTime] = useState('18:00');
  const [pickerVisible, setPickerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
      getNotificationSettings().then((settings) => {
        setMorningTime(settings.morningTime);
        setAfternoonTime(settings.afternoonTime);
      });
    }, [refresh])
  );

  const handleEditPress = (id: string) => {
    router.push({ pathname: '/(tabs)/mypage/medication-edit', params: { id } });
  };

  const handleTimeConfirm = async (newMorning: string, newAfternoon: string) => {
    await saveNotificationSettings({
      morningTime: newMorning,
      afternoonTime: newAfternoon,
      enabled: true,
    });
    await rescheduleNotifications(newMorning, newAfternoon);
    setMorningTime(newMorning);
    setAfternoonTime(newAfternoon);
    setPickerVisible(false);
    Alert.alert('저장 완료', '알림 시간이 변경되었습니다.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileSection nickname={USER_PROFILE.nickname} />

        <MedicationListCard medications={medications} loading={loading} onEditPress={handleEditPress} />

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>알림 시간</Text>
          <View style={styles.notifRow}>
            <Text style={styles.notifLabel}>복용 알림</Text>
            <Text style={styles.notifTime}>{morningTime}</Text>
          </View>
          <View style={styles.notifRow}>
            <Text style={styles.notifLabel}>설문 알림</Text>
            <Text style={styles.notifTime}>{afternoonTime}</Text>
          </View>
          <Button
            title="수정하기"
            onPress={() => setPickerVisible(true)}
            variant="secondary"
            style={styles.editButton}
          />
        </Card>

        <TimePickerSpinnerModal
          visible={pickerVisible}
          morningTime={morningTime}
          afternoonTime={afternoonTime}
          onConfirm={handleTimeConfirm}
          onCancel={() => setPickerVisible(false)}
        />

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>정보</Text>
          <Text style={styles.infoText}>버전 1.0.0</Text>
          <View style={styles.divider} />
          <Text style={styles.infoText}>이용약관</Text>
          <View style={styles.divider} />
          <Text style={styles.infoText}>개인정보 처리방침</Text>
        </Card>

        <Text style={styles.disclaimer}>
          Alog는 의료 기기가 아니며, 의학적 진단이나 처방을 대체하지 않습니다.{'\n'}
          기록된 데이터는 개인 참고용이며, 의료 전문가의 상담을 권장합니다.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  notifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  notifLabel: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  notifTime: {
    ...Typography.body1,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  editButton: {
    marginTop: Spacing.md,
  },
  infoText: {
    ...Typography.body2,
    color: Colors.textSecondary,
    paddingVertical: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.xxl,
    lineHeight: 18,
  },
});
