import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface MedicationPopupProps {
  visible: boolean;
  onTaken: () => void;
  onNotTaken: () => void;
}

export function MedicationPopup({ visible, onTaken, onNotTaken }: MedicationPopupProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>오늘 약 복용하셨나요?</Text>
          <Text style={styles.subtitle}>복용 여부를 기록해주세요</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.takenButton]} onPress={onTaken} activeOpacity={0.8}>
              <Text style={styles.takenText}>먹었어요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.notTakenButton]} onPress={onNotTaken} activeOpacity={0.8}>
              <Text style={styles.notTakenText}>아직이에요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  popup: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.xxl,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  takenButton: {
    backgroundColor: Colors.primary,
  },
  notTakenButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  takenText: {
    ...Typography.button,
    color: Colors.textOnPrimary,
  },
  notTakenText: {
    ...Typography.button,
    color: Colors.primary,
  },
});
