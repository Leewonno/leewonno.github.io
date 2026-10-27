import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <>
      <title>404 | leewonno</title>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로</Link>
    </>
  )
}
