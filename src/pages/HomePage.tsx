import { lazy, Suspense } from 'react'
import BrowserFrame from '@/components/BrowserFrame'
import HomeCard, { homeCardClass } from '@/components/HomeCard'
import { NOVEL_STATUS_LABEL, novels } from '@/data/novel'
import { projects } from '@/data/playground'
import { resume } from '@/data/resume'
import { formatDate, getAllPosts } from '@/lib/posts'

// 영상 목록 데이터가 커서 분리 로딩
const VideoPreviewCard = lazy(() => import('@/components/VideoPreviewCard'))

function BlogCard() {
  const [latestPost] = getAllPosts()

  return (
    // 글이 하나만 보이므로 목록 대신 해당 글로 바로 이동
    <HomeCard
      to={latestPost ? `/blog/${latestPost.slug}` : '/blog'}
      label="Blog"
      className="sm:col-span-4"
    >
      {latestPost ? (
        <>
          <h3 className="mt-auto text-[1.375rem] leading-snug font-bold">{latestPost.title}</h3>
          {latestPost.description && <p className="mt-1.5 text-[0.9375rem] text-muted">{latestPost.description}</p>}
          <p className="mt-3.5 text-[0.8125rem] text-muted">
            <time dateTime={latestPost.date.toISOString()}>{formatDate(latestPost.date)}</time>
          </p>
        </>
      ) : (
        <p className="mt-auto text-sm text-muted">아직 작성된 글이 없습니다.</p>
      )}
    </HomeCard>
  )
}

function ResumeCard() {
  const [current] = resume.experiences

  return (
    <HomeCard to="/resume" label="Resume" className="sm:col-span-2">
      <div className="relative">
        <img
          src={resume.avatar}
          alt=""
          className="block h-27 w-full max-sm:min-h-52 rounded-[0.875rem] bg-code object-cover object-[50%_18%]"
        />
        {current?.logo && (
          // 사진 모서리에 붙인 회사 심볼 배지
          <span className="absolute -right-1.5 -bottom-2.5 size-8.5 rounded-[0.625rem] border border-border bg-background p-1.5">
            <img src={current.logo} alt="" width={22} height={22} className="block size-full" />
          </span>
        )}
      </div>
      <p className="mt-auto pt-3.5 text-lg font-extrabold">{resume.name}</p>
      {current && (
        <p className="mt-0.5 text-[0.8125rem] text-muted">
          {current.company} · {current.role}
        </p>
      )}
    </HomeCard>
  )
}

function PlaygroundCard() {
  const [featured, ...rest] = projects
  if (!featured) return null

  return (
    <HomeCard to="/playground" label="Playground" className="sm:col-span-3">
      <div className="mt-auto overflow-hidden rounded-xl border border-border shadow-[0_8px_24px_rgb(31_35_40/0.1)]">
        <BrowserFrame url={featured.url} title={featured.title} screenshot={featured.screenshot} />
      </div>
      <h3 className="mt-3 font-bold">
        {featured.title}
        {rest.length > 0 && ` 외 ${rest.length}개`}
      </h3>
      <p className="text-[0.8125rem] text-muted">{featured.description}</p>
    </HomeCard>
  )
}

// '2023-03-10' → '2023.03.10'
function formatDay(value: string) {
  return value.replaceAll('-', '.')
}

function NovelCard() {
  return (
    <HomeCard to="/novel" label="Novel" className="sm:col-span-6">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {novels.map((novel) => (
          <li key={novel.url} className="flex gap-3.5">
            <img
              src={novel.thumbnail}
              alt=""
              width={720}
              height={1030}
              loading="lazy"
              className="block aspect-720/1030 w-19 shrink-0 self-start rounded-md bg-code object-cover shadow-[0_4px_12px_rgb(31_35_40/0.12)]"
            />
            <div className="min-w-0">
              <h3 className="text-[1.0625rem] font-bold">{novel.title}</h3>
              <p className="mt-0.5 text-[0.8125rem] text-muted">{novel.platform}</p>
              <p className="text-[0.8125rem] text-muted">
                <time dateTime={novel.startedAt}>{formatDay(novel.startedAt)}</time> ~{' '}
                {novel.endedAt && <time dateTime={novel.endedAt}>{formatDay(novel.endedAt)}</time>}
              </p>
              <span className="mt-2 inline-block rounded-full border border-border px-2.25 text-xs leading-5 text-muted">
                {NOVEL_STATUS_LABEL[novel.status]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </HomeCard>
  )
}

export default function HomePage() {
  return (
    <>
      <title>Leewonno</title>
      <h1 className="sr-only">Leewonno</h1>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-6">
        <BlogCard />
        <ResumeCard />
        <PlaygroundCard />
        <Suspense
          fallback={<div aria-hidden className={`${homeCardClass} min-h-64 sm:col-span-3`} />}
        >
          <VideoPreviewCard />
        </Suspense>
        <NovelCard />
      </div>
    </>
  )
}
