import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Medication } from '../../types';
import { TextField } from '../common/TextField';
import { Button } from '../common/Button';
import { validateMedication, hasValidationErrors, ValidationErrors } from '../../utils/validation';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface MedicationFormProps {
  medication: Medication;
  onSave: (medication: Medication) => void;
  saving: boolean;
}

export function MedicationForm({ medication, onSave, saving }: MedicationFormProps) {
  const [name, setName] = useState(medication.name);
  const [dosage, setDosage] = useState(medication.dosage);
  const [period, setPeriod] = useState(medication.period ?? '');
  const [memo, setMemo] = useState(medication.memo ?? '');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      setErrors(validateMedication({ name, dosage }));
    }
  }, [name, dosage, touched]);

  const handleSave = () => {
    setTouched(true);
    const validationErrors = validateMedication({ name, dosage });
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    onSave({
      ...medication,
      name: name.trim(),
      dosage: dosage.trim(),
      period: period.trim() || undefined,
      memo: memo.trim() || undefined,
    });
  };

  return (
    <View style={styles.container}>
      <TextField
        label="약 이름"
        required
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (!touched) setTouched(true);
        }}
        placeholder="예: 콘서타 OROS"
        error={errors.name}
      />

      <TextField
        label="용량"
        required
        value={dosage}
        onChangeText={(text) => {
          setDosage(text);
          if (!touched) setTouched(true);
        }}
        placeholder="예: 27mg"
        error={errors.dosage}
      />

      <View style={styles.fixedField}>
        <Text style={styles.fixedLabel}>복용 횟수</Text>
        <Text style={styles.fixedValue}>1회 (고정)</Text>
      </View>

      <TextField
        label="복용 기간"
        value={period}
        onChangeText={setPeriod}
        placeholder="예: 3개월"
      />

      <TextField
        label="메모"
        value={memo}
        onChangeText={setMemo}
        placeholder="예: 아침 식후 복용"
        multiline
        numberOfLines={3}
        style={styles.multiline}
      />

      <Button
        title="저장"
        onPress={handleSave}
        disabled={touched && hasValidationErrors(errors)}
        loading={saving}
        style={styles.saveButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedField: {
    marginBottom: Spacing.lg,
  },
  fixedLabel: {
    ...Typography.label,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  fixedValue: {
    ...Typography.body1,
    color: Colors.textSecondary,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.disabledBg,
    overflow: 'hidden',
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: Spacing.md,
  },
});
