import { works } from '@/data/works'

export default function WorksPage() {
  return (
    <>
      <title>Works | leewonno</title>
      <h1>Works</h1>
      {works.map((work) => (
        <section key={work.title}>
          {work.thumbnail && <img src={work.thumbnail} alt={work.title} loading="lazy" />}
          <h2>
            {work.link ? (
              <a href={work.link} target="_blank" rel="noreferrer">
                {work.title}
              </a>
            ) : (
              work.title
            )}
          </h2>
          <p>
            {work.category} · {work.year}
          </p>
          <p>{work.description}</p>
        </section>
      ))}
    </>
  )
}
