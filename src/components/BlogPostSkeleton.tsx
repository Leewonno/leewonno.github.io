const TAG_WIDTHS = ['w-5.5', 'w-8.5', 'w-16.5', 'w-12.5', 'w-26.5']

// 문단별 줄 길이. 문단 길이가 고르면 글처럼 보이지 않아 실제 글의 문단 모양을 따름
const PARAGRAPH_LINE_WIDTHS = [
  ['w-[99%]', 'w-[94%]', 'w-[15%]'],
  ['w-[54%]'],
  ['w-[98%]', 'w-[99%]', 'w-[97%]', 'w-[19%]'],
  ['w-[87%]'],
  ['w-[90%]', 'w-[94%]', 'w-[98%]', 'w-[13%]'],
]

function Bar({ className }: { className: string }) {
  return <span className={`block animate-pulse rounded bg-border motion-reduce:animate-none ${className}`} />
}

// 글 페이지 코드를 받는 동안 보여 주는 자리표시자.
// 완료 시 화면이 움직이지 않도록 BlogPostPage 의 제목·구분선·본문 치수를 그대로 따름
export default function BlogPostSkeleton() {
  return (
    <div role="status">
      <div className="mb-10 border-b border-border pb-6">
        <div className="mt-4 mb-2 text-2xl sm:mt-5 sm:text-3xl">
          <div className="flex h-[1.3em] items-center">
            <Bar className="h-[0.85em] w-full sm:w-[70%]" />
          </div>
          {/* 좁은 화면에서는 제목이 두 줄로 줄바꿈됨 */}
          <div className="flex h-[1.3em] items-center sm:hidden">
            <Bar className="h-[0.85em] w-2/5" />
          </div>
        </div>
        <div className="flex h-[1.7rem] items-center">
          <Bar className="h-3 w-26" />
        </div>
        <div className="mt-3 flex gap-2">
          {TAG_WIDTHS.map((width) => (
            <Bar key={width} className={`my-1 h-3 ${width}`} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {PARAGRAPH_LINE_WIDTHS.map((lines, paragraph) => (
          <div key={paragraph}>
            {lines.map((width) => (
              <div key={width} className="flex h-7 items-center">
                <Bar className={`h-3.5 ${width}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">글을 불러오는 중</span>
    </div>
  )
}
