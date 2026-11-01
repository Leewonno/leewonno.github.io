import PageMeta from "@/components/PageMeta";
import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export default function BlogListPage() {
  return (
    <>
      <PageMeta
        title="BLOG"
        description="직접 만든 프로젝트와 개발 경험을 기록합니다."
      />
      <h1 className="my-4 text-xl font-semibold uppercase sm:my-5 sm:text-2xl">
        Blog
      </h1>
      <PostList posts={getAllPosts()} />
    </>
  );
}
