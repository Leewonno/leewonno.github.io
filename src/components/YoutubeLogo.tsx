import type { SVGProps } from 'react'

// 공식 YouTube 아이콘, 비율 10:7
// 라이트: 빨간 배경 + 흰 재생 삼각형 / 다크: 흰 배경 + 재생 삼각형 자리는 투명하게 뚫림
export default function YoutubeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28.57 20" {...props}>
      <path
        fillRule="evenodd"
        className="fill-[#ff0033] dark:fill-white"
        d="M27.97 3.12A3.58 3.58 0 0 0 25.45.6C23.22 0 14.29 0 14.29 0S5.35 0 3.12.6A3.58 3.58 0 0 0 .6 3.12C0 5.35 0 10 0 10s0 4.65.6 6.88a3.58 3.58 0 0 0 2.52 2.52c2.23.6 11.17.6 11.17.6s8.93 0 11.16-.6a3.58 3.58 0 0 0 2.52-2.52c.6-2.23.6-6.88.6-6.88s0-4.65-.6-6.88ZM11.43 14.29 18.85 10l-7.42-4.29v8.58Z"
      />
      <path className="fill-white dark:hidden" d="M11.43 14.29 18.85 10l-7.42-4.29v8.58Z" />
    </svg>
  )
}
