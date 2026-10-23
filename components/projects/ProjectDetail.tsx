import type { ReactNode } from 'react'
import Link from 'next/link'
import { routes, type Locale } from '@/lib/i18n'
import { getDictionary, type Dictionary } from '@/content/dictionary'
import { projects, type Project, type Side } from '@/content/projects'
import { Record } from '../Record'
import { CodeView } from '../CodeView'
import { ShotFrame } from '../ShotFrame'
import { Arrow, GitHubIcon, LockIcon } from '../Icons'
import { LogoCover } from './Covers'
import s from './ProjectDetail.module.css'

/** Um disco aberto: capa, os dois lados com suas faixas, o encarte de capturas e as notas. */
export function ProjectDetail({ project, locale }: { project: Project; locale: Locale }) {
  const t = getDictionary(locale)
  const p = t.project
  const position = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(position + 1) % projects.length]!
  const sameRepo = project.backend.repo.url === project.frontend.repo.url
  const uiShot = project.shots.find((shot) => shot.frame === 'desktop') ?? project.shots[0]
  // A captura do Lado A não se repete no encarte.
  const galleryShots = project.shots.filter((shot) => shot !== uiShot)

  return (
    <>
      <section className={`page ${s.top}`} aria-labelledby="titulo">
        <Record
          className={s.record}
          entrance="load"
          front={<LogoCover project={project} priority />}
        />
        <div className={s.intro}>
          <h1 id="titulo" className={`cover-type ${s.title}`}>
            {project.name}
          </h1>
          <p className={s.kind}>{project.kind[locale]}</p>
          <div className={s.description}>
            {project.description[locale].map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <dl className={s.facts}>
            <div>
              <dt>{sameRepo ? p.repo : p.repos}</dt>
              <dd className={s.repos}>
                <RepoLink side={project.frontend} privateLabel={p.private} />
                {!sameRepo && <RepoLink side={project.backend} privateLabel={p.private} />}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <SideSection
        id="lado-a"
        side={project.frontend}
        name={`${t.sides.a} · ${t.sides.ui}`}
        prefix="A"
        locale={locale}
        t={t}
      >
        {uiShot && <ShotFrame shot={uiShot} project={project} locale={locale} sizes="(min-width: 1080px) 640px, 100vw" />}
      </SideSection>

      <SideSection
        id="lado-b"
        side={project.backend}
        name={`${t.sides.b} · ${t.sides.api}`}
        prefix="B"
        locale={locale}
        t={t}
      >
        <CodeView code={project.api.code[locale]} label={`${p.sample}: ${project.api.title[locale]}`} />
      </SideSection>

      <section id="capturas" className={`page ${s.shots}`} aria-labelledby="capturas-titulo">
        <h2 id="capturas-titulo" className={`cover-type ${s.sectionTitle}`} data-reveal>
          {p.shots}
        </h2>
        <div className={s.gallery}>
          {galleryShots.map((shot, i) => (
            <ShotFrame
              key={`${shot.frame}-${i}`}
              className={s.shot}
              shot={shot}
              project={project}
              locale={locale}
              sizes={shot.frame === 'desktop' ? '(min-width: 1080px) 760px, 100vw' : '300px'}
              reveal
            />
          ))}
        </div>
      </section>

      {project.notes[locale].length > 0 && (
        <section className={`page ${s.notes}`} aria-labelledby="notas" data-reveal>
          <h2 id="notas" className={s.notesTitle}>
            {p.notes}
          </h2>
          <ul>
            {project.notes[locale].map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      <nav className={`page ${s.next}`} aria-label={p.next} data-reveal>
        <Link className={s.nextLink} href={routes.project(locale, next.slug)}>
          <span className="visually-hidden">{p.next}: </span>
          <span className={`cover-type ${s.nextName}`}>{next.name}</span>
          <span className={s.nextKind}>{next.kind[locale]}</span>
          <Arrow />
        </Link>
      </nav>
    </>
  )
}

function RepoLink({ side, privateLabel }: { side: Side; privateLabel: string }) {
  if (!side.repo.public) {
    return (
      <span className={s.repo}>
        <GitHubIcon />
        {side.repo.name}
        <span className={s.private}>
          <LockIcon />
          {privateLabel}
        </span>
      </span>
    )
  }
  return (
    <a href={side.repo.url} className={s.repo}>
      <GitHubIcon />
      <span className={s.repoLinked}>{side.repo.name}</span>
      <Arrow diagonal />
    </a>
  )
}

/** Um lado do disco: título, repositório, stack e as faixas (destaques) numeradas. */
function SideSection({
  id,
  side,
  name,
  prefix,
  locale,
  t,
  children,
}: {
  id: string
  side: Side
  name: string
  prefix: 'A' | 'B'
  locale: Locale
  t: Dictionary
  children: ReactNode
}) {
  const titleId = `${id}-titulo`
  return (
    <section id={id} className={`page ${s.side}`} aria-labelledby={titleId}>
      <div className={s.sideHead} data-reveal>
        <h2 id={titleId} className={`cover-type ${s.sectionTitle}`}>
          {name}
        </h2>
        <p className={s.sideKind}>{side.title[locale]}</p>
        <RepoLink side={side} privateLabel={t.project.private} />
        <ul className={s.chips} aria-label={t.project.stack}>
          {side.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
      <div className={s.sideBody}>
        <ol className={s.tracks} data-reveal>
          {side.highlights[locale].map((item, i) => (
            <li key={item}>
              <span className={s.trackNo} aria-hidden="true">
                {prefix}
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <div className={s.sideMedia} data-reveal>
          {children}
        </div>
      </div>
    </section>
  )
}
