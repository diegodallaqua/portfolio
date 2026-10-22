import type { ReactNode } from 'react'
import { htmlLang, type Locale } from '@/lib/i18n'
import { jetbrains, jost } from '@/lib/fonts'
import { themeScript } from '@/lib/theme'

/** Documento HTML de cada idioma: cada grupo de rotas tem seu próprio layout raiz. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // O script de tema define data-theme antes da hidratação.
    <html lang={htmlLang[locale]} className={`${jost.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- layout raiz do App Router */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
