import type { ReactNode } from 'react'
import s from './Record.module.css'

type Props = {
  /** Capa do lado A (interface). */
  front: ReactNode
  /** Capa do lado B (API). Com ela, o disco responde ao seletor de lado. */
  back?: ReactNode
  /** Disco saindo para a esquerda em vez da direita. */
  mirror?: boolean
  /** O disco desliza para fora da capa no carregamento (capa do topo da página). */
  entrance?: 'load'
  className?: string
}

/**
 * Um LP: capa quadrada e o disco saindo dela. O disco gira ao passar o mouse
 * e vira (lado A ⇄ lado B) quando o seletor da seção muda.
 */
export function Record({ front, back, mirror = false, entrance, className = '' }: Props) {
  return (
    <div
      className={`${s.record} ${className}`}
      data-mirror={mirror || undefined}
      data-entrance={entrance}
      data-sided={back ? true : undefined}
    >
      <div className={s.disc} aria-hidden="true">
        <div className={s.turn}>
          <Face letter="A" />
          {back && <Face letter="B" reverse />}
        </div>
      </div>
      <div className={s.sleeve}>
        <div className={s.pane} data-side="a">
          {front}
        </div>
        {back && (
          <div className={s.pane} data-side="b">
            {back}
          </div>
        )}
      </div>
    </div>
  )
}

/** Uma face do disco, com a letra do lado no selo vermelho. */
function Face({ letter, reverse = false }: { letter: 'A' | 'B'; reverse?: boolean }) {
  return (
    <div className={s.face} data-reverse={reverse || undefined}>
      <div className={s.spin}>
        <span className={s.seal}>
          <span className={s.sealLetter}>{letter}</span>
        </span>
      </div>
    </div>
  )
}
