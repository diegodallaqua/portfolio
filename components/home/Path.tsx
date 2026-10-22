import Link from 'next/link'
import { routes, sectionId, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { profile, timeline } from '@/content/profile'
import { Arrow } from '../Icons'
import s from './Path.module.css'

/** Trajetória como texto de contracapa: a frase do Diego e as etapas, em ordem. */
export function Path({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home
  const last = timeline.length - 1

  return (
    <section id={sectionId.path[locale]} className={`page ${s.section}`} aria-labelledby="trajetoria-titulo">
      <div className={s.head}>
        <h2 id="trajetoria-titulo" className={`cover-type ${s.title}`}>
          {t.pathTitle}
        </h2>
        <p className={s.intro}>{t.pathIntro}</p>
        <blockquote className={s.quote}>
          <p>{profile.philosophy[locale]}</p>
        </blockquote>
      </div>

      <ol className={s.list}>
        {timeline.map((entry, i) => {
          const state = !entry.text ? 'pending' : i === last ? 'now' : 'done'
          return (
            <li key={entry.id} className={s.entry} data-state={state}>
              <h3 className={s.label}>
                {entry.label[locale]}
                {state === 'now' && <span className={s.now}>{t.now}</span>}
              </h3>
              <div className={s.body}>
                {entry.when && <p className={s.when}>{entry.when[locale]}</p>}
                {entry.text ? (
                  <>
                    <p>{entry.text[locale]}</p>
                    {entry.projectSlug && (
                      <Link className={s.link} href={routes.project(locale, entry.projectSlug)}>
                        {t.seeProject}
                        <Arrow />
                      </Link>
                    )}
                  </>
                ) : (
                  <p className={s.pending}>
                    <span className={s.pendingTag}>{t.pending}</span>
                    {entry.pending?.[locale]}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
