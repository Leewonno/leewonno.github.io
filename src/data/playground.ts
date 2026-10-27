export type PlaygroundProject = {
  title: string
  // 배포된 사이트 주소
  url: string
  description: string
  stack: readonly string[]
  year: number
  // public/playground/ 아래 전체 페이지 스크린샷 경로 (예: '/playground/moodtrack.png')
  // 세로로 긴 이미지일수록 마우스를 올렸을 때 아래로 스크롤되며 보여짐
  screenshot: string
  github?: string
}

// TODO: 실제 개인 프로젝트로 교체
export const projects: readonly PlaygroundProject[] = [
  {
    title: 'Moodtrack',
    url: 'https://moodtrack.example.com',
    description: '하루의 감정을 색으로 기록하는 다이어리',
    stack: ['React', 'Supabase'],
    year: 2026,
    screenshot: '/playground/sample-moodtrack.svg',
    github: 'https://github.com/Leewonno',
  },
  {
    title: 'Bookshelf',
    url: 'https://bookshelf.example.com',
    description: '읽은 책을 책장처럼 쌓아 보는 독서 기록',
    stack: ['Next.js', 'Prisma'],
    year: 2025,
    screenshot: '/playground/sample-bookshelf.svg',
  },
]
