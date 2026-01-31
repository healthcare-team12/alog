/**
 * 시뮬레이터 로컬 푸시 알림 테스트 스크립트
 *
 * 사용법:
 *   npx expo run:ios 실행 중인 상태에서
 *   node test/send-local-push.js
 *
 * 시뮬레이터에서는 원격 푸시가 불가하므로
 * simctl push 명령으로 로컬 알림을 전송합니다.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 앱 번들 ID
// Expo Go 사용 시: host.exp.Exponent
// 커스텀 dev client 사용 시: app.json의 ios.bundleIdentifier
let bundleId = 'host.exp.Exponent';
try {
  const appJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'app.json'), 'utf8')
  );
  const customId = appJson.expo?.ios?.bundleIdentifier;
  if (customId) {
    bundleId = customId;
  }
} catch (e) {
  // fallback to Expo Go
}

const payload = {
  aps: {
    alert: {
      title: 'Alog 복약 알림',
      body: '약 먹었나요? 오늘 복약 여부를 기록해주세요!',
    },
    sound: 'default',
    badge: 1,
  },
};

const payloadPath = path.join(__dirname, '_push-payload.json');
fs.writeFileSync(payloadPath, JSON.stringify(payload, null, 2));

try {
  // 부팅된 시뮬레이터에 푸시 전송
  console.log('로컬 푸시 알림 전송 중...');
  console.log('  제목:', payload.aps.alert.title);
  console.log('  내용:', payload.aps.alert.body);
  console.log('  대상:', bundleId);
  console.log('');

  execSync(
    `xcrun simctl push booted "${bundleId}" "${payloadPath}"`,
    { stdio: 'inherit' }
  );

  console.log('전송 성공!');
} catch (err) {
  console.error('전송 실패:', err.message);
  process.exit(1);
} finally {
  // 임시 파일 정리
  try { fs.unlinkSync(payloadPath); } catch (_) {}
}
