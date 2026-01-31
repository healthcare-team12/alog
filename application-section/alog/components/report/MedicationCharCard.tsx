import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface MedicationCharCardProps {
  title: string;
  items: string[];
}

export function MedicationCharCard({ title, items }: MedicationCharCardProps) {
  const isEffect = title === '효과';

  return (
    <View style={[styles.container, { backgroundColor: isEffect ? Colors.statusGreenBg : Colors.statusRedBg }]}>
      <Text style={[styles.title, { color: isEffect ? Colors.statusGreen : Colors.statusRed }]}>{title}</Text>
      {items.map((item) => (
        <View key={item} style={styles.itemRow}>
          <View style={[styles.bullet, { backgroundColor: isEffect ? Colors.statusGreen : Colors.statusRed }]} />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: Spacing.lg,
    flex: 1,
  },
  title: {
    ...Typography.label,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  itemText: {
    ...Typography.body2,
    color: Colors.textPrimary,
  },
});
