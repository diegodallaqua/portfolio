import type { Metadata } from 'next'
import { ogLocale, siteUrl, type Locale } from './i18n'
import { profile } from '@/content/profile'

type PageMeta = {
  locale: Locale
  title: string
  description: string
  /** Caminho desta página em cada idioma. */
  paths: Record<Locale, string>
}

export function pageMetadata({ locale, title, description, paths }: PageMeta): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    authors: [{ name: profile.name, url: profile.linkedin }],
    alternates: {
      canonical: paths[locale],
      languages: { 'pt-BR': paths.pt, en: paths.en, 'x-default': paths.pt },
    },
    openGraph: {
      type: 'website',
      url: paths[locale],
      title,
      description,
      siteName: profile.name,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === 'pt' ? 'en' : 'pt'],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
