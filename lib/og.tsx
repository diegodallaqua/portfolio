import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import type { Locale } from './i18n'
import { getDictionary } from '@/content/dictionary'
import { profile } from '@/content/profile'
import { getProject } from '@/content/projects'

export const ogSize = { width: 1200, height: 630 }

const font = (file: string) => readFile(join(process.cwd(), 'node_modules/@fontsource/jost/files', file))

type Og = {
  /** Título da capa, em caixa baixa. */
  title: string
  subtitle: string
}

/** Imagem de compartilhamento: a capa branca com o disco saindo, como no site. */
export async function renderOg({ title, subtitle }: Og) {
  const [regular, bold] = await Promise.all([
    font('jost-latin-500-normal.woff'),
    font('jost-latin-700-normal.woff'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#f3f3f0',
          fontFamily: 'Jost',
          color: '#121212',
        }}
      >
        {/* Disco */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            left: 300,
            top: 72,
            width: 486,
            height: 486,
            borderRadius: 243,
            background: '#0c0c0c',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', width: 166, height: 166, borderRadius: 83, background: '#d42a1f' }} />
        </div>
        {/* Capa */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'absolute',
            left: 64,
            top: 58,
            width: 514,
            height: 514,
            padding: 40,
            background: '#ffffff',
            boxShadow: '0 20px 40px -20px rgba(18,18,18,0.45)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 500 }}>{profile.name.toLowerCase()}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 20, height: 20, borderRadius: 10, background: '#d42a1f' }} />
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
            }}
          >
            {title.toLowerCase()}
          </div>
        </div>
        {/* Ficha */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: 830,
            top: 0,
            bottom: 0,
            width: 320,
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em' }}>{profile.name}</div>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 500, color: '#464644', lineHeight: 1.25 }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Jost', data: regular, weight: 500, style: 'normal' },
        { name: 'Jost', data: bold, weight: 700, style: 'normal' },
      ],
    },
  )
}

/** Imagens compartilhadas pelas rotas dos dois idiomas. */
export const homeOgAlt = (locale: Locale) => `${profile.name}, ${profile.role[locale]}`

export function renderHomeOg(locale: Locale) {
  const { cover } = getDictionary(locale).home
  return renderOg({ title: `${cover.lead} ${cover.tail}`, subtitle: profile.role[locale] })
}

export function renderProjectOg(locale: Locale, slug: string) {
  const project = getProject(slug)!
  return renderOg({ title: project.name, subtitle: project.kind[locale] })
}
