import PostList from '@/components/PostList'
import { getAllPosts } from '@/lib/posts'

export default function BlogListPage() {
  return (
    <>
      <title>Blog</title>
      <h1 className="my-4 text-xl font-semibold uppercase sm:my-5 sm:text-2xl">Blog</h1>
      <PostList posts={getAllPosts()} />
    </>
  )
}
