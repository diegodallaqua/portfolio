import { otherLocale, routes, sectionId, siteUrl, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { SiteShell } from '@/components/SiteShell'
import { Hero } from '@/components/home/Hero'
import { Path } from '@/components/home/Path'
import { Stack } from '@/components/home/Stack'
import { Contact } from '@/components/home/Contact'
import { Discography } from '@/components/projects/Discography'

export function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role[locale],
    description: profile.bio[locale],
    email: `mailto:${profile.email}`,
    url: `${siteUrl}${routes.home(locale)}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Presidente Prudente', addressRegion: 'SP', addressCountry: 'BR' },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: ['Java', 'Spring Boot', 'Node.js', 'TypeScript', 'React', 'Next.js', 'Flutter'],
    owns: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.name,
      url: `${siteUrl}${routes.project(locale, project.slug)}`,
    })),
  }

  return (
    <SiteShell locale={locale} alternate={routes.home(otherLocale(locale))} current="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
      />
      <Hero locale={locale} />
      <Discography locale={locale} heading="h2" intro={t.projectsIntro} id={sectionId.projects[locale]} />
      <Path locale={locale} />
      <Stack locale={locale} />
      <Contact locale={locale} />
    </SiteShell>
  )
}
