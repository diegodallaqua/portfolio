import Link from 'next/link'
import { routes, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { projects } from '@/content/projects'
import { Record } from '../Record'
import { Arrow } from '../Icons'
import { ApiCover, ShotCover } from './Covers'
import s from './Discography.module.css'

type Props = {
  locale: Locale
  /** A página de projetos usa h1; a página inicial, h2. */
  heading: 'h1' | 'h2'
  intro: string
  id?: string
}

/**
 * Os projetos como discos, um por linha, com um único seletor Lado A ⇄ Lado B
 * que vira todos ao mesmo tempo. Funciona só com CSS (:has), sem JavaScript.
 */
export function Discography({ locale, heading: Heading, intro, id }: Props) {
  const t = getDictionary(locale)
  const Name = Heading === 'h1' ? 'h2' : 'h3'

  return (
    <section id={id} className={`page ${s.section}`} aria-labelledby="discos-titulo" data-records>
      <div className={s.head}>
        <Heading id="discos-titulo" className={`cover-type ${Heading === 'h1' ? s.titleLarge : s.title}`}>
          {t.home.projectsTitle}
        </Heading>
        <p className={s.intro}>{intro}</p>
      </div>

      <div className={s.switchBar}>
        <fieldset className={s.switch}>
          <legend className="visually-hidden">{t.sides.switchLabel}</legend>
          <label>
            <input type="radio" name="lado" value="a" defaultChecked />
            <span>
              <b>{t.sides.a}</b> {t.sides.ui}
            </span>
          </label>
          <label>
            <input type="radio" name="lado" value="b" />
            <span>
              <b>{t.sides.b}</b> {t.sides.api}
            </span>
          </label>
        </fieldset>
      </div>

      <ol className={s.list}>
        {projects.map((project, i) => {
          const href = routes.project(locale, project.slug)
          const titleId = `disco-${project.slug}`
          return (
            <li key={project.slug} className={s.item} data-mirror={i % 2 === 1 || undefined}>
              <article className={s.row} aria-labelledby={titleId}>
                <Record
                  className={s.record}
                  mirror={i % 2 === 1}
                  front={
                    <ShotCover
                      project={project}
                      locale={locale}
                      sizes="(min-width: 1080px) 520px, 84vw"
                      priority={i === 0 && Heading === 'h1'}
                    />
                  }
                  back={<ApiCover project={project} locale={locale} />}
                />
                <div className={s.info}>
                  <Name id={titleId} className={`cover-type ${s.name}`}>
                    <Link href={href}>{project.name}</Link>
                  </Name>
                  <p className={s.kind}>{project.kind[locale]}</p>
                  <p className={s.summary}>{project.summary[locale]}</p>
                  <dl className={s.sides}>
                    <div data-side="a">
                      <dt>
                        {t.sides.a} · {t.sides.ui}
                      </dt>
                      <dd>{project.frontend.stack.slice(0, 4).join(' · ')}</dd>
                    </div>
                    <div data-side="b">
                      <dt>
                        {t.sides.b} · {t.sides.api}
                      </dt>
                      <dd>{project.backend.stack.slice(0, 4).join(' · ')}</dd>
                    </div>
                  </dl>
                  <Link className="button" href={href} aria-describedby={titleId}>
                    {t.home.open}
                    <Arrow />
                  </Link>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
