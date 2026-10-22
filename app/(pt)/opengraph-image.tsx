import { profile } from '@/content/profile'
import { getDictionary } from '@/content/dictionary'
import { ogSize, renderOg } from '@/lib/og'

export const alt = `${profile.name}, ${profile.role.pt}`
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  const h = getDictionary('pt').home
  return renderOg({ title: `${h.cover.lead} ${h.cover.tail}`, subtitle: profile.role.pt })
}
