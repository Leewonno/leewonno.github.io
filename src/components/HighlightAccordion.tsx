import { useId, useState } from 'react'
import ChevronDown from '~icons/akar-icons/chevron-down'
import type { Highlight } from '@/data/resume'

type HighlightAccordionProps = {
  highlight: Highlight
}

// <details>는 높이 전환을 Safari·Firefox에서 지원하지 않아 grid-rows 0fr → 1fr 전환으로 구현
export default function HighlightAccordion({ highlight }: HighlightAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="-mx-3 flex w-[calc(100%+1.5rem)] cursor-pointer items-start gap-3 rounded-md px-3 py-2 text-left transition-colors duration-300 hover:bg-code motion-reduce:transition-none"
      >
        {/* 좁은 화면에서는 지표를 제목 아래 줄로 내림 */}
        <span className="flex flex-1 items-start gap-3 max-sm:flex-col max-sm:gap-0.5">
          <span className="flex-1 text-[0.9375rem] font-semibold sm:text-base">{highlight.title}</span>
          {highlight.metric && (
            <span className="shrink-0 text-xs text-muted tabular-nums sm:pt-0.5 sm:text-[0.8125rem]">
              {highlight.metric.before} →{' '}
              <span className="font-semibold text-foreground">{highlight.metric.after}</span>
            </span>
          )}
        </span>
        <ChevronDown
          width={16}
          height={16}
          aria-hidden
          className={`mt-1 shrink-0 text-muted transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={panelId}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="pr-7 pb-3 text-sm text-muted sm:text-[0.9375rem]">{highlight.description}</p>
        </div>
      </div>
    </div>
  )
}
