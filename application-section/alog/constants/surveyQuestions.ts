import { SurveyQuestion } from '../types';

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    question: '낮 동안 심장 두근거림이나 입마름이 불편했나요?',
    options: [
      { value: 1, label: '편안함', description: '느껴지지 않음' },
      { value: 2, label: '보통', description: '약간 느껴짐' },
      { value: 3, label: '심함', description: '불편해서 신경 쓰임' },
    ],
  },
  {
    id: 2,
    question: '주변 소음이나 자극이 평소보다 크게 느껴졌나요?',
    options: [
      { value: 1, label: '둔함', description: '신경 안 쓰임' },
      { value: 2, label: '보통', description: '적당히 넘김' },
      { value: 3, label: '예민함', description: '작은 소리에도 곤두섬' },
    ],
  },
  {
    id: 3,
    question: '타인의 말을 오해하거나 공격적으로 반응한 적이 있나요?',
    options: [
      { value: 1, label: '여유로움', description: '웃으며 넘김' },
      { value: 2, label: '보통', description: '무난하게 대화' },
      { value: 3, label: '욱함', description: '나도 모르게 공격함' },
    ],
  },
  {
    id: 4,
    question: '게임, 쇼핑 등 자극적인 것에 꽂혀 멈추기 힘든 적이 있었나요?',
    options: [
      { value: 1, label: '절제함', description: '적당히 즐김' },
      { value: 2, label: '보통', description: '무난하게 멈춤' },
      { value: 3, label: '못 멈춤', description: '머리는 아는데 손이 안 멈춤' },
    ],
  },
  {
    id: 5,
    question: '몸은 피곤한데 머리가 계속 돌아가 잠들기 힘든가요?',
    options: [
      { value: 1, label: '안정됨', description: '평온하게 졸림' },
      { value: 2, label: '피곤함', description: '지쳐서 잠들 것 같음' },
      { value: 3, label: '쌩쌩함', description: '몸은 방전인데 뇌는 깨어있음' },
    ],
  },
];
