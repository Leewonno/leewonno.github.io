import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

// index.html 인라인 스크립트와 같은 키 (첫 페인트 전에 data-theme 를 먼저 설정해 깜빡임 방지)
const STORAGE_KEY = 'theme'

const listeners = new Set<() => void>()

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // 시크릿 모드 등 저장소를 못 쓰면 이번 방문에만 적용
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme)
}
