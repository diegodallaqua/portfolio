'use client'

import { themeKey } from '@/lib/theme'
import { MoonIcon, SunIcon } from './Icons'
import s from './ThemeToggle.module.css'

type Props = { labels: { toLight: string; toDark: string }; className?: string }

/**
 * Alterna entre a capa clara e a capa preta. O ícone e o rótulo visíveis vêm
 * do CSS (data-theme ou prefers-color-scheme), então o HTML do servidor é o
 * mesmo nos dois temas.
 */
export function ThemeToggle({ labels, className = '' }: Props) {
  const toggle = () => {
    const root = document.documentElement
    const current =
      root.dataset.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const next = current === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    try {
      localStorage.setItem(themeKey, next)
    } catch {
      // Sem armazenamento (aba privada): o tema vale só para esta página.
    }
  }

  return (
    <button type="button" className={`${s.toggle} ${className}`} onClick={toggle}>
      <span className={s.toDark}>
        <MoonIcon />
        <span className="visually-hidden">{labels.toDark}</span>
      </span>
      <span className={s.toLight}>
        <SunIcon />
        <span className="visually-hidden">{labels.toLight}</span>
      </span>
    </button>
  )
}
