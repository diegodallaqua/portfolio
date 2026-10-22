import { loadProject, projectMetadata, projectStaticParams } from '@/lib/pages'
import { ProjectView } from '@/views/ProjectView'

export const dynamicParams = false
export const generateStaticParams = projectStaticParams

export async function generateMetadata({ params }: PageProps<'/en/projects/[slug]'>) {
  const { slug } = await params
  return projectMetadata('en', slug)
}

export default async function Page({ params }: PageProps<'/en/projects/[slug]'>) {
  const { slug } = await params
  return <ProjectView project={loadProject(slug)} locale="en" />
}
