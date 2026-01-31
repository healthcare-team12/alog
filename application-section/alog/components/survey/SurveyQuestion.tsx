import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SurveyQuestion as SurveyQuestionType } from '../../types';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

interface SurveyQuestionProps {
  question: SurveyQuestionType;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

export function SurveyQuestionCard({ question, selectedValue, onSelect }: SurveyQuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>

      <View style={styles.options}>
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.optionButton, isSelected && styles.optionSelected]}
              onPress={() => onSelect(option.value)}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>{option.label}</Text>
              <Text style={[styles.optionDesc, isSelected && styles.optionDescSelected]}>{option.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionText: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.xxl,
    lineHeight: 26,
  },
  options: {
    gap: Spacing.md,
  },
  optionButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  optionLabel: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: Colors.primary,
  },
  optionDesc: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  optionDescSelected: {
    color: Colors.primarySoft,
  },
});
