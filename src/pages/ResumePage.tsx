import { useState } from 'react'
import ChevronDown from '~icons/akar-icons/chevron-down'
import { resume, type Experience, type Highlight } from '@/data/resume'

const CURRENT_LABEL = '재직 중'

const getHighlightKey = (experience: Experience, highlight: Highlight) =>
  `${experience.company}-${highlight.title}`

const ALL_HIGHLIGHT_KEYS = resume.experiences.flatMap((experience) =>
  experience.highlights.map((highlight) => getHighlightKey(experience, highlight)),
)

// '2026.06 ~ 재직 중' → 시작/종료를 두 줄로 나눠 왼쪽 기간 열에 표시
const splitPeriod = (period: string) => {
  const [start, end = ''] = period.split('~').map((part) => part.trim())
  return { start, end }
}

const sectionTitleClass =
  'text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase'

export default function ResumePage() {
  const [openKeys, setOpenKeys] = useState<ReadonlySet<string>>(() => new Set())
  const isAllOpen = openKeys.size === ALL_HIGHLIGHT_KEYS.length

  const toggleAll = () => setOpenKeys(new Set(isAllOpen ? [] : ALL_HIGHLIGHT_KEYS))

  // <details>를 직접 열고 닫을 때도 상태를 맞춰 '모두 펼치기' 버튼 문구가 어긋나지 않게 함
  const syncOpen = (key: string, open: boolean) =>
    setOpenKeys((prev) => {
      if (prev.has(key) === open) return prev
      return new Set(open ? [...prev, key] : [...prev].filter((openKey) => openKey !== key))
    })

  return (
    <>
      <title>Resume</title>
      <header className="flex items-center gap-5">
        <img
          src={resume.avatar}
          alt=""
          className="size-18 shrink-0 rounded-full border border-border bg-code"
        />
        <div>
          <h1 className="text-[1.75rem] leading-snug font-bold">{resume.name}</h1>
          <p className="mt-0.5 text-muted">{resume.headline}</p>
          <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem]">
            <li>
              <a href={`mailto:${resume.email}`} className="text-accent hover:underline">
                {resume.email}
              </a>
            </li>
            <li>
              <a
                href={resume.github}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {resume.github.replace(/^https:\/\//, '')}
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section className="mt-14">
        <div className="flex items-baseline justify-between border-b border-border pb-2">
          <h2 className={sectionTitleClass}>경력</h2>
          <button
            type="button"
            onClick={toggleAll}
            className="cursor-pointer text-sm text-accent hover:underline"
          >
            {isAllOpen ? '모두 접기' : '모두 펼치기'}
          </button>
        </div>
        {resume.experiences.map((experience) => {
          const { start, end } = splitPeriod(experience.period)
          return (
            <article
              key={`${experience.company}-${experience.period}`}
              className="grid grid-cols-[150px_minmax(0,1fr)] gap-x-8 gap-y-2 border-b border-border py-6 last:border-b-0 max-sm:grid-cols-1"
            >
              <p className="pt-0.5 text-sm text-muted tabular-nums">
                {start} ~
                <br className="max-sm:hidden" />{' '}
                {end === CURRENT_LABEL ? (
                  <span className="text-xs font-semibold text-accent">{end}</span>
                ) : (
                  end
                )}
              </p>
              <div>
                <h3 className="text-lg font-semibold">
                  {experience.company}
                  <span className="ml-2 text-sm font-normal text-muted max-sm:ml-0 max-sm:block">
                    {experience.team} · {experience.role}
                  </span>
                </h3>
                <div className="mt-2">
                  {experience.highlights.map((highlight) => {
                    const key = getHighlightKey(experience, highlight)
                    return (
                      <details
                        key={key}
                        open={openKeys.has(key)}
                        onToggle={(event) => syncOpen(key, event.currentTarget.open)}
                        className="group"
                      >
                        <summary className="-mx-3 flex cursor-pointer list-none items-start gap-3 rounded-md px-3 py-2 hover:bg-code [&::-webkit-details-marker]:hidden">
                          <span className="flex-1 font-semibold">{highlight.title}</span>
                          {highlight.metric && (
                            <span className="shrink-0 pt-0.5 text-[0.8125rem] text-muted tabular-nums max-sm:hidden">
                              {highlight.metric.before} →{' '}
                              <span className="font-semibold text-foreground">
                                {highlight.metric.after}
                              </span>
                            </span>
                          )}
                          <ChevronDown
                            width={16}
                            height={16}
                            aria-hidden
                            className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
                          />
                        </summary>
                        <p className="pr-7 pb-3 text-[0.9375rem] text-muted">
                          {highlight.description}
                        </p>
                      </details>
                    )
                  })}
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="mt-14">
        <h2 className={`${sectionTitleClass} border-b border-border pb-2`}>기술</h2>
        <dl className="grid grid-cols-[150px_minmax(0,1fr)] gap-x-8 gap-y-2.5 pt-4 max-sm:grid-cols-1 max-sm:gap-y-0.5">
          {resume.skills.map((group) => (
            <div key={group.category} className="contents">
              <dt className="text-sm font-semibold max-sm:mt-2">{group.category}</dt>
              <dd className="text-[0.9375rem]">{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <h2 className={`${sectionTitleClass} border-b border-border pb-2`}>자격증</h2>
        <ul>
          {resume.certifications.map((certification) => (
            <li
              key={certification.name}
              className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-2.5"
            >
              <span>
                <strong className="font-semibold">{certification.name}</strong>
                <span className="ml-2 text-[0.9375rem] text-muted">{certification.issuer}</span>
              </span>
              <span className="text-sm text-muted tabular-nums">{certification.date}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className={`${sectionTitleClass} border-b border-border pb-2`}>학력</h2>
        <ul>
          {resume.education.map((education) => (
            <li
              key={education.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-2.5"
            >
              <span>
                <strong className="font-semibold">{education.school}</strong>
                <span className="ml-2 text-[0.9375rem] text-muted">
                  {education.major} · 학점 {education.gpa}
                </span>
              </span>
              <span className="text-sm text-muted tabular-nums">{education.period}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
