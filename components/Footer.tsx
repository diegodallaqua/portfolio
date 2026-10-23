import { htmlLang, otherLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { profile } from '@/content/profile'
import { Arrow, GitHubIcon, LinkedInIcon } from './Icons'
import s from './Footer.module.css'

export function Footer({ locale, alternate }: { locale: Locale; alternate: string }) {
  const t = getDictionary(locale)
  const otherLang = htmlLang[otherLocale(locale)]

  return (
    <footer className={`page ${s.footer}`}>
      <p>
        © 2026 {t.footer.rights}. {t.footer.built}
      </p>
      <ul className={s.links}>
        <li>
          <a href={profile.github} rel="me">
            <GitHubIcon />
            GitHub
          </a>
        </li>
        <li>
          <a href={profile.linkedin} rel="me">
            <LinkedInIcon />
            LinkedIn
          </a>
        </li>
        <li>
          <a href={alternate} hrefLang={otherLang} lang={otherLang}>
            {t.language.switchTo}
            <Arrow />
          </a>
        </li>
      </ul>
    </footer>
  )
}
