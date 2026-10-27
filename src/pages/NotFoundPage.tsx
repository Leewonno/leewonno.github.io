import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <>
      <title>404 | leewonno</title>
      <h1 className="my-5 text-3xl font-bold">404</h1>
      <p className="my-4">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-accent hover:underline">
        홈으로
      </Link>
    </>
  )
}
