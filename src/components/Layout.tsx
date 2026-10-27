import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'

const NAV_ITEMS = [
  { to: '/blog', label: 'Blog' },
  { to: '/resume', label: 'Resume' },
  { to: '/playground', label: 'Playground' },
  { to: '/video', label: 'Video' },
  { to: '/novel', label: 'Novel' },
] as const

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="mx-auto flex min-h-screen max-w-content flex-col px-5">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-6">
        <NavLink to="/" className="text-lg font-bold">
          Leewonno
        </NavLink>
        <nav className="flex gap-2.5 text-sm text-muted sm:gap-5 sm:text-base">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'text-foreground' : 'hover:text-foreground'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1 pt-6 pb-16">
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
