# leewonno.github.io

이원노의 개인 사이트입니다. 블로그, 이력서, 개인 프로젝트, 유튜브 채널, 연재 소설을 한곳에 모았습니다.
React + TypeScript + Vite 로 만들고 GitHub Pages 에 정적 배포합니다.

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 각 페이지 미리보기를 모은 벤토 그리드 홈 |
| `/blog`, `/blog/:slug` | 기술 블로그 목록 / 글 상세 (giscus 댓글) |
| `/resume` | 이력서 |
| `/playground` | 개인 프로젝트 (`/works` 는 여기로 리다이렉트) |
| `/video` | 유튜브 채널과 롱폼·쇼츠 목록 |
| `/novel` | 연재 소설 |

다크 모드는 OS 설정(`prefers-color-scheme`)을 따릅니다.

## 기술 스택

- **React 19**, **React Router 8** (`BrowserRouter`)
- **TypeScript 7**, **Vite 8**
- **Tailwind CSS 4** + `@tailwindcss/typography`
- 마크다운: `react-markdown` + `remark-gfm` + `rehype-highlight` (highlight.js)
- frontmatter 파싱·검증: `yaml` + `zod`
- 아이콘: `unplugin-icons` 로 **Akar Icons** 만 사용 (`import X from '~icons/akar-icons/<name>'`)
- 린트: `oxlint`

## 개발

```bash
npm install
npm run dev       # 로컬 개발 서버
npm run build     # 타입 체크 후 dist/ 로 정적 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint
```

`@/` 는 `src/` 를 가리킵니다.

## 콘텐츠 수정

콘텐츠는 모두 코드 안의 데이터 파일과 마크다운으로 관리합니다. 이미지는 `public/` 아래에 두고 `/` 로 시작하는 경로로 참조합니다.

| 대상 | 데이터 | 이미지 |
| --- | --- | --- |
| 블로그 글 | `src/content/posts/*.md` (파일 이름 = URL slug) | `public/blog/<slug>/` |
| 이력서 | `src/data/resume.ts` | `public/resume/` (프로필, 회사 로고) |
| 개인 프로젝트 | `src/data/playground.ts` | `public/playground/` |
| 영상 | `src/data/video.ts` | `public/video/` (채널 프로필) |
| 소설 | `src/data/novel.ts` | `public/novel/` (표지) |

- **Playground**: 스크린샷은 16:10 비율로 위쪽부터 잘려 보이므로 1280x800 크기가 가장 잘 맞습니다. 없으면 제목만 표시됩니다.
- **영상**: `channel` 은 채널 정보, `videos` 는 롱폼, `shorts` 는 쇼츠이며 최신순으로 적습니다. 구독자·조회수는 직접 갱신하는 스냅샷입니다.
- **소설**: 최신 작품을 위에 추가합니다. `status` 는 `ongoing` / `completed` / `paused` 중 하나입니다.

### 블로그 글 frontmatter

```yaml
---
title: 글 제목        # 필수
date: 2026-10-27      # 필수
description: 요약
tags: [react, vite]
draft: true           # 배포 빌드에서 제외 (개발 서버에서는 보임)
---
```

frontmatter 가 형식에 맞지 않으면 빌드가 실패합니다 (`src/lib/posts.ts`).

### 댓글

블로그 글 하단 댓글은 [giscus](https://giscus.app) 로, 이 저장소의 GitHub Discussions (`Announcements` 카테고리)에 저장됩니다.
글마다 slug 로 Discussion 을 매핑하므로 **이미 댓글이 달린 글의 파일 이름을 바꾸면 기존 댓글과 연결이 끊깁니다.** 설정값은 `src/components/Comments.tsx` 에 있습니다.

## 배포

`main` 브랜치에 push 하면 GitHub Actions (`.github/workflows/deploy.yml`) 가 lint → build 후 GitHub Pages 에 배포합니다. 작업은 `develop` 브랜치에서 하고 PR 로 `main` 에 합칩니다.

최초 1회: 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정해야 합니다.

`BrowserRouter` 를 쓰기 때문에 빌드 시 `dist/index.html` 을 `dist/404.html` 로 복사해, `/blog/xxx` 같은 경로로 직접 접근해도 앱이 뜨도록 합니다.
