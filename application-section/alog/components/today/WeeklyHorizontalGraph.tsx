import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { WeeklyRecord } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface WeeklyHorizontalGraphProps {
  records: WeeklyRecord[];
  todayDate?: string;
}

const statusBarColor: Record<string, string> = {
  complete: Colors.graphComplete,
  partial: Colors.graphPartial,
  incomplete: Colors.graphIncomplete,
};

function AnimatedStatusBox({ status, isToday }: { status: string; isToday: boolean }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isToday && (status === 'partial' || status === 'complete')) {
      opacity.setValue(1);
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.4, duration: 350, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 350, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]).start();
    }
  }, [status, isToday, opacity]);

  if (!isToday) {
    return <View style={[styles.statusBox, { backgroundColor: statusBarColor[status] }]} />;
  }

  return (
    <Animated.View
      style={[
        styles.statusBox,
        { backgroundColor: statusBarColor[status], opacity },
      ]}
    />
  );
}

export function WeeklyHorizontalGraph({ records, todayDate }: WeeklyHorizontalGraphProps) {
  return (
    <View style={styles.container}>
      {records.map((record) => (
        <View key={record.date} style={styles.cell}>
          <Text style={styles.dayLabel}>{record.day}</Text>
          <AnimatedStatusBox status={record.status} isToday={record.date === todayDate} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dayLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statusBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
});
