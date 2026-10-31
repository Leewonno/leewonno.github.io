import ArrowUpRight from '~icons/akar-icons/arrow-up-right'
import GithubFill from '~icons/akar-icons/github-fill'
import BrowserFrame from '@/components/BrowserFrame'
import { projects } from '@/data/playground'

export default function PlaygroundPage() {
  return (
    <>
      <title>Playground</title>
      <h1 className="my-4 text-xl font-semibold uppercase sm:my-5 sm:text-2xl">Playground</h1>
      <p className="mb-6 text-sm text-muted sm:text-base">직접 만들어서 배포한 개인 프로젝트예요.</p>
      <ul>
        {projects.map((project) => (
          <li
            key={project.url}
            className="flex flex-col gap-6 border-b border-border py-10 first:pt-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-10 sm:py-12 sm:first:pt-4 sm:even:flex-row-reverse"
          >
            {/* 아래 버튼 링크와 같은 곳으로 가므로 키보드·스크린리더에서는 건너뜀 */}
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              aria-hidden
              className="block overflow-hidden rounded-xl border border-border shadow-[0_8px_24px_rgb(31_35_40/0.1)] sm:w-[56%] sm:shrink-0"
            >
              <BrowserFrame url={project.url} title={project.title} screenshot={project.screenshot} />
            </a>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {project.description} · {project.year}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-2.5 text-xs leading-5 text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-foreground bg-foreground px-3 py-1.5 text-background hover:opacity-85"
                >
                  {project.linkLabel ?? '사이트 열기'}
                  <ArrowUpRight width={14} height={14} aria-hidden />
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 transition-colors duration-300 hover:bg-code motion-reduce:transition-none"
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
