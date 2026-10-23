import Link from 'next/link'
import { htmlLang, otherLocale, routes, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { profile } from '@/content/profile'
import { ThemeToggle } from './ThemeToggle'
import s from './Header.module.css'

export type Section = 'home' | 'projects' | 'project'

type Props = { locale: Locale; alternate: string; current?: Section }

export function Header({ locale, alternate, current }: Props) {
  const t = getDictionary(locale)
  const other = otherLocale(locale)
  const otherLang = htmlLang[other]

  return (
    <header className={`page ${s.header}`}>
      <Link className={s.brand} href={routes.home(locale)} aria-current={current === 'home' ? 'page' : undefined}>
        <span className={s.name}>{profile.name.toLowerCase()}</span>
      </Link>

      <nav className={s.nav} aria-label={t.nav.label}>
        <ul>
          <li>
            <Link
              href={routes.projects(locale)}
              aria-current={current === 'projects' ? 'page' : current === 'project' ? 'true' : undefined}
            >
              {t.nav.projects}
            </Link>
          </li>
          <li>
            <Link href={routes.path(locale)}>{t.nav.path}</Link>
          </li>
          <li>
            <Link href={routes.contact(locale)}>{t.nav.contact}</Link>
          </li>
        </ul>
      </nav>

      <div className={s.tools}>
        <ThemeToggle labels={t.theme} />
        <a className={s.lang} href={alternate} hrefLang={otherLang} lang={otherLang}>
          <span aria-hidden="true">{t.language.short[other]}</span>
          <span className="visually-hidden">{t.language.switchTo}</span>
        </a>
      </div>
    </header>
  )
}
