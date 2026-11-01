import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react'
import { NavLink, useLocation } from 'react-router'
import Cross from '~icons/akar-icons/cross'
import ThreeLineHorizontal from '~icons/akar-icons/three-line-horizontal'

type MobileNavProps = {
  items: readonly {
    to: string
    label: string
    Icon: ComponentType<SVGProps<SVGSVGElement>>
  }[]
}

// 좁은 화면(sm 미만) 전용 메뉴, 엄지가 닿는 오른쪽 아래 버튼이 메뉴 카드로 커짐
export default function MobileNav({ items }: MobileNavProps) {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // 뒤로 가기처럼 메뉴를 거치지 않은 이동에서도 닫힘
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      buttonRef.current?.focus()
    }
    // 가로 회전 등으로 sm 이상이 되면 메뉴가 숨겨지므로 닫아서 스크롤 잠금도 풀어줌
    const desktop = window.matchMedia('(min-width: 40rem)')
    const handleResize = () => {
      if (desktop.matches) setIsOpen(false)
    }
    const root = document.documentElement
    root.classList.add('overflow-hidden')
    window.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleResize)
    return () => {
      root.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleResize)
    }
  }, [isOpen])

  return (
    <div className="sm:hidden">
      <div
        aria-hidden
        className={`fixed inset-0 z-40 touch-none bg-background/70 transition-opacity duration-200 motion-reduce:transition-none ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={close}
      />
      <div
        className="fixed right-5 bottom-6 z-40 size-14"
        onBlur={(event) => {
          // Tab 으로 메뉴 밖으로 나가면 포커스가 어두운 배경 뒤로 숨지 않게 닫음
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) close()
        }}
      >
        {/* 카드 높이 h-82 = 버튼 자리(3.25rem) + 메뉴 5줄(h-13) + 위아래 여백(p-2), 낮은 화면에선 화면 안으로 줄어듦 */}
        <div
          className={`absolute right-0 bottom-0 max-h-[calc(100dvh-3rem)] border bg-background shadow-lg transition-all duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'h-82 w-56 rounded-[1.25rem] border-border' : 'size-14 rounded-[1.75rem] border-transparent'}`}
        />
        <button
          ref={buttonRef}
          type="button"
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          className={`absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full bg-foreground text-background transition-transform duration-100 active:scale-95 motion-reduce:transition-none ${isOpen ? '' : 'shadow-lg'}`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <ThreeLineHorizontal
            width={22}
            height={22}
            aria-hidden
            className={`absolute transition duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-90 opacity-0' : ''}`}
          />
          <Cross
            width={22}
            height={22}
            aria-hidden
            className={`absolute transition duration-200 motion-reduce:transition-none ${isOpen ? '' : '-rotate-90 opacity-0'}`}
          />
        </button>
        {/* 닫힐 때 항목이 사라지는 동안만 보이게 두고, 닫힌 뒤엔 invisible 로 포커스도 막음 */}
        <nav
          id="mobile-nav"
          className={`absolute right-0 bottom-13 flex max-h-[calc(100dvh-6.25rem)] w-56 flex-col overflow-y-auto p-2 text-sm uppercase transition-[visibility] duration-0 motion-reduce:delay-0 ${isOpen ? 'visible' : 'invisible delay-75'}`}
        >
          {items.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) =>
                `flex h-13 shrink-0 items-center gap-3 rounded-xl px-3.5 transition-opacity motion-reduce:transition-none ${isOpen ? 'opacity-100 delay-100 duration-200' : 'opacity-0 duration-75'} ${isActive ? 'font-semibold text-accent ring-1 ring-border ring-inset' : 'text-foreground'}`
              }
            >
              <Icon width={20} height={20} aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
