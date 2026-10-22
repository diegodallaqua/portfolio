import { loadProject, projectMetadata, projectStaticParams } from '@/lib/pages'
import { ProjectView } from '@/views/ProjectView'

export const dynamicParams = false
export const generateStaticParams = projectStaticParams

export async function generateMetadata({ params }: PageProps<'/projetos/[slug]'>) {
  const { slug } = await params
  return projectMetadata('pt', slug)
}

export default async function Page({ params }: PageProps<'/projetos/[slug]'>) {
  const { slug } = await params
  return <ProjectView project={loadProject(slug)} locale="pt" />
}
