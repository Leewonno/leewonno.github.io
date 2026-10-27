import { Link } from 'react-router'
import { formatDate, type PostMeta } from '@/lib/posts'
import styles from './PostList.module.css'

type PostListProps = {
  posts: readonly PostMeta[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className={styles.empty}>아직 작성된 글이 없습니다.</p>
  }

  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={`/blog/${post.slug}`} className={styles.item}>
            <h3 className={styles.title}>{post.title}</h3>
            {post.description && <p className={styles.description}>{post.description}</p>}
            <time className={styles.date} dateTime={post.date.toISOString()}>
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  )
}
