import type { Viewport } from 'next'

export const themeKey = 'tema'

/**
 * Roda antes da pintura: aplica o tema salvo. Sem escolha salva, o CSS segue
 * prefers-color-scheme e o atributo fica ausente.
 */
export const themeScript = `try{var t=localStorage.getItem('${themeKey}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export const themeViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f3f0' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1c1b' },
  ],
  colorScheme: 'light dark',
}
