import ChevronDown from '~icons/akar-icons/chevron-down'
import Envelope from '~icons/akar-icons/envelope'
import GithubFill from '~icons/akar-icons/github-fill'
import { resume, type Experience, type Highlight } from '@/data/resume'

const CURRENT_LABEL = '재직 중'

const getHighlightKey = (experience: Experience, highlight: Highlight) =>
  `${experience.company}-${highlight.title}`

// '2026.06 ~ 재직 중' → 시작/종료를 두 줄로 나눠 왼쪽 기간 열에 표시
const splitPeriod = (period: string) => {
  const [start, end = ''] = period.split('~').map((part) => part.trim())
  return { start, end }
}

const sectionTitleClass =
  'text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase'

const contactLinkClass =
  'inline-flex size-8 items-center justify-center rounded-md border border-border text-muted transition-colors duration-300 hover:bg-code hover:text-foreground motion-reduce:transition-none sm:size-9'

export default function ResumePage() {
  return (
    <>
      <title>Resume</title>
      <header className="flex items-center gap-4 sm:gap-6">
        <img
          src={resume.avatar}
          alt=""
          className="size-20 shrink-0 rounded-full border border-border bg-code object-cover object-top sm:size-28"
        />
        <div className="min-w-0">
          <h1 className="text-2xl leading-snug font-bold sm:text-[1.75rem]">{resume.name}</h1>
          <p className="mt-0.5 text-muted">{resume.headline}</p>
          <ul className="mt-2.5 flex gap-2">
            <li>
              <a
                href={`mailto:${resume.email}`}
                aria-label={`이메일 ${resume.email}`}
                title={resume.email}
                className={contactLinkClass}
              >
                <Envelope aria-hidden className="size-4 sm:size-4.5" />
              </a>
            </li>
            <li>
              <a
                href={resume.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className={contactLinkClass}
              >
                <GithubFill aria-hidden className="size-4 sm:size-4.5" />
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section className="mt-14">
        <h2 className={`${sectionTitleClass} border-b border-border pb-2`}>경력</h2>
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
                <h3 className="flex items-center gap-2 text-lg leading-snug font-semibold">
                  {experience.logo && (
                    // 심볼 색이 다크 모드 배경에 묻히지 않도록 항상 흰 바탕 위에 표시
                    <span className="flex size-5.5 shrink-0 items-center justify-center rounded-[5px] border border-border bg-white">
                      <img src={experience.logo} alt="" className="size-3.5 object-contain" />
                    </span>
                  )}
                  {experience.company}
                </h3>
                <p className="text-sm text-muted">
                  {experience.team} · {experience.role}
                </p>
                <div className="mt-2">
                  {experience.highlights.map((highlight) => (
                    <details key={getHighlightKey(experience, highlight)} className="group">
                      <summary className="-mx-3 flex cursor-pointer list-none items-start gap-3 rounded-md px-3 py-2 transition-colors duration-300 hover:bg-code motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
                        {/* 좁은 화면에서는 지표를 제목 아래 줄로 내림 */}
                        <span className="flex flex-1 items-start gap-3 max-sm:flex-col max-sm:gap-0.5">
                          <span className="flex-1 font-semibold">{highlight.title}</span>
                          {highlight.metric && (
                            <span className="shrink-0 text-[0.8125rem] text-muted tabular-nums sm:pt-0.5">
                              {highlight.metric.before} →{' '}
                              <span className="font-semibold text-foreground">
                                {highlight.metric.after}
                              </span>
                            </span>
                          )}
                        </span>
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
                  ))}
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
              <dd className="text-[0.9375rem] text-muted">{group.items.join(' · ')}</dd>
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
                <span className="mt-0.5 block text-[0.9375rem] text-muted">
                  {certification.issuer}
                </span>
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
                <span className="mt-0.5 block text-[0.9375rem] text-muted">
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
