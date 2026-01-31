import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Medication } from '../../types';
import { Card } from '../common/Card';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface MedicationListCardProps {
  medications: Medication[];
  loading: boolean;
  onEditPress: (id: string) => void;
}

export function MedicationListCard({ medications, loading, onEditPress }: MedicationListCardProps) {
  if (loading) {
    return (
      <Card>
        <ActivityIndicator color={Colors.primary} />
      </Card>
    );
  }

  return (
    <Card>
      <Text style={styles.title}>복용 중인 약</Text>
      {medications.map((med, index) => (
        <View key={med.id}>
          {index > 0 && <View style={styles.divider} />}
          <View style={styles.medRow}>
            <View style={styles.medInfo}>
              <Text style={styles.medName}>{med.name}</Text>
              <Text style={styles.medDetail}>
                {med.dosage} · {med.frequency}
                {med.period ? ` · ${med.period}` : ''}
              </Text>
            </View>
            <TouchableOpacity onPress={() => onEditPress(med.id)} activeOpacity={0.7} style={styles.editButton}>
              <Ionicons name="pencil-outline" size={18} color={Colors.primary} />
              <Text style={styles.editText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  medRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  medDetail: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
  },
  editText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
});
