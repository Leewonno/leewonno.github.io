import Envelope from '~icons/akar-icons/envelope'
import File from '~icons/akar-icons/file'
import GithubFill from '~icons/akar-icons/github-fill'
import LinkedinFill from '~icons/akar-icons/linkedin-fill'
import Phone from '~icons/akar-icons/phone'
import HighlightAccordion from '@/components/HighlightAccordion'
import { resume, type Experience, type Highlight } from '@/data/resume'

const CURRENT_LABEL = '재직 중'

const getHighlightKey = (experience: Experience, highlight: Highlight) =>
  `${experience.company}-${highlight.title}`

// '2026.06 ~ 재직 중' → 시작/종료를 두 줄로 나눠 왼쪽 기간 열에 표시
const splitPeriod = (period: string) => {
  const [start, end = ''] = period.split('~').map((part) => part.trim())
  return { start, end }
}

const sectionTitleClass = 'text-sm font-semibold tracking-[0.08em] text-muted uppercase'

const contactLinkClass =
  'inline-flex size-7 items-center justify-center rounded-md border border-border text-muted transition-colors duration-300 hover:bg-code hover:text-foreground motion-reduce:transition-none sm:size-8'

const contactTextLinkClass =
  'tabular-nums transition-colors duration-300 hover:text-accent motion-reduce:transition-none'

export default function ResumePage() {
  return (
    <>
      <title>Resume</title>
      {/* 좁은 화면에서는 아바타 아래로 쌓아 가운데 정렬 */}
      <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-10 sm:text-left">
        <div className="size-32 shrink-0 overflow-hidden rounded-full bg-code sm:size-40">
          <img
            src={resume.avatar}
            alt=""
            className="size-full origin-[50%_40%] scale-110 object-cover object-top"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl leading-snug font-bold sm:text-[1.75rem]">{resume.name}</h1>
          <p className="mt-0.5 text-muted">{resume.headline}</p>
        </div>
      </header>

      {/* 좁은 화면에서는 전화·이메일·링크를 가로선으로 나눈 세 줄로 쌓음 */}
      <div className="mt-4 text-[0.9375rem] sm:mt-5 sm:flex sm:items-center sm:py-3">
        <dl className="divide-y divide-border sm:flex sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-2 py-2.5 sm:py-0 sm:pr-6">
            <dt className="text-muted">
              <Phone aria-hidden className="size-4" />
              <span className="sr-only">Phone</span>
            </dt>
            <dd>
              <a href={`tel:${resume.phone.replace(/\D/g, '')}`} className={contactTextLinkClass}>
                {resume.phone}
              </a>
            </dd>
          </div>
          <div className="flex items-center gap-2 py-2.5 sm:px-6 sm:py-0">
            <dt className="text-muted">
              <Envelope aria-hidden className="size-4" />
              <span className="sr-only">Email</span>
            </dt>
            <dd>
              <a href={`mailto:${resume.email}`} className={contactTextLinkClass}>
                {resume.email}
              </a>
            </dd>
          </div>
        </dl>
        <ul className="flex gap-1.5 border-t border-border py-2.5 sm:flex-1 sm:justify-end sm:border-t-0 sm:border-l sm:py-0 sm:pl-6">
          <li>
            <a
              href={resume.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className={contactLinkClass}
            >
              <GithubFill aria-hidden className="size-3.5 sm:size-4" />
            </a>
          </li>
          <li>
            <a
              href={resume.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className={contactLinkClass}
            >
              <LinkedinFill aria-hidden className="size-3.5 sm:size-4" />
            </a>
          </li>
          <li>
            <a
              href={resume.pdf}
              target="_blank"
              rel="noreferrer"
              aria-label="이력서 PDF (새 창)"
              title="이력서 PDF"
              className={contactLinkClass}
            >
              <File aria-hidden className="size-3.5 sm:size-4" />
            </a>
          </li>
        </ul>
      </div>

      <section className="mt-14">
        <h2 className={`${sectionTitleClass} border-b border-border pb-2`}>경력</h2>
        {resume.experiences.map((experience) => {
          const { start, end } = splitPeriod(experience.period)
          return (
            <article
              key={`${experience.company}-${experience.period}`}
              className="grid grid-cols-[150px_minmax(0,1fr)] gap-x-8 gap-y-2 border-b border-border py-6 last:border-b-0 max-sm:grid-cols-1"
            >
              <p className="pt-0.5 text-sm text-muted tabular-nums sm:text-[0.9375rem]">
                {start} ~
                <br className="max-sm:hidden" />{' '}
                {end === CURRENT_LABEL ? (
                  <span className="text-xs font-semibold text-accent sm:text-[0.8125rem]">
                    {end}
                  </span>
                ) : (
                  end
                )}
              </p>
              <div>
                <h3 className="flex items-center gap-2 text-[1.0625rem] leading-snug font-semibold sm:text-lg">
                  {experience.logo && (
                    // 심볼 색이 다크 모드 배경에 묻히지 않도록 항상 흰 바탕 위에 표시
                    <span className="flex size-5.5 shrink-0 items-center justify-center rounded-[5px] border border-border/50 bg-white">
                      <img src={experience.logo} alt="" className="size-3.5 object-contain" />
                    </span>
                  )}
                  {experience.company}
                </h3>
                <p className="mt-1 text-sm text-muted sm:text-[0.9375rem]">
                  {experience.team} · {experience.role}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {experience.highlights.map((highlight) => (
                    <HighlightAccordion
                      key={getHighlightKey(experience, highlight)}
                      highlight={highlight}
                    />
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="mt-14">
        <h2 className={`${sectionTitleClass} border-b border-border pb-2`}>기술</h2>
        {/* 카테고리별 카드를 2열로 배치, 좁은 화면에서는 1열 */}
        <div className="grid grid-cols-2 gap-3 pt-4 max-sm:grid-cols-1">
          {resume.skills.map((group) => (
            <div key={group.category} className="rounded-lg border border-border p-4">
              <h3 className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">
                {group.category}
              </h3>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="rounded-md border border-border px-2 py-0.5 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
              <span className="text-[0.9375rem] text-muted tabular-nums">{certification.date}</span>
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
              <span className="text-[0.9375rem] text-muted tabular-nums">{education.period}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
