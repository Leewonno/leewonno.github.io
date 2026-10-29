import { lazy, Suspense } from 'react'
import Trophy from '~icons/akar-icons/trophy'
import BrowserFrame from '@/components/BrowserFrame'
import HomeCard, { homeCardClass } from '@/components/HomeCard'
import { novels } from '@/data/novel'
import { projects } from '@/data/playground'
import { resume } from '@/data/resume'
import { formatDate, getAllPosts } from '@/lib/posts'

// 영상 목록 데이터가 커서 분리 로딩
const VideoPreviewCard = lazy(() => import('@/components/VideoPreviewCard'))

function BlogCard() {
  const [latestPost] = getAllPosts()

  return (
    <HomeCard to="/blog" label="Blog" className="sm:col-span-4">
      {latestPost ? (
        <>
          <h3 className="mt-auto text-2xl leading-snug font-bold">{latestPost.title}</h3>
          {latestPost.description && <p className="mt-1.5 text-muted">{latestPost.description}</p>}
          <p className="mt-3.5 flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-muted">
            <time dateTime={latestPost.date.toISOString()}>{formatDate(latestPost.date)}</time>
            {latestPost.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-2.5 text-xs leading-5">
                {tag}
              </span>
            ))}
          </p>
        </>
      ) : (
        <p className="mt-auto text-sm text-muted">아직 작성된 글이 없습니다.</p>
      )}
    </HomeCard>
  )
}

function ResumeCard() {
  const [current, ...previous] = resume.experiences

  return (
    <HomeCard to="/resume" label="Resume" className="sm:col-span-2">
      <img
        src={resume.avatar}
        alt=""
        width={64}
        height={64}
        className="size-16 rounded-full border border-border bg-code object-cover object-top"
      />
      {current && (
        <>
          <p className="mt-auto flex items-center gap-2 pt-3.5 font-bold">
            {current.logo && (
              <img src={current.logo} alt="" width={22} height={22} className="size-5.5 rounded-md" />
            )}
            {current.company}
          </p>
          <p className="text-[0.8125rem] text-muted">
            {current.team} · <span className="whitespace-nowrap">{current.period}</span>
          </p>
        </>
      )}
      {previous.length > 0 && (
        <p className="text-[0.8125rem] text-muted">
          이전 {previous.map((experience) => experience.company).join(' · ')}
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

function NovelCard() {
  const award = novels.find((novel) => novel.award)?.award
  const platforms = [...new Set(novels.map((novel) => novel.platform))].join(', ')

  return (
    <HomeCard to="/novel" label="Novel" className="sm:col-span-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <ul className="flex shrink-0 gap-3">
          {novels.map((novel) => (
            <li key={novel.url}>
              <img
                src={novel.thumbnail}
                alt=""
                width={720}
                height={1030}
                loading="lazy"
                className="block aspect-720/1030 w-20 rounded-md bg-code object-cover shadow-[0_4px_12px_rgb(31_35_40/0.12)] sm:w-24"
              />
            </li>
          ))}
        </ul>
        <div className="min-w-0">
          <h3 className="text-[1.375rem] leading-snug font-bold">
            직접 쓰고 연재한 소설 {novels.length}편
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            {novels.map((novel) => novel.title).join(' · ')} — {platforms}
          </p>
          {award && (
            <p className="mt-2 flex items-start gap-1 text-xs font-semibold text-accent">
              <Trophy width={12} height={12} className="mt-[0.1875rem] shrink-0" aria-hidden />
              {award}
            </p>
          )}
        </div>
      </div>
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
