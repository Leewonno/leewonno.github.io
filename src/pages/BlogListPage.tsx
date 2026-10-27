import PostList from '@/components/PostList'
import { getAllPosts } from '@/lib/posts'

export default function BlogListPage() {
  return (
    <>
      <title>Blog | leewonno</title>
      <h1>Blog</h1>
      <PostList posts={getAllPosts()} />
    </>
  )
}
