import YoutubeFill from '~icons/akar-icons/youtube-fill'
import HomeCard from '@/components/HomeCard'
import { channel, videos } from '@/data/video'

const PREVIEW_COUNT = 4

// 80100 → '8.01만', 281637038 → '2.82억'
const channelStatFormatter = new Intl.NumberFormat('ko-KR', {
  notation: 'compact',
  maximumSignificantDigits: 3,
})

// 조회수가 많은 영상부터 미리보기
const popularVideos = [...videos]
  .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
  .slice(0, PREVIEW_COUNT)

export default function VideoPreviewCard() {
  return (
    <HomeCard to="/video" label="Video" className="sm:col-span-3">
      <ul className="mt-auto grid grid-cols-2 gap-1.5">
        {popularVideos.map((video) => (
          <li key={video.id}>
            {/* hqdefault 는 4:3 레터박스라 object-fit: cover 로 16:9 에 맞춰 자름 */}
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="block aspect-video w-full rounded-lg bg-code object-cover"
            />
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2.5">
        <img
          src={channel.avatar}
          alt=""
          width={28}
          height={28}
          className="size-7 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-sm font-bold">
            {channel.name}
            <YoutubeFill width={14} height={14} className="shrink-0 text-[#ff0033]" aria-hidden />
          </p>
          <p className="text-xs text-muted">
            구독자 {channelStatFormatter.format(channel.subscribers)}명 · 총 조회수{' '}
            {channelStatFormatter.format(channel.totalViews)}회
          </p>
        </div>
      </div>
    </HomeCard>
  )
}
