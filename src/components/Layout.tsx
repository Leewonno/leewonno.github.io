import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import BookOpen from '~icons/akar-icons/book-open'
import File from '~icons/akar-icons/file'
import GameController from '~icons/akar-icons/game-controller'
import GithubFill from '~icons/akar-icons/github-fill'
import LinkedinBoxFill from '~icons/akar-icons/linkedin-box-fill'
import Moon from '~icons/akar-icons/moon'
import Pencil from '~icons/akar-icons/pencil'
import Sun from '~icons/akar-icons/sun'
import Video from '~icons/akar-icons/video'
import MobileNav from '@/components/MobileNav'
import { resume } from '@/data/resume'
import { setTheme, useTheme } from '@/lib/theme'

const NAV_ITEMS = [
  { to: '/blog', label: 'Blog', Icon: Pencil },
  { to: '/resume', label: 'Resume', Icon: File },
  { to: '/playground', label: 'Playground', Icon: GameController },
  { to: '/video', label: 'Video', Icon: Video },
  { to: '/novel', label: 'Novel', Icon: BookOpen },
] as const

const SOCIAL_LINKS = [
  { href: resume.github, label: 'GitHub', title: 'GitHub', Icon: GithubFill },
  { href: resume.linkedin, label: 'LinkedIn', title: 'LinkedIn', Icon: LinkedinBoxFill },
] as const

const ICON_BUTTON_CLASS =
  'inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-300 hover:bg-code hover:text-foreground motion-reduce:transition-none'

export default function Layout() {
  const { pathname } = useLocation()
  const theme = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="mx-auto flex min-h-screen max-w-content flex-col px-5">
      <header className="flex items-center gap-x-4 py-6">
        <NavLink to="/" className="mr-auto flex items-center">
          {/* 흰 배경 PNG라 라이트에선 multiply, 다크에선 반전 후 screen으로 배경을 지움 */}
          <img
            src="/logo.png"
            alt="Leewonno"
            className="h-6 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert"
          />
        </NavLink>
        <nav className="hidden gap-5 text-sm text-muted uppercase sm:flex">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'font-semibold text-accent' : 'hover:text-foreground'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
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
        </div>
      </header>
      <MobileNav items={NAV_ITEMS} />
      <main className="flex-1 pt-2 pb-16 sm:pt-6">
        <Outlet />
      </main>
      <footer className="border-t border-border py-6 text-sm text-muted">
        <ul className="flex gap-2 sm:gap-3">
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
