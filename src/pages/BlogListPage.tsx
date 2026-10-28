import PostList from '@/components/PostList'
import { getAllPosts } from '@/lib/posts'

export default function BlogListPage() {
  return (
    <>
      <title>Blog</title>
      <h1 className="my-4 text-2xl font-bold sm:my-5 sm:text-3xl">Blog</h1>
      <PostList posts={getAllPosts()} />
    </>
  )
}
