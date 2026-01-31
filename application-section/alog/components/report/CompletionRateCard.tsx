import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface CompletionRateCardProps {
  rate: number;
}

const RING_SIZE = 56;
const RING_WIDTH = 6;

export function CompletionRateCard({ rate }: CompletionRateCardProps) {
  const clampedRate = Math.min(100, Math.max(0, rate));

  return (
    <Card style={styles.card}>
      <View style={styles.center}>
        <View style={styles.ringContainer}>
          {/* Background circle */}
          <View style={styles.ringBg} />
          {/* Progress - left half */}
          <View style={styles.halfClip}>
            <View
              style={[
                styles.halfCircle,
                styles.firstHalf,
                {
                  transform: [
                    { rotate: `${clampedRate <= 50 ? (clampedRate / 50) * 180 : 180}deg` },
                  ],
                },
              ]}
            />
          </View>
          {/* Progress - right half */}
          {clampedRate > 50 && (
            <View style={[styles.halfClip, styles.rightClip]}>
              <View
                style={[
                  styles.halfCircle,
                  styles.secondHalf,
                  {
                    transform: [
                      { rotate: `${((clampedRate - 50) / 50) * 180}deg` },
                    ],
                  },
                ]}
              />
            </View>
          )}
          {/* Center label */}
          <View style={styles.centerLabel}>
            <Text style={styles.rateText}>{clampedRate}%</Text>
          </View>
        </View>
        <Text style={styles.caption}>복약 완료율</Text>
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
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    position: 'relative',
  },
  ringBg: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_WIDTH,
    borderColor: Colors.primaryLight,
  },
  halfClip: {
    position: 'absolute',
    width: RING_SIZE / 2,
    height: RING_SIZE,
    left: RING_SIZE / 2,
    overflow: 'hidden',
  },
  rightClip: {
    left: 0,
  },
  halfCircle: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_WIDTH,
    borderColor: Colors.primary,
    position: 'absolute',
  },
  firstHalf: {
    right: 0,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transformOrigin: 'center center',
    transform: [{ rotate: '0deg' }],
  },
  secondHalf: {
    left: 0,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    transformOrigin: 'center center',
    transform: [{ rotate: '0deg' }],
  },
  centerLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateText: {
    ...Typography.body1,
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
