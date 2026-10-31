import Markdown from 'react-markdown'
import { useParams } from 'react-router'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'
import Comments from '@/components/Comments'
import { formatDate, getPostBySlug } from '@/lib/posts'
import NotFoundPage from '@/pages/NotFoundPage'

// 마크다운 본문은 @tailwindcss/typography(prose) 에 사이트 색상(prose-site, index.css)을 입혀 사용
const MARKDOWN_CLASS = [
  'prose prose-site max-w-none',
  // 사이트 최대 굵기는 semibold: prose 기본값(h1 800, h2 700, 제목 안 strong 최대 900)을 낮춤
  'prose-headings:font-semibold prose-strong:font-semibold',
  // 인라인 코드: 따옴표 장식 제거 + 배경 (코드 블록은 highlight.js 테마가 담당)
  'prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
  '[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-code [&_:not(pre)>code]:px-[0.4em] [&_:not(pre)>code]:py-[0.2em]',
  'prose-pre:rounded-lg prose-pre:bg-transparent prose-pre:p-0',
  // highlight.js 테마의 bold도 semibold로 (테마 CSS는 레이어 밖이라 ! 필요)
  '[&_:is(.hljs-section,.hljs-strong)]:font-semibold!',
  // 좁은 화면에서 표가 본문 밖으로 넘치지 않도록 표 자체를 가로 스크롤
  'prose-table:block prose-table:overflow-x-auto',
  'prose-table:text-base prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2',
  'prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2',
].join(' ')

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFoundPage />

  return (
    <article>
      <title>{post.title}</title>
      {post.description && <meta name="description" content={post.description} />}
      <header className="mb-10 border-b border-border pb-6">
        <h1 className="mb-2 text-2xl leading-[1.3] font-semibold sm:text-3xl">{post.title}</h1>
        <time className="text-sm text-muted" dateTime={post.date.toISOString()}>
          {formatDate(post.date)}
        </time>
        {post.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-accent">
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </header>
      <div className={MARKDOWN_CLASS}>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </Markdown>
      </div>
      <Comments term={post.slug} />
    </article>
  )
}
