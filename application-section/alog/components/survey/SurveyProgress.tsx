import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface SurveyProgressProps {
  current: number;
  total: number;
}

export function SurveyProgress({ current, total }: SurveyProgressProps) {
  const progress = current / total;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {current} / {total}
      </Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  text: {
    ...Typography.label,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  barBackground: {
    height: 6,
    backgroundColor: Colors.divider,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
});
