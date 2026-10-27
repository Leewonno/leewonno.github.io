import PostList from '@/components/PostList'
import { getAllPosts } from '@/lib/posts'

export default function BlogListPage() {
  return (
    <>
      <title>Blog</title>
      <h1 className="my-5 text-3xl font-bold">Blog</h1>
      <PostList posts={getAllPosts()} />
    </>
  )
}
