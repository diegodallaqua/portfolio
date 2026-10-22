import { routes, type Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { SiteShell } from '@/components/SiteShell'
import { ProjectDetail } from '@/components/projects/ProjectDetail'

export function ProjectView({ project, locale }: { project: Project; locale: Locale }) {
  const other: Locale = locale === 'pt' ? 'en' : 'pt'
  return (
    <SiteShell locale={locale} alternate={routes.project(other, project.slug)} current="project">
      <ProjectDetail project={project} locale={locale} />
    </SiteShell>
  )
}
