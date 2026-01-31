import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SurveyProgress } from '../../components/survey/SurveyProgress';
import { SurveyQuestionCard } from '../../components/survey/SurveyQuestion';
import { SURVEY_QUESTIONS } from '../../constants/surveyQuestions';
import { useSurvey } from '../../hooks/useSurvey';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';

export default function SurveyScreen() {
  const router = useRouter();
  const { isCompleted, saveResponse, deleteResponse, refresh } = useSurvey();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const currentQuestion = SURVEY_QUESTIONS[currentIndex];
  const totalQuestions = SURVEY_QUESTIONS.length;
  const selectedValue = answers[currentQuestion?.id] ?? null;

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = async () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await saveResponse(answers);
      router.navigate('/(tabs)/today');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isCompleted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header />
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>ⓘ 주간 증상 흐름을 정확하게 기록하기 위해 질문은 요일마다 달라집니다.</Text>
        </View>
        <View style={styles.completedContainer}>
          <Card style={styles.completedCard}>
            <Text style={styles.completedIcon}>&#10003;</Text>
            <Text style={styles.completedTitle}>오늘 설문을 완료했어요</Text>
            <Text style={styles.completedSubtitle}>내일 다시 기록할 수 있어요</Text>
            <Button
              title="다시 하기"
              onPress={async () => {
                await deleteResponse();
                setCurrentIndex(0);
                setAnswers({});
              }}
              variant="secondary"
              style={styles.retryButton}
            />
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>ⓘ 주간 증상 흐름을 정확하게 기록하기 위해 질문은 요일마다 달라집니다.</Text>
      </View>
      <View style={styles.content}>
        <SurveyProgress current={currentIndex + 1} total={totalQuestions} />

        <Card style={styles.questionCard}>
          <SurveyQuestionCard question={currentQuestion} selectedValue={selectedValue} onSelect={handleSelect} />
        </Card>

        <View style={styles.buttonRow}>
          {currentIndex > 0 && (
            <Button title="이전" onPress={handlePrev} variant="secondary" style={styles.prevButton} />
          )}
          <Button
            title={currentIndex === totalQuestions - 1 ? '완료' : '다음'}
            onPress={handleNext}
            disabled={selectedValue === null}
            style={styles.nextButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  questionCard: {
    flex: 1,
    marginBottom: Spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  prevButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  completedCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  completedIcon: {
    fontSize: 48,
    color: Colors.primary,
    marginBottom: Spacing.lg,
  },
  completedTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  completedSubtitle: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  retryButton: {
    marginTop: Spacing.xl,
    minWidth: 160,
  },
  tooltip: {
    backgroundColor: Colors.primaryLight,
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  tooltipText: {
    ...Typography.caption,
    color: Colors.primarySoft,
  },
});
