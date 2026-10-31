import BookOpen from '~icons/akar-icons/book-open'
import Trophy from '~icons/akar-icons/trophy'
import { NOVEL_STATUS_LABEL, novels } from '@/data/novel'

// '2023-03-10' → '2023.03'
function formatMonth(value: string) {
  return value.slice(0, 7).replace('-', '.')
}

export default function NovelPage() {
  return (
    <>
      <title>Novel</title>
      <h1 className="my-4 text-xl font-semibold uppercase sm:my-5 sm:text-2xl">Novel</h1>
      <p className="mb-6 text-sm text-muted sm:text-base">직접 써서 연재했던 소설이에요.</p>
      <ul className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-5">
        {novels.map((novel) => (
          <li key={novel.url}>
            <a href={novel.url} target="_blank" rel="noreferrer" className="group block">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={novel.thumbnail}
                  alt=""
                  width={720}
                  height={1030}
                  loading="lazy"
                  className="block aspect-720/1030 w-full bg-code object-cover"
                />
                <span
                  className="absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                >
                  {/* akar-icons 에 채워진 책 아이콘이 없어 외곽선 아이콘의 path 를 채움 */}
                  <BookOpen width={48} height={48} className="[&_path]:fill-current" />
                </span>
              </div>
              <p className="mt-3 truncate font-semibold group-hover:text-accent">{novel.title}</p>
              <p className="text-sm text-muted">
                {novel.penName} · {novel.platform}
              </p>
              <p className="text-xs text-muted">
                <time dateTime={novel.startedAt}>{formatMonth(novel.startedAt)}</time>
                {novel.endedAt ? (
                  <>
                    {/* 같은 달에 시작·종료했으면 한 번만 표시 */}
                    {formatMonth(novel.endedAt) !== formatMonth(novel.startedAt) && (
                      <>
                        {' – '}
                        <time dateTime={novel.endedAt}>{formatMonth(novel.endedAt)}</time>
                      </>
                    )}
                    {' · '}
                  </>
                ) : (
                  ' – '
                )}
                {NOVEL_STATUS_LABEL[novel.status]}
              </p>
              {novel.award && (
                <p className="mt-1 flex items-start gap-1 text-xs font-semibold text-accent">
                  <Trophy width={12} height={12} className="mt-[0.1875rem] shrink-0" aria-hidden />
                  {novel.award}
                </p>
              )}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
