import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import Cross from '~icons/akar-icons/cross'
import GithubFill from '~icons/akar-icons/github-fill'
import LinkedinFill from '~icons/akar-icons/linkedin-fill'
import Moon from '~icons/akar-icons/moon'
import Sun from '~icons/akar-icons/sun'
import ThreeLineHorizontal from '~icons/akar-icons/three-line-horizontal'
import { resume } from '@/data/resume'
import { setTheme, useTheme } from '@/lib/theme'

const NAV_ITEMS = [
  { to: '/blog', label: 'Blog' },
  { to: '/resume', label: 'Resume' },
  { to: '/playground', label: 'Playground' },
  { to: '/video', label: 'Video' },
  { to: '/novel', label: 'Novel' },
] as const

const SOCIAL_LINKS = [
  { href: resume.github, label: 'GitHub', title: 'GitHub', Icon: GithubFill },
  { href: resume.linkedin, label: 'LinkedIn', title: 'LinkedIn', Icon: LinkedinFill },
] as const

const ICON_BUTTON_CLASS =
  'inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-300 hover:bg-code hover:text-foreground motion-reduce:transition-none'

export default function Layout() {
  const { pathname } = useLocation()
  const theme = useTheme()
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
      <header className="flex flex-wrap items-center gap-x-4 py-6">
        <NavLink to="/" className="mr-auto flex items-center" onClick={closeMenu}>
          {/* 흰 배경 PNG라 라이트에선 multiply, 다크에선 반전 후 screen으로 배경을 지움 */}
          <img
            src="/logo.png"
            alt="Leewonno"
            className="h-6 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert"
          />
        </NavLink>
        <nav
          id="site-nav"
          className={`${isMenuOpen ? 'flex' : 'hidden'} order-last mt-4 w-full flex-col border-t border-border pt-2 text-sm text-muted uppercase sm:order-none sm:mt-0 sm:flex sm:w-auto sm:flex-row sm:gap-5 sm:border-t-0 sm:pt-0`}
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
        {/* 좁은 화면에선 nav 가 order-last 로 버튼 아래 줄에 펼쳐지고, 넓은 화면에선 nav 오른쪽 끝에 버튼이 옴 */}
        <div className="-my-1 -mr-2 flex">
          <button
            type="button"
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
            className={ICON_BUTTON_CLASS}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun width={18} height={18} aria-hidden />
            ) : (
              <Moon width={18} height={18} aria-hidden />
            )}
          </button>
          <button
            type="button"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
            aria-controls="site-nav"
            className={`${ICON_BUTTON_CLASS} sm:hidden`}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <Cross width={20} height={20} aria-hidden />
            ) : (
              <ThreeLineHorizontal width={20} height={20} aria-hidden />
            )}
          </button>
        </div>
      </header>
      <main className="flex-1 pt-2 pb-16 sm:pt-6">
        <Outlet />
      </main>
      <footer className="border-t border-border py-6 text-sm text-muted">
        <ul className="flex gap-3">
          {SOCIAL_LINKS.map(({ href, label, title, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={title}
                className="block"
              >
                <Icon aria-hidden className="block size-4" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs">ⓒ 2026. Leewonno. All rights reserved.</p>
      </footer>
    </div>
  )
}
