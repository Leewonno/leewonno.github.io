export type PlaygroundProject = {
  title: string
  // 배포된 사이트 주소
  url: string
  description: string
  stack: readonly string[]
  year: number
  // public/playground/ 아래 스크린샷 경로 (예: '/playground/moodtrack.png')
  // 16:10 비율로 위쪽부터 잘려 보이므로 1280x800 같은 크기가 가장 잘 맞음
  screenshot: string
  github?: string
}

// TODO: 샘플 프로젝트(Moodtrack, Bookshelf)를 실제 개인 프로젝트로 교체
export const projects: readonly PlaygroundProject[] = [
  {
    title: '질문서랍',
    url: 'https://chromewebstore.google.com/detail/question-drawer/mipekafnkjahilpfjkfhmmjjbhkofnlj',
    description: 'AI 답변에서 궁금한 내용을 질문으로 저장하는 크롬 확장 프로그램',
    stack: ['WXT', 'React', 'TypeScript', 'Tailwind CSS', 'Zod'],
    year: 2026,
    screenshot: '/playground/question-drawer.jpg',
    github: 'https://github.com/Leewonno/QuestionDrawer',
  },
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
