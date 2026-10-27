import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import styles from './Layout.module.css'

const NAV_ITEMS = [
  { to: '/blog', label: 'Blog' },
  { to: '/resume', label: 'Resume' },
  { to: '/works', label: 'Works' },
] as const

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          leewonno
        </NavLink>
        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/Leewonno" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  )
}
