import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/content/dictionary'
import { routes, siteUrl } from '@/lib/i18n'
import { themeViewport } from '@/lib/theme'
import { RootDocument } from '@/components/RootDocument'
import { Record } from '@/components/Record'
import { Dots } from '@/components/Icons'
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
    <RootDocument locale="pt">
      <main className={`page ${s.page}`}>
        <Record
          className={s.record}
          entrance="load"
          front={
            <div className={s.cover}>
              <span className={`cover-type ${s.code}`}>404</span>
              <Dots />
            </div>
          }
        />
        <div className={s.text}>
          <h1 className={`cover-type ${s.title}`}>{pt.title}</h1>
          <p className={s.lead}>{pt.text}</p>
          <Link className="button" data-tone="solid" href={routes.home('pt')}>
            {pt.home}
          </Link>
          <div className={s.alt} lang="en">
            <p>
              {en.title} {en.text}
            </p>
            <Link href={routes.home('en')}>{en.home}</Link>
          </div>
        </div>
      </main>
    </RootDocument>
  )
}
