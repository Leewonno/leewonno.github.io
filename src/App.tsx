import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '@/components/Layout'
import BlogListPage from '@/pages/BlogListPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import ResumePage from '@/pages/ResumePage'
import WorksPage from '@/pages/WorksPage'

// 마크다운 렌더러·코드 하이라이터가 무거워 글 상세 페이지는 분리 로딩
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
// 영상 목록 데이터가 커서 분리 로딩
const VideoPage = lazy(() => import('@/pages/VideoPage'))
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route
            path="blog/:slug"
            element={
              <Suspense fallback={null}>
                <BlogPostPage />
              </Suspense>
            }
          />
          <Route path="resume" element={<ResumePage />} />
          <Route path="works" element={<WorksPage />} />
          <Route
            path="video"
            element={
              <Suspense fallback={null}>
                <VideoPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
