import { homeMetadata } from '@/lib/pages'
import { HomeView } from '@/views/HomeView'

export const metadata = homeMetadata('en')

export default function Page() {
  return <HomeView locale="en" />
}
