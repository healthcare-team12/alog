import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface HeaderProps {
  onNotificationPress?: () => void;
}

export function Header({ onNotificationPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Alog</Text>
      <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7}>
        <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  logo: {
    ...Typography.h1,
    color: Colors.primary,
    fontWeight: '700',
  },
});
