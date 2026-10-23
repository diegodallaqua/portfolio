'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Intervalo entre blocos que entram juntos na tela, como faixas em sequência. */
const STEP = 90

/**
 * Os blocos marcados com data-reveal sobem e aparecem quando entram na tela.
 * Só o que está abaixo da dobra é escondido, e só depois que o script roda:
 * sem JavaScript, com movimento reduzido ou na impressão, a página vem completa.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.style.setProperty('--reveal-delay', `${order++ * STEP}ms`)
          el.dataset.revealState = 'in'
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )

    for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
      // O que já está na tela, ou acima dela, fica como veio do servidor.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        delete el.dataset.revealState
        continue
      }
      el.dataset.revealState = 'wait'
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [pathname])

  return null
}
