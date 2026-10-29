import HomeCard from '@/components/HomeCard'
import YoutubeLogo from '@/components/YoutubeLogo'
import { channel, shorts, videos } from '@/data/video'

const VIDEO_PREVIEW_COUNT = 3

// 80100 → '8.01만', 281637038 → '2.82억'
const channelStatFormatter = new Intl.NumberFormat('ko-KR', {
  notation: 'compact',
  maximumSignificantDigits: 3,
})

// 데이터가 최신순이라 앞에서부터 미리보기
const [latestShort] = shorts
const latestVideos = videos.slice(0, VIDEO_PREVIEW_COUNT)

export default function VideoPreviewCard() {
  return (
    <HomeCard to="/video" label="Video" className="sm:col-span-3">
      {/* 같은 폭의 두 칸에서 9:16 쇼츠 1개와 16:9 영상 3개의 높이가 거의 같아짐 */}
      <div className="mt-auto grid grid-cols-2 gap-1.5">
        {latestShort && (
          <div className="overflow-hidden rounded-lg bg-code">
            {/* hqdefault 는 4:3 레터박스라 object-fit: cover 로 자르고, 좌우 검은 선은 살짝 확대해 가림 */}
            <img
              src={`https://i.ytimg.com/vi/${latestShort.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="block size-full scale-[1.02] object-cover"
            />
          </div>
        )}
        <ul className="flex flex-col gap-1.5">
          {latestVideos.map((video) => (
            <li key={video.id}>
              <img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="block aspect-video w-full rounded-lg bg-code object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
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
            <YoutubeLogo width={14} height={10} className="shrink-0" aria-hidden />
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
