import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface SurveyCompletionPopupProps {
  visible: boolean;
  onViewReport: () => void;
  onDismiss: () => void;
}

export function SurveyCompletionPopup({ visible, onViewReport, onDismiss }: SurveyCompletionPopupProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>기록을 끝까지 이어냈어요!</Text>
          <Text style={styles.body}>
            꾸준함이 어려운 날도 있었을 텐데, 여기까지 해냈어요.{'\n'}
            이번주 나의 증상 패턴이 어땠는지도 확인할 수 있어요.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={onViewReport} activeOpacity={0.8}>
              <Text style={styles.primaryText}>주간 요약 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onDismiss} activeOpacity={0.8}>
              <Text style={styles.secondaryText}>그만두기</Text>
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
  body: {
    ...Typography.body2,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
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
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  primaryText: {
    ...Typography.button,
    color: Colors.textOnPrimary,
  },
  secondaryText: {
    ...Typography.button,
    color: Colors.primary,
  },
});
