import { homeOgAlt, ogSize, renderHomeOg } from '@/lib/og'

export const alt = homeOgAlt('en')
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderHomeOg('en')
}
