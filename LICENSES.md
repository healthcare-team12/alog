# 제3자 라이선스

이 문서는 alog 프로젝트에서 사용하는 모든 제3자 오픈소스 라이브러리의 라이선스 정보를 포함합니다.

## 프로젝트 구조

alog 프로젝트는 두 개의 주요 하위 프로젝트로 구성되어 있습니다:

1. **application-section**: React Native/Expo 기반 모바일 애플리케이션
2. **web**: React 기반 웹 대시보드

---

## application-section (모바일 앱)

### 라이선스 분포

총 패키지 수: 약 680개

| 라이선스 | 패키지 수 |
|---------|----------|
| MIT | 583 |
| ISC | 40 |
| BSD-3-Clause | 15 |
| Apache-2.0 | 13 |
| BlueOak-1.0.0 | 8 |
| BSD-2-Clause | 7 |
| Unlicense | 2 |
| 0BSD | 2 |
| MPL-2.0 | 2 |
| (MIT OR CC0-1.0) | 2 |
| Python-2.0 | 1 |
| CC-BY-4.0 | 1 |
| (BSD-3-Clause OR GPL-2.0) | 1 |
| (BSD-2-Clause OR MIT OR Apache-2.0) | 1 |

### 직접 의존성 (16개)

| 패키지 | 버전 | 라이선스 |
|--------|------|---------|
| expo | ~54.0.33 | MIT |
| expo-router | ~6.0.23 | MIT |
| react | 19.1.0 | MIT |
| react-native | 0.81.5 | MIT |
| @react-native-async-storage/async-storage | 2.2.0 | MIT |
| expo-notifications | ~0.32.16 | MIT |
| @expo/vector-icons | ^15.0.3 | MIT |
| react-native-safe-area-context | ~5.6.0 | MIT |
| react-native-screens | ~4.16.0 | MIT |
| expo-constants | ~18.0.13 | MIT |
| expo-device | ~8.0.10 | MIT |
| expo-linking | ~8.0.11 | MIT |
| expo-status-bar | ~3.0.9 | MIT |
| expo-dev-client | ~6.0.20 | MIT |
| @types/react | ~19.1.0 | MIT |
| typescript | ~5.9.2 | Apache-2.0 |

---

## web (웹 대시보드)

### 라이선스 분포

총 패키지 수: 약 324개

| 라이선스 | 패키지 수 |
|---------|----------|
| MIT | 267 |
| ISC | 23 |
| Apache-2.0 | 16 |
| BSD-2-Clause | 6 |
| BSD-3-Clause | 4 |
| MPL-2.0 | 2 |
| Python-2.0 | 1 |
| CC-BY-4.0 | 1 |
| (MIT OR WTFPL) | 1 |
| (BSD-2-Clause OR MIT OR Apache-2.0) | 1 |
| 0BSD | 1 |

### 직접 의존성

#### 프로덕션 의존성 (7개)

| 패키지 | 버전 | 라이선스 |
|--------|------|---------|
| react | ^19.2.0 | MIT |
| react-dom | ^19.2.0 | MIT |
| react-router-dom | ^7.13.0 | MIT |
| express | ^5.2.1 | MIT |
| better-sqlite3 | ^12.6.2 | MIT |
| cors | ^2.8.6 | MIT |

#### 개발 의존성 (19개)

| 패키지 | 버전 | 라이선스 |
|--------|------|---------|
| typescript | ~5.9.3 | Apache-2.0 |
| vite | ^7.2.4 | MIT |
| @vitejs/plugin-react | ^5.1.1 | MIT |
| tsx | ^4.21.0 | MIT |
| concurrently | ^9.2.1 | MIT |
| tailwindcss | ^4.1.18 | MIT |
| @tailwindcss/vite | ^4.1.18 | MIT |
| eslint | ^9.39.1 | MIT |
| typescript-eslint | ^8.46.4 | MIT |
| eslint-plugin-react-hooks | ^7.0.1 | MIT |
| eslint-plugin-react-refresh | ^0.4.26 | MIT |
| @types/react | ~19.1.0 | MIT |
| @types/react-dom | ~19.1.0 | MIT |
| @types/node | ^24 | MIT |
| @types/express | ^5 | MIT |
| @types/better-sqlite3 | ^7 | MIT |
| @types/cors | ^2 | MIT |

---

## 주요 라이선스 설명

