import Markdown from 'react-markdown'
import { useParams } from 'react-router'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'
import { formatDate, getPostBySlug } from '@/lib/posts'
import NotFoundPage from '@/pages/NotFoundPage'
import styles from './BlogPostPage.module.css'

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFoundPage />

  return (
    <article>
      <title>{`${post.title} | leewonno`}</title>
      {post.description && <meta name="description" content={post.description} />}
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <time className={styles.meta} dateTime={post.date.toISOString()}>
          {formatDate(post.date)}
        </time>
        {post.tags.length > 0 && (
          <ul className={styles.tags}>
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
      </header>
      <div className={styles.content}>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </Markdown>
      </div>
    </article>
  )
}
