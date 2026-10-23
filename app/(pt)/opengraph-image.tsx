import { homeOgAlt, ogSize, renderHomeOg } from '@/lib/og'

export const alt = homeOgAlt('pt')
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderHomeOg('pt')
}
