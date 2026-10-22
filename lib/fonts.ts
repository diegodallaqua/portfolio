import { JetBrains_Mono, Jost } from 'next/font/google'

/** Geométrica das capas: títulos em caixa baixa e todo o texto. */
export const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})

/** Só para código de verdade (endpoints, JSON). */
export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
  preload: false,
})
