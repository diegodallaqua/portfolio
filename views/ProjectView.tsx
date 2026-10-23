import { otherLocale, routes, type Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { SiteShell } from '@/components/SiteShell'
import { ProjectDetail } from '@/components/projects/ProjectDetail'

export function ProjectView({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <SiteShell locale={locale} alternate={routes.project(otherLocale(locale), project.slug)} current="project">
      <ProjectDetail project={project} locale={locale} />
    </SiteShell>
  )
}
