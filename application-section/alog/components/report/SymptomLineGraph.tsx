import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymptomLine } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface SymptomLineGraphProps {
  lines: SymptomLine[];
}

const GRAPH_HEIGHT = 160;
const MAX_VALUE = 5;
const DOT_SIZE = 8;

export function SymptomLineGraph({ lines }: SymptomLineGraphProps) {
  const days = lines[0]?.data.map((d) => d.day) ?? [];

  return (
    <View style={styles.container}>
      {/* Y-axis labels */}
      <View style={styles.yAxis}>
        {[5, 4, 3, 2, 1].map((v) => (
          <Text key={v} style={styles.yLabel}>
            {v}
          </Text>
        ))}
      </View>

      {/* Graph area */}
      <View style={styles.graphArea}>
        {/* Grid lines */}
        {[1, 2, 3, 4, 5].map((v) => (
          <View
            key={v}
            style={[styles.gridLine, { bottom: ((v - 1) / (MAX_VALUE - 1)) * GRAPH_HEIGHT }]}
          />
        ))}

        {/* Data lines and dots */}
        {lines.map((line) => (
          <React.Fragment key={line.label}>
            {line.data.map((point, i) => {
              const x = (i / (days.length - 1)) * 100;
              const y = ((point.value - 1) / (MAX_VALUE - 1)) * GRAPH_HEIGHT;

              return (
                <View
                  key={`${line.label}-${i}`}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: line.color,
                      left: `${x}%`,
                      bottom: y - DOT_SIZE / 2,
                    },
                  ]}
                />
              );
            })}
            {/* Connecting lines */}
            {line.data.slice(0, -1).map((point, i) => {
              const nextPoint = line.data[i + 1];
              const x1 = (i / (days.length - 1)) * 100;
              const x2 = ((i + 1) / (days.length - 1)) * 100;
              const y1 = ((point.value - 1) / (MAX_VALUE - 1)) * GRAPH_HEIGHT;
              const y2 = ((nextPoint.value - 1) / (MAX_VALUE - 1)) * GRAPH_HEIGHT;
              const length = Math.sqrt(
                Math.pow(((x2 - x1) / 100) * 280, 2) + Math.pow(y2 - y1, 2)
              );
              const angle = Math.atan2(-(y2 - y1), ((x2 - x1) / 100) * 280) * (180 / Math.PI);

              return (
                <View
                  key={`line-${line.label}-${i}`}
                  style={[
                    styles.line,
                    {
                      backgroundColor: line.color,
                      width: length,
                      left: `${x1}%`,
                      bottom: y1,
                      transform: [{ rotate: `${angle}deg` }],
                      transformOrigin: 'left center',
                    },
                  ]}
                />
              );
            })}
          </React.Fragment>
        ))}

        {/* X-axis labels */}
        <View style={styles.xAxis}>
          {days.map((day, i) => (
            <Text key={day} style={styles.xLabel}>
              {day}
            </Text>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {lines.map((line) => (
          <View key={line.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: line.color }]} />
            <Text style={styles.legendText}>{line.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.sm,
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: Spacing.sm,
    height: GRAPH_HEIGHT,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  yLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
    width: 16,
    textAlign: 'right',
  },
  graphArea: {
    marginLeft: 24,
    height: GRAPH_HEIGHT,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginLeft: -DOT_SIZE / 2,
    zIndex: 2,
  },
  line: {
    position: 'absolute',
    height: 2,
    zIndex: 1,
  },
  xAxis: {
    position: 'absolute',
    bottom: -24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.xxxl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
