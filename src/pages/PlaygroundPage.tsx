import ArrowUpRight from '~icons/akar-icons/arrow-up-right'
import GithubFill from '~icons/akar-icons/github-fill'
import LockOn from '~icons/akar-icons/lock-on'
import { projects } from '@/data/playground'

export default function PlaygroundPage() {
  return (
    <>
      <title>Playground</title>
      <h1 className="my-5 text-3xl font-bold">Playground</h1>
      <p className="mb-6 text-muted">직접 만들어서 배포한 개인 프로젝트예요. 눌러서 써보세요.</p>
      <ul>
        {projects.map((project) => (
          <li
            key={project.url}
            className="flex flex-col gap-5 border-b border-border py-8 last:border-b-0 sm:flex-row sm:items-center sm:gap-7 sm:even:flex-row-reverse"
          >
            {/* 아래 '사이트 열기' 링크와 같은 곳으로 가므로 키보드·스크린리더에서는 건너뜀 */}
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              aria-hidden
              className="block overflow-hidden rounded-xl border border-border shadow-[0_8px_24px_rgb(31_35_40/0.1)] sm:w-[56%] sm:shrink-0"
            >
              <div className="flex items-center gap-1.5 border-b border-border bg-code px-3 py-2">
                <span className="size-2 rounded-full bg-border" />
                <span className="size-2 rounded-full bg-border" />
                <span className="size-2 rounded-full bg-border" />
                <span className="ml-2 flex min-w-0 flex-1 items-center gap-1 rounded-full border border-border bg-background px-2.5 text-xs text-muted">
                  <LockOn width={10} height={10} className="shrink-0" />
                  <span className="truncate">{new URL(project.url).host}</span>
                </span>
              </div>
              <img
                src={project.screenshot}
                alt=""
                loading="lazy"
                className="block aspect-16/10 w-full bg-code object-cover object-top"
              />
            </a>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-sm text-muted">
                {project.description} · {project.year}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-2.5 text-xs leading-5 text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2 text-sm font-bold">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-foreground px-3 py-1.5 text-background hover:opacity-85"
                >
                  사이트 열기
                  <ArrowUpRight width={14} height={14} aria-hidden />
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 hover:bg-code"
                  >
                    <GithubFill width={14} height={14} aria-hidden />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
