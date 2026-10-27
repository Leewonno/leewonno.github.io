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
        <h1 className="my-5 text-3xl font-bold">{resume.name}</h1>
        <p className="my-4">{resume.headline}</p>
      </section>
      <section>
        <h2 className="mt-10 mb-2 text-2xl font-bold">
          <Link to="/blog">최근 글</Link>
        </h2>
        <PostList posts={recentPosts} />
      </section>
    </>
  )
}
