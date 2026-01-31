.PHONY: install db dev server build lint clean help

WEB_DIR := web
DB_FILE := $(WEB_DIR)/clinic.db

help: ## 사용 가능한 명령어 목록
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: $(WEB_DIR)/node_modules ## npm 의존성 설치

$(WEB_DIR)/node_modules: $(WEB_DIR)/package.json
	cd $(WEB_DIR) && npm install
	@touch $@

db: install $(DB_FILE) ## SQLite 데이터베이스 생성 및 시드 데이터 삽입

$(DB_FILE): $(WEB_DIR)/server/db.ts $(WEB_DIR)/server/seed.ts
	cd $(WEB_DIR) && npx tsx -e "import { seed } from './server/seed.js'; seed();"

dev: install ## 프론트엔드 + 백엔드 동시 실행
	cd $(WEB_DIR) && npm run dev:all

server: install ## 백엔드 서버만 실행
	cd $(WEB_DIR) && npm run server

build: install ## 프로덕션 빌드
	cd $(WEB_DIR) && npm run build

lint: install ## ESLint 검사
	cd $(WEB_DIR) && npm run lint

clean: ## DB 및 빌드 산출물 삭제
	rm -f $(DB_FILE) $(DB_FILE)-shm $(DB_FILE)-wal
	rm -rf $(WEB_DIR)/dist
