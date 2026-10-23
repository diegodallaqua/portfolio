import { ogSize, renderProjectOg } from '@/lib/og'
import { projectStaticParams } from '@/lib/pages'

export const size = ogSize
export const contentType = 'image/png'
export const generateStaticParams = projectStaticParams

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return renderProjectOg('pt', (await params).slug)
}
