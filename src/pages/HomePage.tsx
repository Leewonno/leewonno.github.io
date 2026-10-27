import { Link } from 'react-router'
import PostList from '@/components/PostList'
import { getAllPosts } from '@/lib/posts'
import { resume } from '@/data/resume'

const RECENT_POST_COUNT = 5

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, RECENT_POST_COUNT)

  return (
    <>
      <title>leewonno</title>
      <section>
        <h1>{resume.name}</h1>
        <p>{resume.headline}</p>
      </section>
      <section>
        <h2>
          <Link to="/blog">최근 글</Link>
        </h2>
        <PostList posts={recentPosts} />
      </section>
    </>
  )
}
