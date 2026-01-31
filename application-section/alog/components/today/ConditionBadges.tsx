import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ConditionBadge as ConditionBadgeType } from '../../types';
import { Badge } from '../common/Badge';
import { Spacing } from '../../constants/spacing';

interface ConditionBadgesProps {
  badges: ConditionBadgeType[];
}

export function ConditionBadges({ badges }: ConditionBadgesProps) {
  return (
    <View style={styles.container}>
      {badges.map((badge) => (
        <Badge key={badge.label} label={badge.label} status={badge.status} description={badge.description} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});
