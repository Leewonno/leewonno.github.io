export type Experience = {
  company: string
  role: string
  period: string
  highlights: readonly string[]
}

export type Resume = {
  name: string
  headline: string
  email: string
  github: string
  summary: string
  skills: readonly string[]
  experiences: readonly Experience[]
}

// TODO: 실제 이력 내용으로 교체
export const resume: Resume = {
  name: '이름',
  headline: '한 줄 소개',
  email: 'you@example.com',
  github: 'https://github.com/Leewonno',
  summary: '자기소개를 작성하세요.',
  skills: ['TypeScript', 'React'],
  experiences: [
    {
      company: '회사 이름',
      role: '역할',
      period: '2024.01 - 현재',
      highlights: ['주요 성과를 작성하세요.'],
    },
  ],
}