### MIT License
- 가장 널리 사용되는 허용적(permissive) 오픈소스 라이선스
- 상업적 사용, 수정, 배포, 재라이선스 자유
- 저작권 고지와 라이선스 전문 포함 필수
- 보증 없음(no warranty) 조항 포함
- 프로젝트 내 대부분의 패키지(약 85%)가 사용

### Apache License 2.0
- 특허권 관련 명시적 보호 조항을 포함한 허용적 라이선스
- 상업적 사용, 수정, 배포 자유
- 수정 사항 명시 필요
- 특허 소송 제기 시 라이선스 종료
- TypeScript 등 주요 도구에서 사용

### ISC License
- MIT와 기능적으로 동일하나 더 간결한 문구
- 허용적 라이선스
- 저작권 고지 필요
- npm 패키지에서 널리 사용

### BSD-2-Clause License (Simplified BSD License)
- 허용적 라이선스
- 재배포 시 저작권 고지 및 라이선스 전문 포함 필수
- 소스 코드와 바이너리 형태 모두 재배포 가능

### BSD-3-Clause License (Modified BSD License)
- BSD-2-Clause에 보증 금지 조항 추가
- 저작자/기여자의 이름을 사전 허가 없이 홍보에 사용 금지
- 허용적 라이선스

### MPL-2.0 (Mozilla Public License 2.0)
- 파일 단위 약한 카피레프트(weak copyleft) 라이선스
- 수정한 MPL 파일은 동일 라이선스로 공개 필요
- 다른 파일은 다른 라이선스 사용 가능
- lightningcss(Tailwind CSS v4 의존성)에서 사용
- 상업적 사용 가능

### CC-BY-4.0 (Creative Commons Attribution 4.0)
- 저작자 표시 조건의 크리에이티브 커먼즈 라이선스
- 주로 데이터나 문서에 사용
- caniuse-lite(브라우저 호환성 데이터)에서 사용
- 상업적 사용 가능, 수정 및 재배포 자유

### BlueOak-1.0.0
- 현대적이고 간결한 허용적 라이선스
- MIT/ISC와 유사한 자유도
- 명확한 법적 용어 사용

### 0BSD / Unlicense
- 퍼블릭 도메인에 가까운 최대 허용적 라이선스
- 저작권 고지 요구사항 없음
- 완전한 자유 사용

### Python-2.0
- Python Software Foundation 라이선스
- GPL 호환 허용적 라이선스
- 상업적 사용 가능

---

## 라이선스 준수 사항

본 프로젝트는 모든 제3자 라이브러리의 라이선스 조건을 준수합니다:

1. **저작권 고지**: 모든 라이브러리의 저작권 고지 및 라이선스 전문을 보존합니다.
2. **소스 코드 배포**: MPL-2.0 라이선스 파일 수정 시 해당 파일의 소스 코드를 제공합니다.
3. **라이선스 전문 포함**: 배포 시 본 LICENSES.md 파일 및 각 패키지의 LICENSE 파일을 포함합니다.
4. **상표권 존중**: 프로젝트 이름 및 로고를 무단으로 사용하지 않습니다.

---

## 전체 의존성 라이선스 확인

각 하위 프로젝트의 전체 의존성 라이선스는 다음 명령어로 확인할 수 있습니다:

### application-section (모바일 앱)
```bash
cd application-section/alog
npx license-checker --summary
```

### web (웹 대시보드)
```bash
cd web
npx license-checker --summary
```

---

## 라이선스 전문

각 패키지의 라이선스 전문은 해당 패키지의 `node_modules` 디렉토리 내 LICENSE 또는 README 파일에서 확인할 수 있습니다.

주요 라이선스 전문:
- MIT: https://opensource.org/licenses/MIT
- Apache-2.0: https://www.apache.org/licenses/LICENSE-2.0
- ISC: https://opensource.org/licenses/ISC
- BSD-2-Clause: https://opensource.org/licenses/BSD-2-Clause
- BSD-3-Clause: https://opensource.org/licenses/BSD-3-Clause
- MPL-2.0: https://www.mozilla.org/en-US/MPL/2.0/
- CC-BY-4.0: https://creativecommons.org/licenses/by/4.0/

---

**최종 업데이트**: 2026-02-01

**참고**: 패키지 버전 업데이트 시 라이선스가 변경될 수 있으므로, 정기적으로 의존성 라이선스를 검토하는 것을 권장합니다.
