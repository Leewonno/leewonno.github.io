import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <>
      <title>404</title>
      <h1 className="my-4 text-xl font-semibold uppercase sm:my-5 sm:text-2xl">404</h1>
      <p className="my-4">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-accent hover:underline">
        홈으로
      </Link>
    </>
  )
}
