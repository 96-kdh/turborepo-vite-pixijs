#!/usr/bin/env sh

# curl 설치
apk --no-cache add curl

# env.local.json 에서 BOT_TOKEN 읽기
BOT_TOKEN=$(node -p "require('./env.local.json').TelegramWebHookFunction.BOT_TOKEN")
echo "▶ Using BOT_TOKEN=$BOT_TOKEN"

# LocalTunnel 실행 (호스트의 3001 → 컨테이너 내부)
npx localtunnel --port 3001 \
                --local-host host.docker.internal \
                --subdomain my-slots-bot 2>&1 | tee /tmp/lt.log &
LT_PID=$!

# “your url is:” 로그 떴을 때까지 대기
until grep -q "your url is:" /tmp/lt.log; do
  sleep 1
done

# 실제 URL 뽑아서
URL=$(grep -m1 "your url is:" /tmp/lt.log | awk '{print $4}')
echo "▶ LocalTunnel URL detected: $URL"

# Webhook 한 번 등록
curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
     -d "url=${URL}/bot/telegram-webhook"
echo "✅ Webhook registration complete."

# 터널 프로세스가 살아있는 한 컨테이너 유지
wait "$LT_PID"
EOF
