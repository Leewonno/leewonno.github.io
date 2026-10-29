import { useEffect, useRef } from 'react'

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
      // 사이트와 같이 OS 다크 모드 설정을 따름
      theme: 'preferred_color_scheme',
      lang: 'ko',
      loading: 'lazy',
    })
    container.appendChild(script)

    // 다른 글로 이동하면 이전 글의 iframe을 지우고 새로 불러옴
    return () => container.replaceChildren()
  }, [term])

  return <div ref={containerRef} className="giscus mt-16 border-t border-border pt-10" />
}
