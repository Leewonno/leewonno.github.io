export type NovelStatus = 'ongoing' | 'completed' | 'paused'

export type Novel = {
  title: string
  penName: string
  // 연재처 (예: '카카오페이지')
  platform: string
  // public/novel/ 아래 이미지 경로 (예: '/novel/sample.jpg')
  thumbnail: string
  url: string
  status: NovelStatus
  // YYYY-MM-DD
  startedAt: string
  // YYYY-MM-DD, 완결·중단 작품의 마지막 회차 날짜 (연재 중이면 생략)
  endedAt?: string
  // 수상 내역 (예: '밀리로드 공모전 장려상')
  award?: string
}

// 최신 작품이 위로 오도록 추가
export const novels: readonly Novel[] = [
  {
    title: '프리미어',
    penName: '설경2',
    platform: '밀리로드',
    // 밀리로드 기본 제공 표지
    thumbnail: '/novel/premiere.jpg',
    url: 'https://www.millie.co.kr/v4/millieRoad/36825',
    status: 'paused',
    startedAt: '2026-05-11',
    endedAt: '2026-05-31',
    award: '2026 밀리로드 출간 공모전 장려상',
  },
  {
    title: '생명의 은인',
    penName: '설경2',
    platform: '카카오페이지',
    thumbnail: '/novel/saengmyeong-ui-eunin.jpg',
    url: 'https://page.kakao.com/content/61431753',
    status: 'completed',
    startedAt: '2023-03-10',
    endedAt: '2023-07-28',
  },
]
