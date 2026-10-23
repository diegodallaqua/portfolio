export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]

/** Texto presente nos dois idiomas. */
export type Localized<T = string> = Record<Locale, T>

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

/** O idioma para o qual o seletor de idioma leva. */
export const otherLocale = (locale: Locale): Locale => (locale === 'pt' ? 'en' : 'pt')

/** Âncoras das seções da página inicial. */
export const sectionId = {
  projects: { pt: 'projetos', en: 'projects' },
  path: { pt: 'trajetoria', en: 'path' },
  contact: { pt: 'contato', en: 'contact' },
} satisfies Record<string, Localized>

/**
 * Rotas de cada idioma. O português fica na raiz e o inglês em /en,
 * com o segmento de projetos traduzido.
 */
export const routes = {
  home: (locale: Locale) => (locale === 'pt' ? '/' : '/en'),
  projects: (locale: Locale) => (locale === 'pt' ? '/projetos' : '/en/projects'),
  project: (locale: Locale, slug: string) =>
    locale === 'pt' ? `/projetos/${slug}` : `/en/projects/${slug}`,
  path: (locale: Locale) => `${routes.home(locale)}#${sectionId.path[locale]}`,
  contact: (locale: Locale) => `${routes.home(locale)}#${sectionId.contact[locale]}`,
}

export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
})()
