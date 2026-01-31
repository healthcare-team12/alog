import { WeeklyRecord, ConditionBadge, SymptomLine } from '../types';

// 오늘 탭 - 주간 기록
export const WEEKLY_RECORDS: WeeklyRecord[] = [
  { day: '월', date: '2026-01-27', status: 'complete' },
  { day: '화', date: '2026-01-28', status: 'complete' },
  { day: '수', date: '2026-01-29', status: 'partial' },
  { day: '목', date: '2026-01-30', status: 'complete' },
  { day: '금', date: '2026-01-31', status: 'incomplete' },
  { day: '토', date: '2026-02-01', status: 'partial' },
  { day: '일', date: '2026-02-02', status: 'incomplete' },
];

// 오늘 탭 - 컨디션 배지
export const CONDITION_BADGES: ConditionBadge[] = [
  { label: '집중', status: 'good', description: '양호한 흐름' },
  { label: '실행', status: 'normal', description: '보통 수준' },
  { label: '부작용', status: 'bad', description: '주의 필요' },
];

// 리포트 탭 - 증상 선 그래프 데이터
export const SYMPTOM_LINES: SymptomLine[] = [
  {
    label: '주의력',
    color: '#3E4095',
    data: [
      { day: '월', value: 2 },
      { day: '화', value: 3 },
      { day: '수', value: 2 },
      { day: '목', value: 4 },
      { day: '금', value: 3 },
      { day: '토', value: 2 },
      { day: '일', value: 3 },
    ],
  },
  {
    label: '조절',
    color: '#7BC67E',
    data: [
      { day: '월', value: 3 },
      { day: '화', value: 2 },
      { day: '수', value: 3 },
      { day: '목', value: 3 },
      { day: '금', value: 4 },
      { day: '토', value: 3 },
      { day: '일', value: 2 },
    ],
  },
  {
    label: '실행',
    color: '#E8C547',
    data: [
      { day: '월', value: 4 },
      { day: '화', value: 3 },
      { day: '수', value: 4 },
      { day: '목', value: 2 },
      { day: '금', value: 3 },
      { day: '토', value: 4 },
      { day: '일', value: 3 },
    ],
  },
];

// 리포트 탭 - 복약/설문 완료 현황
export const COMPLETION_DATA = [
  { day: '월', medication: true, survey: true },
  { day: '화', medication: true, survey: true },
  { day: '수', medication: true, survey: false },
  { day: '목', medication: true, survey: true },
  { day: '금', medication: false, survey: false },
  { day: '토', medication: true, survey: false },
  { day: '일', medication: true, survey: true },
];

// 리포트 탭 - 약 특성 카드
export const MEDICATION_CHARACTERISTICS = [
  {
    title: '효과',
    items: ['집중력 향상', '과제 완수율 증가', '충동 조절 개선'],
  },
  {
    title: '부작용',
    items: ['입마름', '식욕 감소', '수면 지연'],
  },
];

// 리포트 탭 - 메트릭 카드 데이터
export const METRIC_COMPLETION_RATE = {
  rate: 71,
};

export const METRIC_TREND = {
  peakLabel: '주의력',
};

// 마이 페이지 - 프로필
export const USER_PROFILE = {
  nickname: '민수',
  avatar: undefined,
};

// 마이 페이지 - 알림 시간
export const NOTIFICATION_TIMES = {
  morningTime: '08:00',
  afternoonTime: '18:00',
};

// 시드 약 데이터
export const SEED_MEDICATIONS = [
  {
    id: 'med-1',
    name: '콘서타 OROS',
    dosage: '27mg',
    frequency: '1회',
    period: '3개월',
    memo: '아침 식후 복용',
  },
  {
    id: 'med-2',
    name: '아토목세틴',
    dosage: '40mg',
    frequency: '1회',
    period: '',
    memo: '',
  },
];
