# 🎵 프로젝트 이름: IMS (I’m Solo)

![IMS 로고](https://github.com/user-attachments/assets/7ddc5c50-3106-4ab0-9982-ea1eef3d0914)

이 프로젝트는 혼자서 PR을 리뷰해주는 AI 리뷰 파트너를 만들고자 시작되었습니다.

"IMS"는 "I’m Solo"의 약자로, **혼자서도 전문가처럼 코드 리뷰를 받아 보자!**는 의미를 담고 있습니다.

GitHub Pull Request에 대해 자동으로 시맨틱 품질 리뷰를 수행하고, 리뷰 내용을 댓글로 남기는 AI 기반 코드 리뷰 서비스입니다.

Next.js + TypeScript + Tailwind로 작성된 프론트엔드 프로젝트에서 코드 의미, SSR 구조, 시맨틱 HTML, 접근성 등을 분석합니다.

---

## 🚀 주요 기능

- PR 생성/수정 이벤트 자동 감지 (GitHub Webhook)
- 변경된 diff 추출 후 LLaMA 3 기반 AI 코드 리뷰 수행
- 리뷰 결과를 한국어 Markdown 형식으로 PR에 자동 댓글 작성
- Semantic HTML, SSR, 네이밍, 접근성, 리팩토링 기준 분석
- 리뷰 결과는 `logs/` 디렉토리에 JSON으로 저장

---

## 🧠 시스템 구성

| 항목        | 설명                                                           |
| ----------- | -------------------------------------------------------------- |
| MCP 서버    | Fastify + TypeScript로 작성된 Node.js 서버                     |
| LLM         | 로컬 Ollama + LLaMA 3                                          |
| 터널링      | ngrok 또는 localtunnel 사용 가능                               |
| GitHub 연동 | Webhook + REST API (`pulls.listFiles`, `issues.createComment`) |

---

## 🛠️ 설치 및 실행

1. 패키지 설치

```bash
pnpm install

or

yarn install

or

npm install
```

2. `.env` 파일 생성

```env
GITHUB_TOKEN=your_personal_access_token
WEBHOOK_SECRET=optional_secret
NGROK_DOMAIN=your-ngrok-domain.ngrok.io
```

3. MCP 서버 실행

```bash
pnpm run dev

or

yarn dev

or

npm run dev
```

---

## 📁 `.env` 예시 (`.env.example` 참고)

```
GITHUB_TOKEN=ghp_xxxxxxxx
NGROK_DOMAIN=my-mcp.ngrok.io
```

> `.env` 파일은 절대 커밋하지 마세요. `.gitignore`에 포함되어 있습니다.

---

## 📦 프로젝트 구조

```
ims/
├─ src/
│  ├─ server.ts
│  ├─ routes/github-webhook.ts
│  ├─ services/
│  │  ├─ github.service.ts
│  │  ├─ ai.service.ts
│  │  ├─ review.service.ts
├─ prompts/
│  └─ review.txt
├─ logs/
│  └─ mcp-review.log
├─ .env        ← 비공개 환경 변수
├─ start-mcp.bat
```

---

## 🔒 보안 가이드

- `.env`, `logs/`, `start-mcp.bat`는 모두 `.gitignore`에 포함
- PR diff에는 민감한 정보가 포함될 수 있으므로 로그는 공개하지 마세요
- Webhook은 서명 검증(X-Hub-Signature-256) 추가를 권장합니다

---

## 👨‍💻 사용 예시

1. PR을 열거나 커밋을 푸시하면,
2. GitHub Webhook이 `/webhook` 엔드포인트를 호출하고,
3. AI가 diff 분석 후, 자동으로 리뷰 코멘트를 작성합니다 ✨

---

## 🧪 예시 리뷰 출력

> 📄 File: apps/user/app/page.tsx  
> 🧱 Semantic HTML  
> 위치: 8-19번째 줄  
> 문제 설명: 중첩된 div와 의미 없는 p 태그가 반복 사용되어 시맨틱 구조가 무너져 있습니다.  
> 제안: `<main>`, `<section>` 태그를 사용해 구조를 명확히 하세요.

---

## 📜 라이선스

이 프로젝트는 MIT 라이선스 하에 공개되어 있습니다.  
자유롭게 복사, 수정, 배포가 가능하지만, 원저작자의 이름과 라이선스 고지를 유지해야 합니다.
