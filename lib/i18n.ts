export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]

/** Texto presente nos dois idiomas. */
export type Localized<T = string> = Record<Locale, T>

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' }

/**
 * Rotas de cada idioma. O português fica na raiz e o inglês em /en,
 * com o segmento de projetos traduzido.
 */
export const routes = {
  home: (locale: Locale) => (locale === 'pt' ? '/' : '/en'),
  projects: (locale: Locale) => (locale === 'pt' ? '/projetos' : '/en/projects'),
  project: (locale: Locale, slug: string) =>
    locale === 'pt' ? `/projetos/${slug}` : `/en/projects/${slug}`,
  path: (locale: Locale) => (locale === 'pt' ? '/#trajetoria' : '/en#path'),
  contact: (locale: Locale) => (locale === 'pt' ? '/#contato' : '/en#contact'),
}

export const sectionId = {
  path: { pt: 'trajetoria', en: 'path' },
  contact: { pt: 'contato', en: 'contact' },
} satisfies Record<string, Record<Locale, string>>

export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
})()
