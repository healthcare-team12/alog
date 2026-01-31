import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { SymptomLineGraph } from '../../components/report/SymptomLineGraph';
import { CompletionRow } from '../../components/report/CompletionRow';
import { MedicationCharCard } from '../../components/report/MedicationCharCard';
import { SYMPTOM_LINES, COMPLETION_DATA, MEDICATION_CHARACTERISTICS, METRIC_COMPLETION_RATE, METRIC_TREND } from '../../constants/mockData';
import { CompletionRateCard } from '../../components/report/CompletionRateCard';
import { TrendAlertCard } from '../../components/report/TrendAlertCard';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

export default function ReportScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>주간 리포트</Text>
        <Text style={styles.subtitle}>1월 27일 ~ 2월 2일</Text>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>증상 추이</Text>
          <SymptomLineGraph lines={SYMPTOM_LINES} />
        </Card>

        <View style={[styles.section, styles.metricRow]}>
          <CompletionRateCard rate={METRIC_COMPLETION_RATE.rate} />
          <TrendAlertCard peakLabel={METRIC_TREND.peakLabel} />
        </View>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>주간 인사이트</Text>
          <Text style={styles.insightText}>
            이번 주 복약 완료율은 71%예요.{'\n'}
            수요일 이후 설문 기록이 줄었어요.
          </Text>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>복약 / 설문 완료 현황</Text>
          <CompletionRow data={COMPLETION_DATA} />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>현재 복용중인 약</Text>
          <Text style={styles.medName}>콘서타 OROS</Text>
          <View style={styles.charRow}>
            {MEDICATION_CHARACTERISTICS.map((char) => (
              <MedicationCharCard key={char.title} title={char.title} items={char.items} />
            ))}
          </View>
        </Card>
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
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body2,
    color: Colors.textSecondary,
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
  metricRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  charRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  medName: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  insightText: {
    ...Typography.body2,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
