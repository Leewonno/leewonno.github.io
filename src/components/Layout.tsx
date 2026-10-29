import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import Cross from '~icons/akar-icons/cross'
import ThreeLineHorizontal from '~icons/akar-icons/three-line-horizontal'

const NAV_ITEMS = [
  { to: '/blog', label: 'Blog' },
  { to: '/resume', label: 'Resume' },
  { to: '/playground', label: 'Playground' },
  { to: '/video', label: 'Video' },
  { to: '/novel', label: 'Novel' },
] as const

export default function Layout() {
  const { pathname } = useLocation()
  // 좁은 화면(sm 미만)에서만 쓰는 햄버거 메뉴 열림 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <div className="mx-auto flex min-h-screen max-w-content flex-col px-5">
      <header className="flex flex-wrap items-center justify-between gap-x-4 py-6">
        <NavLink to="/" className="flex items-center" onClick={closeMenu}>
          {/* 흰 배경 PNG라 라이트에선 multiply, 다크에선 반전 후 screen으로 배경을 지움 */}
          <img
            src="/logo.png"
            alt="Leewonno"
            className="h-6 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert"
          />
        </NavLink>
        <button
          type="button"
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          className="-my-1 -mr-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-300 hover:bg-code hover:text-foreground motion-reduce:transition-none sm:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <Cross width={20} height={20} aria-hidden />
          ) : (
            <ThreeLineHorizontal width={20} height={20} aria-hidden />
          )}
        </button>
        <nav
          id="site-nav"
          className={`${isMenuOpen ? 'flex' : 'hidden'} mt-4 w-full flex-col border-t border-border pt-2 text-sm text-muted uppercase sm:mt-0 sm:flex sm:w-auto sm:flex-row sm:gap-5 sm:border-t-0 sm:pt-0`}
        >
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 sm:py-0 ${isActive ? 'font-semibold text-accent' : 'hover:text-foreground'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1 pt-2 pb-16 sm:pt-6">
        <Outlet />
      </main>
      <footer className="border-t border-border py-6 text-sm text-muted">
        <a href="https://github.com/Leewonno" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  )
}
