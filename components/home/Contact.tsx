import { sectionId, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { profile } from '@/content/profile'
import { Arrow, GitHubIcon, LinkedInIcon } from '../Icons'
import s from './Contact.module.css'

/** Fim do disco: o endereço impresso na contracapa, em tinta cheia. */
export function Contact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home

  return (
    <section id={sectionId.contact[locale]} className="page" aria-labelledby="contato-titulo">
      <div className={s.panel} data-reveal>
        <div className={s.text}>
          <h2 id="contato-titulo" className={`cover-type ${s.title}`}>
            {t.contactTitle}
          </h2>
          <p className={s.lead}>{t.contactText}</p>
        </div>

        <div className={s.reach}>
          <p className={s.label}>{t.emailLabel}</p>
          <a className={s.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className={s.links}>
            <li>
              <a href={profile.linkedin} rel="me">
                <LinkedInIcon />
                LinkedIn
                <Arrow diagonal />
              </a>
            </li>
            <li>
              <a href={profile.github} rel="me">
                <GitHubIcon />
                GitHub
                <Arrow diagonal />
              </a>
            </li>
          </ul>
          <p className={s.where}>{profile.location[locale]}</p>
        </div>

        <span className={`dots ${s.dots}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    </section>
  )
}
