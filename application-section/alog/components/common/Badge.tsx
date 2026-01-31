import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

type BadgeStatus = 'good' | 'normal' | 'bad';

interface BadgeProps {
  label: string;
  status: BadgeStatus;
  description?: string;
}

const statusColors: Record<BadgeStatus, { bg: string; text: string }> = {
  good: { bg: Colors.statusGreenBg, text: Colors.statusGreen },
  normal: { bg: Colors.statusYellowBg, text: Colors.statusYellow },
  bad: { bg: Colors.statusRedBg, text: Colors.statusRed },
};

export function Badge({ label, status, description }: BadgeProps) {
  const colors = statusColors[status];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  label: {
    ...Typography.label,
    fontWeight: '600',
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
