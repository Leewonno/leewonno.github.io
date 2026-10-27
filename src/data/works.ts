export type Work = {
  title: string
  category: string
  year: number
  description: string
  // public/works/ 아래 이미지 경로 (예: '/works/sample.png')
  thumbnail?: string
  link?: string
}

// TODO: 개발 외 작업물로 교체
export const works: readonly Work[] = [
  {
    title: '작업물 제목',
    category: 'Design',
    year: 2026,
    description: '작업물 설명을 작성하세요.',
  },
]
