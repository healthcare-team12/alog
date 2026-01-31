import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface CompletionData {
  day: string;
  medication: boolean;
  survey: boolean;
}

interface CompletionRowProps {
  data: CompletionData[];
}

export function CompletionRow({ data }: CompletionRowProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.row}>
        <View style={styles.labelCell} />
        {data.map((item) => (
          <View key={item.day} style={styles.cell}>
            <Text style={styles.dayText}>{item.day}</Text>
          </View>
        ))}
      </View>

      {/* Medication row */}
      <View style={styles.row}>
        <View style={styles.labelCell}>
          <Text style={styles.rowLabel}>복약</Text>
        </View>
        {data.map((item) => (
          <View key={`med-${item.day}`} style={styles.cell}>
            <Text style={[styles.mark, item.medication ? styles.markDone : styles.markMissed]}>
              {item.medication ? 'O' : 'X'}
            </Text>
          </View>
        ))}
      </View>

      {/* Survey row */}
      <View style={styles.row}>
        <View style={styles.labelCell}>
          <Text style={styles.rowLabel}>설문</Text>
        </View>
        {data.map((item) => (
          <View key={`survey-${item.day}`} style={styles.cell}>
            <Text style={[styles.mark, item.survey ? styles.markDone : styles.markMissed]}>
              {item.survey ? 'O' : 'X'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelCell: {
    width: 40,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  rowLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  mark: {
    ...Typography.body2,
    fontWeight: '600',
  },
  markDone: {
    color: Colors.primary,
  },
  markMissed: {
    color: Colors.textTertiary,
  },
});
