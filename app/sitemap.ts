import type { MetadataRoute } from 'next'
import { routes, siteUrl } from '@/lib/i18n'
import { projects } from '@/content/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { pt: routes.home('pt'), en: routes.home('en') },
    { pt: routes.projects('pt'), en: routes.projects('en') },
    ...projects.map((project) => ({
      pt: routes.project('pt', project.slug),
      en: routes.project('en', project.slug),
    })),
  ]

  return pages.flatMap((page) =>
    (['pt', 'en'] as const).map((locale) => ({
      url: `${siteUrl}${page[locale]}`,
      alternates: { languages: { 'pt-BR': `${siteUrl}${page.pt}`, en: `${siteUrl}${page.en}` } },
    })),
  )
}
