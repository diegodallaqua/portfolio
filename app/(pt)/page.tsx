import { homeMetadata } from '@/lib/pages'
import { HomeView } from '@/views/HomeView'

export const metadata = homeMetadata('pt')

export default function Page() {
  return <HomeView locale="pt" />
}
