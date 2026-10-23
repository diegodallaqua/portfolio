import type { ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { Header, type Section } from './Header'
import { Footer } from './Footer'
import { ScrollReveal } from './ScrollReveal'

type Props = {
  locale: Locale
  /** Endereço da mesma página no outro idioma. */
  alternate: string
  current?: Section
  children: ReactNode
}

export function SiteShell({ locale, alternate, current, children }: Props) {
  const t = getDictionary(locale)

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {t.skip}
      </a>
      <Header locale={locale} alternate={alternate} current={current} />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <Footer locale={locale} alternate={alternate} />
      <ScrollReveal />
    </>
  )
}
