import { Link } from 'react-router'
import { formatDate, type PostMeta } from '@/lib/posts'

type PostListProps = {
  posts: readonly PostMeta[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted">아직 작성된 글이 없습니다.</p>
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={`/blog/${post.slug}`} className="group block border-b border-border py-5">
            <h3 className="mb-1 text-xl font-bold group-hover:text-accent">{post.title}</h3>
            {post.description && <p className="mb-2 text-muted">{post.description}</p>}
            <time className="text-sm text-muted" dateTime={post.date.toISOString()}>
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  )
}
