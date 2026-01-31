import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface ProfileSectionProps {
  nickname: string;
}

export function ProfileSection({ nickname }: ProfileSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={32} color={Colors.primaryFaded} />
      </View>
      <Text style={styles.nickname}>{nickname}님</Text>
      <Text style={styles.patientId}>A20250001</Text>
      <Text style={styles.subtitle}>꾸준히 기록하고 있어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  nickname: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  patientId: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  subtitle: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
