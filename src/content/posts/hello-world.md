---
title: 블로그를 시작합니다
date: 2026-10-27
description: React + TypeScript + Vite 로 만든 블로그의 첫 글
tags: [blog, react]
---

## 글 작성 방법

`src/content/posts/` 에 마크다운 파일을 추가하면 글이 됩니다. 파일 이름이 URL 의 slug 가 됩니다.

```ts
// src/content/posts/my-post.md -> /blog/my-post
const greeting: string = 'Hello, world!'
```

| frontmatter | 필수 | 설명 |
| --- | --- | --- |
| `title` | O | 글 제목 |
| `date` | O | 작성일 (YYYY-MM-DD) |
| `description` | | 목록에 보이는 요약 |
| `tags` | | 태그 배열 |
| `draft` | | `true` 면 배포 빌드에서 제외 |
