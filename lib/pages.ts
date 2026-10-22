import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { routes, type Locale } from './i18n'
import { pageMetadata } from './metadata'
import { getDictionary } from '@/content/dictionary'
import { getProject, projects } from '@/content/projects'

/** Metadados compartilhados pelas rotas dos dois idiomas. */
export const homeMetadata = (locale: Locale): Metadata => {
  const t = getDictionary(locale).home
  return pageMetadata({
    locale,
    title: t.title,
    description: t.description,
    paths: { pt: routes.home('pt'), en: routes.home('en') },
  })
}

export const projectsMetadata = (locale: Locale): Metadata => {
  const t = getDictionary(locale).projects
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.description,
    paths: { pt: routes.projects('pt'), en: routes.projects('en') },
  })
}

export const projectStaticParams = () => projects.map((project) => ({ slug: project.slug }))

export const loadProject = (slug: string) => getProject(slug) ?? notFound()

export const projectMetadata = (locale: Locale, slug: string): Metadata => {
  const project = getProject(slug)
  if (!project) return {}
  return pageMetadata({
    locale,
    title: `${project.name} · Diego Dallaqua`,
    description: `${project.kind[locale]}. ${project.summary[locale]}`,
    paths: { pt: routes.project('pt', slug), en: routes.project('en', slug) },
  })
}
