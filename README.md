# leewonno.github.io

기술 블로그 · 이력서 · 작업물 사이트. React + TypeScript + Vite 로 만들고 GitHub Pages 에 정적 배포합니다.

## 개발

```bash
npm install
npm run dev       # 로컬 개발 서버
npm run build     # dist/ 로 정적 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint
```

## 콘텐츠 수정

| 대상 | 위치 |
| --- | --- |
| 블로그 글 | `src/content/posts/*.md` (파일 이름 = URL slug) |
| 이력서 | `src/data/resume.ts` |
| 작업물 | `src/data/works.ts` (이미지는 `public/works/`) |
| 영상 | `src/data/video.ts` (`channel` = 채널 정보, `videos` = 롱폼, `shorts` = 쇼츠, 최신순 / 프로필 사진은 `public/video/`) |

블로그 글 frontmatter:

```yaml
---
title: 글 제목        # 필수
date: 2026-10-27      # 필수
description: 요약
tags: [react, vite]
draft: true           # 배포 빌드에서 제외
---
```

## 배포

`main` 브랜치에 push 하면 GitHub Actions (`.github/workflows/deploy.yml`) 가 빌드 후 GitHub Pages 에 배포합니다.

최초 1회: 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정해야 합니다.

`BrowserRouter` 를 쓰기 때문에 빌드 시 `dist/index.html` 을 `dist/404.html` 로 복사해, `/blog/xxx` 같은 경로로 직접 접근해도 앱이 뜨도록 합니다.
