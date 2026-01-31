import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface TrendAlertCardProps {
  peakLabel: string;
}

const RING_SIZE = 56;
const RING_WIDTH = 6;

export function TrendAlertCard({ peakLabel }: TrendAlertCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.center}>
        <View style={styles.ring}>
          <Text style={styles.peakLabel}>{peakLabel}</Text>
        </View>
        <Text style={styles.caption}>가장 높았어요</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: Spacing.md,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_WIDTH,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  peakLabel: {
    ...Typography.caption,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  caption: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
});
