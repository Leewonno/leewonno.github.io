// vite build 결과(dist)와 SSR 번들(dist-ssr)로 경로마다 본문이 채워진 index.html 과 sitemap.xml 을 생성
// GitHub Pages 는 파일이 없는 경로를 404 상태로 응답해 검색엔진이 색인하지 않고, JS 를 실행하지 않는 크롤러는 본문을 읽지 못함
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getRoutes, renderRoute, SITE_URL } from '../dist-ssr/entry-server.js'

const DIST_DIR = fileURLToPath(new URL('../dist', import.meta.url))
const EMPTY_ROOT = '<div id="root"></div>'
const TITLE_PATTERN = /<title>.*?<\/title>\s*/

const template = await readFile(join(DIST_DIR, 'index.html'), 'utf8')
if (!template.includes(EMPTY_ROOT) || !TITLE_PATTERN.test(template)) {
  throw new Error('dist/index.html 형식이 예상과 달라 프리렌더링할 수 없습니다')
}

const routes = getRoutes()

for (const route of routes) {
  const { head, body } = await renderRoute(route)
  // 본문의 $ 가 치환 패턴으로 해석되지 않도록 함수로 넘김
  const page = template
    .replace(TITLE_PATTERN, '')
    .replace('</head>', () => `${head}</head>`)
    .replace(EMPTY_ROOT, () => `<div id="root">${body}</div>`)

  const file = join(DIST_DIR, route, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${SITE_URL}${encodeURI(route)}</loc></url>`).join('\n')}
</urlset>
`
await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemap)
