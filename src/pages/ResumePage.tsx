import { resume } from '@/data/resume'

export default function ResumePage() {
  return (
    <>
      <title>Resume | leewonno</title>
      <header>
        <h1>{resume.name}</h1>
        <p>{resume.headline}</p>
        <p>
          <a href={`mailto:${resume.email}`}>{resume.email}</a> ·{' '}
          <a href={resume.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </header>

      <section>
        <h2>소개</h2>
        <p>{resume.summary}</p>
      </section>

      <section>
        <h2>기술</h2>
        <p>{resume.skills.join(' · ')}</p>
      </section>

      <section>
        <h2>경력</h2>
        {resume.experiences.map((experience) => (
          <div key={`${experience.company}-${experience.period}`}>
            <h3>
              {experience.company} · {experience.role}
            </h3>
            <p>{experience.period}</p>
            <ul>
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  )
}
