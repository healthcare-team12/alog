import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface TimePickerSpinnerModalProps {
  visible: boolean;
  morningTime: string;
  afternoonTime: string;
  onConfirm: (morning: string, afternoon: string) => void;
  onCancel: () => void;
}

function parseTime(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(':').map(Number);
  return { hour: h || 0, minute: m || 0 };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function wrapHour(h: number): number {
  return ((h % 24) + 24) % 24;
}

function wrapMinute(m: number): number {
  return ((m % 60) + 60) % 60;
}

function Spinner({
  value,
  onIncrement,
  onDecrement,
}: {
  value: string;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <View style={styles.spinner}>
      <TouchableOpacity
        style={styles.spinnerButton}
        onPress={onIncrement}
        activeOpacity={0.7}
      >
        <Text style={styles.spinnerArrow}>▲</Text>
      </TouchableOpacity>
      <Text style={styles.spinnerValue}>{value}</Text>
      <TouchableOpacity
        style={styles.spinnerButton}
        onPress={onDecrement}
        activeOpacity={0.7}
      >
        <Text style={styles.spinnerArrow}>▼</Text>
      </TouchableOpacity>
    </View>
  );
}

export function TimePickerSpinnerModal({
  visible,
  morningTime,
  afternoonTime,
  onConfirm,
  onCancel,
}: TimePickerSpinnerModalProps) {
  const [morning, setMorning] = useState(parseTime(morningTime));
  const [afternoon, setAfternoon] = useState(parseTime(afternoonTime));

  // Reset state when modal opens
  React.useEffect(() => {
    if (visible) {
      setMorning(parseTime(morningTime));
      setAfternoon(parseTime(afternoonTime));
    }
  }, [visible, morningTime, afternoonTime]);

  const handleConfirm = () => {
    onConfirm(
      `${pad(morning.hour)}:${pad(morning.minute)}`,
      `${pad(afternoon.hour)}:${pad(afternoon.minute)}`,
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>알림 시간 설정</Text>

          <Text style={styles.label}>복용 알림</Text>
          <View style={styles.timeRow}>
            <Spinner
              value={pad(morning.hour)}
              onIncrement={() =>
                setMorning((p) => ({ ...p, hour: wrapHour(p.hour + 1) }))
              }
              onDecrement={() =>
                setMorning((p) => ({ ...p, hour: wrapHour(p.hour - 1) }))
              }
            />
            <Text style={styles.colon}>:</Text>
            <Spinner
              value={pad(morning.minute)}
              onIncrement={() =>
                setMorning((p) => ({ ...p, minute: wrapMinute(p.minute + 5) }))
              }
              onDecrement={() =>
                setMorning((p) => ({ ...p, minute: wrapMinute(p.minute - 5) }))
              }
            />
          </View>

          <Text style={styles.label}>설문 알림</Text>
          <View style={styles.timeRow}>
            <Spinner
              value={pad(afternoon.hour)}
              onIncrement={() =>
                setAfternoon((p) => ({ ...p, hour: wrapHour(p.hour + 1) }))
              }
              onDecrement={() =>
                setAfternoon((p) => ({ ...p, hour: wrapHour(p.hour - 1) }))
              }
            />
            <Text style={styles.colon}>:</Text>
            <Spinner
              value={pad(afternoon.minute)}
              onIncrement={() =>
                setAfternoon((p) => ({
                  ...p,
                  minute: wrapMinute(p.minute + 5),
                }))
              }
              onDecrement={() =>
                setAfternoon((p) => ({
                  ...p,
                  minute: wrapMinute(p.minute - 5),
                }))
              }
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>저장하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>그만두기</Text>
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
    marginBottom: Spacing.xl,
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  spinner: {
    alignItems: 'center',
    minWidth: 56,
  },
  spinnerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerArrow: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  spinnerValue: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginVertical: Spacing.xs,
    minWidth: 48,
    textAlign: 'center',
  },
  colon: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
    marginTop: Spacing.xl,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  confirmText: {
    ...Typography.button,
    color: Colors.textOnPrimary,
  },
  cancelText: {
    ...Typography.button,
    color: Colors.primary,
  },
});
