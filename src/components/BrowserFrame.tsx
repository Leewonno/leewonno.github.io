import LockOn from '~icons/akar-icons/lock-on'

type BrowserFrameProps = {
  url: string
  title: string
  screenshot?: string
}

// 브라우저 창 모양 틀 안에 사이트 스크린샷을 보여줌 (테두리·그림자는 감싸는 쪽에서 지정)
export default function BrowserFrame({ url, title, screenshot }: BrowserFrameProps) {
  return (
    <>
      <div className="flex items-center gap-1.5 border-b border-border bg-code px-3 py-2">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-1 rounded-full border border-border bg-background px-2.5 text-[11px] text-muted">
          <LockOn width={9} height={9} className="shrink-0" />
          <span className="truncate">{new URL(url).host}</span>
        </span>
      </div>
      {screenshot ? (
        <img
          src={screenshot}
          alt=""
          loading="lazy"
          className="block aspect-16/10 w-full bg-code object-cover object-top"
        />
      ) : (
        <div className="flex aspect-16/10 w-full items-center justify-center bg-code text-2xl font-bold text-muted">
          {title}
        </div>
      )}
    </>
  )
}
