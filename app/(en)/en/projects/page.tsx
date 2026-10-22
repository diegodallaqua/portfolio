import { projectsMetadata } from '@/lib/pages'
import { ProjectsView } from '@/views/ProjectsView'

export const metadata = projectsMetadata('en')

export default function Page() {
  return <ProjectsView locale="en" />
}
