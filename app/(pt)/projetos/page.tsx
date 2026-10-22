import { projectsMetadata } from '@/lib/pages'
import { ProjectsView } from '@/views/ProjectsView'

export const metadata = projectsMetadata('pt')

export default function Page() {
  return <ProjectsView locale="pt" />
}
