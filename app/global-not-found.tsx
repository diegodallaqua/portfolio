import type { Metadata } from 'next'
import Link from 'next/link'
import { jost } from '@/lib/fonts'
import { getDictionary } from '@/content/dictionary'
import { siteUrl } from '@/lib/i18n'
import { themeScript, themeViewport } from '@/lib/theme'
import { Record } from '@/components/Record'
import './globals.css'
import s from './not-found.module.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '404 · Diego Dallaqua',
  robots: { index: false },
}

export const viewport = themeViewport

const pt = getDictionary('pt').notFound
const en = getDictionary('en').notFound

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={jost.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className={`page ${s.page}`}>
          <Record
            className={s.record}
            entrance="load"
            front={
              <div className={s.cover}>
                <span className={`cover-type ${s.code}`}>404</span>
                <span className="dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            }
          />
          <div className={s.text}>
            <h1 className={`cover-type ${s.title}`}>{pt.title}</h1>
            <p className={s.lead}>{pt.text}</p>
            <Link className="button" data-tone="solid" href="/">
              {pt.home}
            </Link>
            <div className={s.alt} lang="en">
              <p>
                {en.title} {en.text}
              </p>
              <Link href="/en">{en.home}</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
