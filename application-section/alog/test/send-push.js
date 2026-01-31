/**
 * Alog 외부 푸시 알림 전송 스크립트
 *
 * 사용법:
 *   node test/send-push.js <EXPO_PUSH_TOKEN>
 *
 * 예시:
 *   node test/send-push.js ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
 *
 * 토큰 확인 방법:
 *   앱 실행 후 콘솔 로그에서 "[Alog] Expo Push Token: ExponentPushToken[...]" 확인
 *
 * 알림 종류:
 *   --type medication  복약 알림 (기본값)
 *   --type survey      설문 알림
 *   --title "제목"     커스텀 제목
 *   --body "내용"      커스텀 내용
 */

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

const PRESETS = {
  medication: {
    title: 'Alog 복약 알림',
    body: '오늘 복약 여부를 남기면 나의 기록 리포트를 채울 수 있어요!',
  },
  survey: {
    title: 'Alog 설문 알림',
    body: '오늘 하루 어땠나요? 2분만 기록하면 오늘 요약이 완성돼요',
  },
};

function parseArgs(args) {
  const result = { type: 'medication', title: null, body: null, token: null };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--type' && args[i + 1]) {
      result.type = args[++i];
    } else if (args[i] === '--title' && args[i + 1]) {
      result.title = args[++i];
    } else if (args[i] === '--body' && args[i + 1]) {
      result.body = args[++i];
    } else if (!args[i].startsWith('--')) {
      result.token = args[i];
    }
  }

  return result;
}

async function sendPush(token, title, body) {
  const message = {
    to: token,
    sound: 'default',
    title,
    body,
  };

  console.log('전송 중...');
  console.log('  대상:', token);
  console.log('  제목:', title);
  console.log('  내용:', body);
  console.log('');

  const response = await fetch(EXPO_PUSH_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  const data = await response.json();

  if (data.data?.status === 'ok') {
    console.log('전송 성공!');
  } else {
    console.log('전송 결과:', JSON.stringify(data, null, 2));
  }
}

// --- main ---
const args = parseArgs(process.argv.slice(2));

if (!args.token) {
  console.log('사용법: node test/send-push.js <EXPO_PUSH_TOKEN> [옵션]');
  console.log('');
  console.log('옵션:');
  console.log('  --type medication|survey   알림 종류 (기본: medication)');
  console.log('  --title "제목"             커스텀 제목');
  console.log('  --body "내용"              커스텀 내용');
  console.log('');
  console.log('토큰 확인: 앱 실행 후 콘솔에서 [Alog] Expo Push Token 로그 확인');
  process.exit(1);
}

const preset = PRESETS[args.type] || PRESETS.medication;
const title = args.title || preset.title;
const body = args.body || preset.body;

sendPush(args.token, title, body);
