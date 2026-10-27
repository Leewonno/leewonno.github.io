import { useState } from 'react'
import ChevronRight from '~icons/akar-icons/chevron-right'
import { resume, type Experience, type Highlight } from '@/data/resume'

const getHighlightKey = (experience: Experience, highlight: Highlight) =>
  `${experience.company}-${highlight.title}`

const ALL_HIGHLIGHT_KEYS = resume.experiences.flatMap((experience) =>
  experience.highlights.map((highlight) => getHighlightKey(experience, highlight)),
)

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
      <title>Resume | leewonno</title>
      <header className="flex items-center gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <img
          src={resume.avatar}
          alt=""
          className="size-24 shrink-0 rounded-full border border-border bg-code max-sm:size-18"
        />
        <div>
          <h1 className="text-[1.75rem] leading-snug font-bold">{resume.name}</h1>
          <p className="mt-0.5 text-[1.0625rem] text-muted">{resume.headline}</p>
          <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem]">
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

      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">경력</h2>
          <button
            type="button"
            onClick={toggleAll}
            className="cursor-pointer text-sm text-accent hover:underline"
          >
            {isAllOpen ? '모두 접기' : '모두 펼치기'}
          </button>
        </div>
        {resume.experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.period}`}
            className="mb-4 overflow-hidden rounded-md border border-border"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border bg-code px-4 py-2.5">
              <h3 className="font-semibold">
                {experience.company}
                <span className="ml-2 text-sm font-normal text-muted max-sm:ml-0 max-sm:block">
                  {experience.team}, {experience.role}
                </span>
              </h3>
              <p className="text-sm text-muted tabular-nums">{experience.period}</p>
            </div>
            {experience.highlights.map((highlight) => {
              const key = getHighlightKey(experience, highlight)
              return (
                <details
                  key={key}
                  open={openKeys.has(key)}
                  onToggle={(event) => syncOpen(key, event.currentTarget.open)}
                  className="group border-border not-first-of-type:border-t"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-2.5 px-4 py-3 hover:bg-code [&::-webkit-details-marker]:hidden">
                    <ChevronRight
                      width={16}
                      height={16}
                      aria-hidden
                      className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-90 motion-reduce:transition-none"
                    />
                    <span className="flex-1 font-medium">{highlight.title}</span>
                    {highlight.metric && (
                      <span className="shrink-0 pt-0.5 text-[0.8125rem] text-muted tabular-nums max-sm:hidden">
                        {highlight.metric.before} →{' '}
                        <span className="font-semibold text-foreground">
                          {highlight.metric.after}
                        </span>
                      </span>
                    )}
                  </summary>
                  <p className="pr-4 pb-4 pl-[42px] text-[0.9375rem]">{highlight.description}</p>
                </details>
              )
            })}
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">기술</h2>
        {resume.skills.map((group) => (
          <div
            key={group.category}
            className="mb-3 grid grid-cols-[96px_1fr] items-start gap-x-4 gap-y-2 max-sm:grid-cols-1"
          >
            <h3 className="pt-0.5 text-sm font-semibold">{group.category}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-accent/10 px-2.5 text-[0.8125rem] leading-[1.85] font-medium text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">자격증</h2>
        <ul className="border-t border-border">
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

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">학력</h2>
        <ul className="border-t border-border">
          {resume.education.map((education) => (
            <li
              key={education.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-2.5"
            >
              <span>
                <strong className="font-semibold">{education.school}</strong>
                <span className="ml-2 text-[0.9375rem] text-muted">
                  {education.major}, 학점 {education.gpa}
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
