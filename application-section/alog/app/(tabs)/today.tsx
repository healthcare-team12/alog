import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { SurveyCompletionPopup } from '../../components/common/SurveyCompletionPopup';
import { WeeklyHorizontalGraph } from '../../components/today/WeeklyHorizontalGraph';
import { GraphLegend } from '../../components/today/GraphLegend';
import { ConditionBadges } from '../../components/today/ConditionBadges';
import { WEEKLY_RECORDS, CONDITION_BADGES } from '../../constants/mockData';
import { getDayRecordStatus } from '../../utils/storage';
import { useSurvey } from '../../hooks/useSurvey';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const DEFAULT_STATUS_BY_DAY = new Map(WEEKLY_RECORDS.map((record) => [record.day, record.status]));

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildWeeklyRecords(baseDate: Date) {
  const base = new Date(baseDate);
  base.setHours(0, 0, 0, 0);

  const dayIndex = base.getDay();
  const diffToMonday = dayIndex === 0 ? -6 : 1 - dayIndex;
  const monday = new Date(base);
  monday.setDate(base.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dayLabel = WEEKDAY_LABELS[date.getDay()];
    return {
      day: dayLabel,
      date: formatDate(date),
      status: DEFAULT_STATUS_BY_DAY.get(dayLabel) ?? 'incomplete',
    };
  });
}

export default function TodayScreen() {
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일`;
  const todayISO = formatDate(today);
  const [weeklyRecords, setWeeklyRecords] = useState(() => buildWeeklyRecords(today));
  const router = useRouter();
  const { isCompleted: surveyCompleted, refresh: refreshSurvey } = useSurvey();
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const prevSurveyCompleted = useRef(surveyCompleted);

  const refreshTodayStatus = useCallback(
    async (targetDate?: string) => {
      const date = targetDate ?? todayISO;
      const status = await getDayRecordStatus(date);
      setWeeklyRecords((prev) => {
        const idx = prev.findIndex((record) => record.date === date);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], status };
        return updated;
      });
    },
    [todayISO]
  );

  useFocusEffect(
    useCallback(() => {
      const checkSurvey = async () => {
        await refreshSurvey();
      };
      checkSurvey();
      setWeeklyRecords(buildWeeklyRecords(new Date()));
      refreshTodayStatus();
    }, [refreshSurvey, refreshTodayStatus])
  );

  useEffect(() => {
    if (!prevSurveyCompleted.current && surveyCompleted) {
      setShowCompletionPopup(true);
    }
    prevSurveyCompleted.current = surveyCompleted;
  }, [surveyCompleted]);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('medicationRecordUpdated', (payload) => {
      const date = payload?.date ?? todayISO;
      refreshTodayStatus(date);
    });

    return () => subscription.remove();
  }, [refreshTodayStatus, todayISO]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>{dateStr}</Text>
        <Text style={styles.greeting}>오늘도 증상을 기록해볼까요?</Text>

        <TouchableOpacity onPress={() => router.push('/(tabs)/survey')} activeOpacity={0.7}>
          <View style={[styles.symptomButton, surveyCompleted && styles.symptomButtonCompleted]}>
            <Text style={styles.symptomButtonText}>
              {surveyCompleted ? '오늘 기록을 완료했어요 ✓' : '증상 기록'}
            </Text>
          </View>
        </TouchableOpacity>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>이번 주 기록 상태</Text>
          <WeeklyHorizontalGraph records={weeklyRecords} todayDate={todayISO} />
          <GraphLegend />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 컨디션</Text>
          <ConditionBadges badges={CONDITION_BADGES} />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 요약</Text>
          <Text style={styles.summaryText}>
            이번 주 3일 연속 기록을 완료했어요.{'\n'}
            집중력은 양호한 흐름을 보이고 있어요.
          </Text>
        </Card>
      </ScrollView>

      <SurveyCompletionPopup
        visible={showCompletionPopup}
        onViewReport={() => {
          setShowCompletionPopup(false);
          router.push('/(tabs)/report');
        }}
        onDismiss={() => setShowCompletionPopup(false)}
      />
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
  date: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  greeting: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  summaryText: {
    ...Typography.body2,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  symptomButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  symptomButtonCompleted: {
    backgroundColor: Colors.primarySoft,
  },
  symptomButtonText: {
    ...Typography.h3,
    color: Colors.textOnPrimary,
  },
});
