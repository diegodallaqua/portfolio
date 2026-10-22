import { getProject, projects } from '@/content/projects'
import { ogSize, renderOg } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const generateStaticParams = () => projects.map((project) => ({ slug: project.slug }))

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!
  return renderOg({ title: project.name, subtitle: project.kind.en })
}
