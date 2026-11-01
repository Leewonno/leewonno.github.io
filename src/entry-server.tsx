// 빌드 때만 쓰는 진입점이라 Fast Refresh 대상이 아님
/* oxlint-disable react/only-export-components */
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import App from '@/App'
import { getAllPosts } from '@/lib/posts'

export { SITE_URL } from '@/lib/seo'

// App.tsx 의 라우트와 맞춰야 함 (글 상세는 아래에서 자동으로 추가)
// GitHub Pages 가 폴더 경로를 슬래시가 붙은 주소로 리다이렉트하므로 슬래시까지 포함
const STATIC_ROUTES = ['/', '/blog/', '/resume/', '/playground/', '/video/', '/novel/']

export function getRoutes(): string[] {
  return [...STATIC_ROUTES, ...getAllPosts().map(({ slug }) => `/blog/${slug}/`)]
}

// 문서 전체를 렌더링해야 React 가 <title>·<meta> 를 본문이 아닌 <head> 로 모아줌
export async function renderRoute(route: string): Promise<{ head: string; body: string }> {
  const errors: unknown[] = []
  const { prelude } = await prerender(
    <html>
      <head />
      <body>
        <div id="root">
          <StaticRouter location={route}>
            <App />
          </StaticRouter>
        </div>
      </body>
    </html>,
    {
      // 기본값이면 큰 Suspense 영역을 문서 뒤로 빼고 스크립트로 끼워 넣어, JS 없이는 본문이 온전히 보이지 않음
      progressiveChunkSize: Number.POSITIVE_INFINITY,
      // 기본 동작은 오류가 나도 빈 화면으로 넘어가므로, 빌드를 실패시켜 알아챌 수 있게 함
      onError: (error) => void errors.push(error),
    },
  )
  if (errors.length > 0) {
    throw new Error(`Failed to prerender ${route}`, { cause: errors[0] })
  }

  const html = await new Response(prelude).text()
  return { head: extractHead(html), body: extractBody(html, route) }
}

// React 가 넣는 이미지 프리로드는 화면 아래 이미지까지 포함하므로 페이지 메타 정보만 가져옴
function extractHead(html: string): string {
  const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'))
  return (head.match(/<title>.*?<\/title>|<meta [^>]*>|<link rel="canonical"[^>]*>/g) ?? []).join('')
}

function extractBody(html: string, route: string): string {
  const open = '<div id="root">'
  const body = html.slice(html.indexOf(open) + open.length, html.lastIndexOf('</div>'))
  if (!body.includes('<footer') || /<!--\$[?!]-->/.test(body)) {
    throw new Error(`Incomplete prerender output for ${route}`)
  }
  return body
}
