# alog (ADHD Log)

ADHD 환자의 약물 복용 관리 및 증상 추적을 위한 통합 헬스케어 플랫폼

**Repository**: [github.com/healthcare-team12/alog](https://github.com/healthcare-team12/alog)

---

## 프로젝트 소개

alog는 ADHD 환자와 의료진을 연결하는 디지털 헬스케어 솔루션입니다. 환자는 모바일 앱을 통해 일상적인 약물 복용과 증상을 기록하고, 의료진은 웹 대시보드를 통해 환자 데이터를 모니터링할 수 있습니다.

### 핵심 가치

**신뢰 중심 디자인**
ADHD 환자의 인지적 특성을 고려하여 과도한 감정적 표현이나 시각적 자극을 배제하고, Navy 톤 단일 컬러로 인지 부하를 최소화했습니다.

**판단 없는 관찰**
"성공/실패" 같은 압박적 언어 대신 패턴 인식과 관찰을 유도하는 중립적 표현을 사용합니다.

---

## 프로젝트 구조

```
Competition/
├── application-section/    # 환자용 모바일 앱
│   ├── alog/              # React Native + Expo 앱
│   │   ├── app/           # Expo Router 기반 라우팅
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   ├── hooks/         # 커스텀 React 훅
│   │   └── utils/         # 유틸리티 함수
│   └── map/               # 디자인 및 구현 로드맵
│
├── web/                   # 의료진용 웹 대시보드
│   ├── server/            # Express.js 백엔드 API
│   ├── src/               # React 프론트엔드
│   └── docs/              # 프로젝트 문서
│
├── Makefile               # 통합 빌드 명령어
└── README.md              # 프로젝트 문서 (본 파일)
```

---

## 기술 스택

### 모바일 앱 (application-section/alog)

**프레임워크 및 런타임**
- React Native 0.81.5
- Expo SDK ~54.0.33
- TypeScript ~5.9.2
- Node.js 호환

**핵심 라이브러리**
- Expo Router ~6.0.23 (파일 기반 라우팅)
- AsyncStorage (로컬 데이터 저장)
- Expo Notifications (푸시 알림 시스템)
- React Native Reanimated (애니메이션)

**앱 정보**
- Bundle ID: `com.alog.app`
- 지원 플랫폼: iOS, Android

**주요 기능**
- **Today 탭**: 주간 약물 복용 및 설문 완료 추적 그래프
- **Report 탭**: 7일 증상 트렌드 및 약물 효과 분석
- **MyPage 탭**: 프로필 관리, 약물 목록, 알림 설정
- **설문 시스템**: 5문항 오후 자가 평가 (3점 척도)
- **알림 시스템**: 약물 복용 및 설문 리마인더

### 웹 대시보드 (web)

**프론트엔드**
- React 19.2.0
- Vite 7+
- TypeScript
- TailwindCSS 4.x
- React Router DOM 7.x

**백엔드**
- Express.js 5.2.1
- better-sqlite3 12.6.2 (SQLite 데이터베이스)
- TypeScript

**기능**
- 환자 데이터 조회 및 모니터링
- 증상 트렌드 시각화
- 약물 복용 이력 관리

---

## 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- iOS 개발: Xcode 및 CocoaPods
- Android 개발: Android Studio 및 SDK

### 모바일 앱 설치 및 실행

```bash
cd application-section/alog

# 의존성 설치
npm install

# 개발 서버 시작
npm start

# iOS 시뮬레이터 실행
npm run ios

# Android 에뮬레이터 실행
npm run android
```

### 웹 대시보드 설치 및 실행

```bash
cd web

# 의존성 설치 (프론트엔드 + 백엔드)
npm install
cd server && npm install && cd ..

# 개발 환경 실행 (프론트엔드 + 백엔드)
make dev

# 프로덕션 빌드
make build

# 데이터베이스 초기화
make db
```

---

## 개발 명령어

### 모바일 앱 (application-section/alog)

| 명령어 | 설명 |
|--------|------|
| `npm start` | Expo 개발 서버 시작 |
| `npm run ios` | iOS 시뮬레이터에서 앱 실행 |
| `npm run android` | Android 에뮬레이터에서 앱 실행 |
| `npm run web` | 웹 브라우저에서 앱 실행 (테스트용) |
| `npm test` | Jest 테스트 실행 |
| `npm run lint` | ESLint 코드 검사 |

### 웹 대시보드 (web)

| 명령어 | 설명 |
|--------|------|
| `make dev` | 프론트엔드 + 백엔드 개발 서버 동시 실행 |
| `make build` | 프로덕션 빌드 생성 |
| `make db` | SQLite 데이터베이스 초기화 |
| `make clean` | 빌드 아티팩트 정리 |

---

## 디자인 원칙

### ADHD 중심 UX

1. **인지 부하 감소**
   Navy 톤 단일 컬러 팔레트로 시각적 복잡도 최소화

2. **명확한 정보 계층**
   핵심 정보를 우선 배치하고 부가 정보는 단계적으로 제공

3. **압박 없는 언어**
   "완료", "미완료" 대신 "기록됨", "대기 중" 같은 중립적 표현 사용

4. **패턴 인식 유도**
   데이터를 시각화하여 사용자가 스스로 패턴을 발견하도록 지원

---

## 라이선스

본 프로젝트는 헬스케어 연구 목적으로 개발되었습니다.

---

## 문의

프로젝트 관련 문의사항은 GitHub Issues를 통해 남겨주시기 바랍니다.

**Repository**: [github.com/healthcare-team12/alog](https://github.com/healthcare-team12/alog)
