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
        className="group flex w-full cursor-pointer items-start gap-3 text-left"
      >
        <span className="flex-1 text-base font-medium transition-colors duration-300 group-hover:text-accent motion-reduce:transition-none sm:text-[1.0625rem]">
          {highlight.title}
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
          <p className="pt-1.5 pr-7 pb-1 text-[0.9375rem] text-muted sm:text-base">
            {highlight.description}
          </p>
        </div>
      </div>
    </div>
  )
}
