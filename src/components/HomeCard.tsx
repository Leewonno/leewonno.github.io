import type { ReactNode } from 'react'
import { Link } from 'react-router'
import ArrowUpRight from '~icons/akar-icons/arrow-up-right'

export const homeCardClass =
  'flex flex-col rounded-[1.25rem] border border-border p-5'

type HomeCardProps = {
  to: string
  label: string
  // 벤토 그리드에서 차지하는 칸 (예: 'sm:col-span-4')
  className?: string
  children: ReactNode
}

// 홈 벤토 그리드의 페이지 미리보기 카드, 카드 전체가 해당 페이지 링크
export default function HomeCard({ to, label, className = '', children }: HomeCardProps) {
  return (
    <Link
      to={to}
      className={`group ${homeCardClass} transition-colors duration-300 hover:bg-code motion-reduce:transition-none ${className}`}
    >
      <h2 className="mb-3.5 flex items-center justify-between text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
        {label}
        <ArrowUpRight
          width={16}
          height={16}
          className="transition-colors duration-300 group-hover:text-foreground motion-reduce:transition-none"
          aria-hidden
        />
      </h2>
      {children}
    </Link>
  )
}
