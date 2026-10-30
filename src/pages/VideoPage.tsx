import { useState } from 'react'
import ChevronDown from '~icons/akar-icons/chevron-down'
import ChevronRight from '~icons/akar-icons/chevron-right'
import Play from '~icons/akar-icons/triangle-right-fill'
import YoutubeLogo from '@/components/YoutubeLogo'
import { channel, shorts, videos, type Video } from '@/data/video'
import { formatDate } from '@/lib/posts'

const VIDEO_PAGE_SIZE = 4
const SHORTS_PAGE_SIZE = 8

// 3214 → '3.2천', 1193804 → '119만'
const viewFormatter = new Intl.NumberFormat('ko-KR', { notation: 'compact' })
// 80100 → '8.01만', 281637038 → '2.82억'
const channelStatFormatter = new Intl.NumberFormat('ko-KR', {
  notation: 'compact',
  maximumSignificantDigits: 3,
})

function ChannelHeader() {
  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3.5 rounded-2xl border border-border px-4 py-3.5 transition-colors duration-300 hover:bg-code motion-reduce:transition-none"
    >
      <img src={channel.avatar} alt="" width={56} height={56} className="size-14 shrink-0 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 font-bold">
          {channel.name}
          <YoutubeLogo width={16} height={11} className="shrink-0" aria-hidden />
        </p>
        {/* 항목마다 앞에 '·' 를 붙이고 왼쪽으로 1em 당겨 잘라내서, 줄 맨 앞에 오는 '·' 는 보이지 않게 함 */}
        <div className="overflow-hidden text-[0.8125rem] text-muted">
          <p className="-ml-[1em] flex flex-wrap">
            {[
              channel.handle,
              `구독자 ${channelStatFormatter.format(channel.subscribers)}명`,
              `총 조회수 ${channelStatFormatter.format(channel.totalViews)}회`,
            ].map((item) => (
              <span
                key={item}
                className="whitespace-nowrap before:inline-block before:w-[1em] before:text-center before:content-['·']"
              >
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>
      <ChevronRight width={18} height={18} className="shrink-0 text-muted" aria-hidden />
    </a>
  )
}

type VideoSectionProps = {
  title: string
  items: readonly Video[]
  pageSize: number
  variant: 'video' | 'short'
}

function VideoSection({ title, items, pageSize, variant }: VideoSectionProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [loadedIds, setLoadedIds] = useState<ReadonlySet<string>>(() => new Set())
  const isShort = variant === 'short'

  const shownItems = items.slice(0, visibleCount)
  // 받아진 순서와 상관없이 왼쪽부터 차례로 보이도록, 앞에서부터 연속으로 로드된 썸네일까지만 표시
  const firstPendingIndex = shownItems.findIndex((item) => !loadedIds.has(item.id))
  const revealedCount = firstPendingIndex === -1 ? shownItems.length : firstPendingIndex

  const markLoaded = (id: string) => setLoadedIds((prev) => new Set(prev).add(id))

  return (
    <section className="mt-8">
      <h2 className="my-4 text-xl font-bold sm:my-5 sm:text-2xl">{title}</h2>
      <ul
        className={
          isShort
            ? 'grid grid-cols-2 gap-3 sm:grid-cols-4'
            : 'grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'
        }
      >
        {shownItems.map((item, index) => (
          <li key={item.id}>
            <a
              href={
                isShort
                  ? `https://www.youtube.com/shorts/${item.id}`
                  : `https://www.youtube.com/watch?v=${item.id}`
              }
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg bg-code">
                {/* hqdefault 는 4:3 레터박스라 object-fit: cover 로 16:9 / 9:16 에 맞춰 자름 */}
                {/* 쇼츠는 잘린 경계가 검은 띠 끝과 겹쳐 좌우에 어두운 선이 남으므로 살짝 확대해 가림 */}
                <img
                  src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                  // 쇼츠는 썸네일만 보여주므로 제목을 alt 로 제공
                  alt={isShort ? item.title : ''}
                  loading="lazy"
                  onLoad={() => markLoaded(item.id)}
                  // 실패한 썸네일이 뒤쪽 항목을 계속 막지 않도록 로드된 것으로 처리
                  onError={() => markLoaded(item.id)}
                  className={`block w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${isShort ? 'aspect-9/16 scale-[1.02]' : 'aspect-video'} ${index < revealedCount ? 'opacity-100' : 'opacity-0'}`}
                />
                <span
                  className="absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                >
                  <Play width={isShort ? 48 : 56} height={isShort ? 48 : 56} />
                </span>
              </div>
              {!isShort && (
                // 제목은 한 줄만 보여주고 넘치면 말줄임
                <p className="mt-2 mb-0.5 truncate text-[0.9375rem] leading-[1.4] font-semibold group-hover:text-accent">
                  {item.title}
                </p>
              )}
              {(item.views !== undefined || item.publishedAt) && (
                <p className="text-sm text-muted">
                  {item.views !== undefined && `조회수 ${viewFormatter.format(item.views)}회`}
                  {item.views !== undefined && item.publishedAt && ' · '}
                  {item.publishedAt && (
                    <time dateTime={item.publishedAt}>
                      {formatDate(new Date(`${item.publishedAt}T00:00:00`))}
                    </time>
                  )}
                </p>
              )}
            </a>
          </li>
        ))}
      </ul>
      {visibleCount < items.length && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm transition-colors duration-300 hover:bg-code motion-reduce:transition-none"
            onClick={() => setVisibleCount((count) => count + pageSize)}
          >
            더보기
            <ChevronDown width={16} height={16} aria-hidden />
          </button>
        </div>
      )}
    </section>
  )
}

export default function VideoPage() {
  return (
    <>
      <title>Video</title>
      <h1 className="my-4 text-xl font-bold uppercase sm:my-5 sm:text-2xl">Video</h1>
      <p className="mb-6 text-sm text-muted sm:text-base">직접 운영했던 좋아하는 아이돌의 팬채널이에요.</p>
      <ChannelHeader />
      <VideoSection title="영상" items={videos} pageSize={VIDEO_PAGE_SIZE} variant="video" />
      <VideoSection title="Shorts" items={shorts} pageSize={SHORTS_PAGE_SIZE} variant="short" />
    </>
  )
}
