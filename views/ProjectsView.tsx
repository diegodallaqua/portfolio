import { otherLocale, routes, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { SiteShell } from '@/components/SiteShell'
import { Discography } from '@/components/projects/Discography'

export function ProjectsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  return (
    <SiteShell locale={locale} alternate={routes.projects(otherLocale(locale))} current="projects">
      <Discography locale={locale} heading="h1" intro={t.projects.intro} />
    </SiteShell>
  )
}
