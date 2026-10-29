import { useEffect, useRef } from 'react'
import { getTheme, useTheme } from '@/lib/theme'

// giscus.app 설정 페이지에서 발급받은 값 (GitHub Discussions 기반 댓글)
const GISCUS_CONFIG = {
  repo: 'Leewonno/leewonno.github.io',
  repoId: 'R_kgDOVZSI5A',
  category: 'Announcements',
  categoryId: 'DIC_kwDOVZSI5M4DJ9P_',
} as const

type CommentsProps = {
  // 글마다 Discussion을 하나씩 매핑하는 키 (URL 구조가 바뀌어도 댓글이 유지되도록 slug 사용)
  term: string
}

export default function Comments({ term }: CommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    Object.assign(script.dataset, {
      repo: GISCUS_CONFIG.repo,
      repoId: GISCUS_CONFIG.repoId,
      category: GISCUS_CONFIG.category,
      categoryId: GISCUS_CONFIG.categoryId,
      mapping: 'specific',
      term,
      strict: '1',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      // 처음 불러올 때의 사이트 테마. 이후 전환은 아래 effect 가 iframe 에 전달
      theme: getTheme(),
      lang: 'ko',
      loading: 'lazy',
    })
    container.appendChild(script)

    // 다른 글로 이동하면 이전 글의 iframe을 지우고 새로 불러옴
    return () => container.replaceChildren()
  }, [term])

  // 테마를 바꾸면 iframe 을 다시 불러오지 않고 giscus 에 메시지로 알림
  useEffect(() => {
    const iframe = containerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
  }, [theme])

  return <div ref={containerRef} className="giscus mt-16 border-t border-border pt-10" />
}
