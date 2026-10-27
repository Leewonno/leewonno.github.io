// 접힌 상태에서도 보이는 개선 수치 (예: 80KB → 20KB)
export type Metric = {
  before: string
  after: string
}

export type Highlight = {
  title: string
  description: string
  metric?: Metric
}

export type Experience = {
  company: string
  team: string
  role: string
  period: string
  highlights: readonly Highlight[]
}

export type Certification = {
  name: string
  issuer: string
  date: string
}

export type Education = {
  school: string
  major: string
  gpa: string
  period: string
}

export type SkillGroup = {
  category: string
  items: readonly string[]
}

export type Resume = {
  name: string
  headline: string
  email: string
  github: string
  avatar: string
  experiences: readonly Experience[]
  certifications: readonly Certification[]
  education: readonly Education[]
  skills: readonly SkillGroup[]
}

export const resume: Resume = {
  name: '이원노',
  headline: 'Frontend Developer',
  email: 'dldnjssh123@naver.com',
  github: 'https://github.com/Leewonno',
  avatar: 'https://github.com/Leewonno.png',
  experiences: [
    {
      company: '틸론',
      team: '프론티어연구소',
      role: 'Frontend Developer',
      period: '2026.06 ~ 재직 중',
      highlights: [
        {
          title: 'JupyterLab 오픈소스 코어 수정을 최소화하여 커스터마이징',
          description:
            '오픈소스 코어 수정 시 upstream 버전 업그레이드마다 충돌 위험 발생 → 변경 사항을 확장 패키지로 격리해 충돌 방지',
        },
        {
          title: 'API 요청마다 흩어진 에러 처리를 전역 에러 핸들러로 일원화',
          description:
            'API 요청마다 try/catch가 반복되는 구조 → 각 요청의 에러 처리 로직을 제거하고, TanStack Query의 meta 옵션에 에러 코드별 메시지를 매핑해 전역 핸들러가 메시지를 화면에 띄우도록 구성. 개별 처리가 필요한 요청은 별도 flag로 전역 핸들러를 건너뛰도록 예외 경로 마련',
        },
      ],
    },
    {
      company: '이로운소프트',
      team: 'SI 개발팀',
      role: 'Frontend Developer',
      period: '2025.12 ~ 2026.03',
      highlights: [
        {
          title: '단일 HTML을 화면별로 분리해 초기 HTML 크기 75% 감소',
          description:
            '7개 상세 화면이 하나의 HTML에 묶여 페이지 진입 시 열리지 않은 화면까지 로드 → 화면별로 코드를 분리해 클릭 시점에 fetch로 불러오도록 변경 후, 불러온 화면은 캐싱해 재요청 방지 → 초기 HTML 80KB에서 20KB로 75% 감소',
          metric: { before: '80KB', after: '20KB' },
        },
      ],
    },
    {
      company: '서울소프트',
      team: '모빌리티 개발팀',
      role: 'Fullstack Developer',
      period: '2024.04 ~ 2025.11',
      highlights: [
        {
          title: '1만 건 이상의 데이터가 있는 페이지의 로딩 시간 30초 → 1초',
          description:
            'Django 서버에서 1만 건 이상의 행을 HTML 테이블로 렌더링해 화면 표시까지 30초 이상 소요 → 데이터를 JSON으로 전달하고, 가상 스크롤을 지원하는 Tabulator로 브라우저에서 보이는 행만 렌더링하도록 변경해 페이지 로딩 시간 1초로 단축',
          metric: { before: '30초', after: '1초' },
        },
        {
          title: 'ERP 핵심 비즈니스 로직 설계',
          description:
            '급여 산정, 연차 관리 및 연차 수당 산정, 시내버스 배차, 선입선출 자재 단가 산정 등 ERP 핵심 비즈니스 로직 설계 및 구현',
        },
      ],
    },
  ],
  certifications: [
    { name: 'SQLD', issuer: '한국데이터베이스진흥센터', date: '2025.06' },
    { name: 'DSAC 3급', issuer: '한국생산성본부', date: '2022.07' },
    { name: 'KSTQB CTLB', issuer: '사단법인 케이에스티큐비', date: '2022.03' },
  ],
  education: [
    {
      school: '남서울대학교',
      major: '컴퓨터소프트웨어학과',
      gpa: '3.89 / 4.5',
      period: '2018.03 ~ 2024.02 (졸업)',
    },
  ],
  skills: [
    { category: 'Language', items: ['JavaScript', 'TypeScript', 'Python'] },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TanStack Query', 'Redux', 'Zustand'],
    },
    { category: 'Backend', items: ['Django', 'Node.js', 'NestJS'] },
    { category: 'Cloud/BaaS', items: ['AWS', 'Firebase', 'Supabase'] },
  ],
}
