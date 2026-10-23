import Image from 'next/image'
import Link from 'next/link'
import { routes, sectionId, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { Record } from '../Record'
import { Arrow } from '../Icons'
import coverArt from '@/public/images/curto-circuito.webp'
import s from './Hero.module.css'

/** O disco do próprio Diego: arte Curto-circuito e os projetos como lista de faixas. */
export function Hero({ locale }: { locale: Locale }) {
  const h = getDictionary(locale).home

  return (
    <section className={`page ${s.hero}`} aria-labelledby="capa-titulo">
      <Record
        className={s.record}
        entrance="load"
        front={
          <div className={s.cover}>
            <Image
              src={coverArt}
              alt=""
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1080px) 544px, (min-width: 720px) 80vw, 82vw"
              className={s.artwork}
            />
            <h1 id="capa-titulo" className={s.coverTitle}>
              <span className={s.coverName}>{profile.name.toLowerCase()}</span>
              <span className="visually-hidden">: </span>
              <span className={`cover-type ${s.coverWords}`}>
                {h.cover.lead}
                <br />
                {h.cover.tail}
              </span>
            </h1>
            <span className={`dots ${s.dots}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
        }
      />

      <div className={s.notes}>
        <p className={s.role}>{profile.role[locale]}</p>
        <p className={s.where}>{profile.location[locale]}</p>
        <p className={s.bio}>{profile.bio[locale]}</p>

        <h2 className={s.tracksTitle}>{h.records}</h2>
        <ol className={s.tracks}>
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link href={routes.project(locale, project.slug)} className={s.track}>
                <span className={s.trackNo} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={s.trackName}>{project.name}</span>
                <span className={s.trackStack}>
                  {project.frontend.stack[0]} / {project.backend.stack[0]}
                </span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ol>

        <div className={s.actions}>
          <Link className="button" data-tone="solid" href={routes.projects(locale)}>
            {h.ctaProjects}
            <Arrow />
          </Link>
          <a className="button" href={`#${sectionId.contact[locale]}`}>
            {h.ctaContact}
          </a>
        </div>
      </div>
    </section>
  )
}
