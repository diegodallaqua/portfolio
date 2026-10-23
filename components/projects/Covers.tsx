import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { CodeView } from '../CodeView'
import s from './Covers.module.css'

/** Lado A: a marca do projeto, com o nome em caixa baixa e os pontos. */
export function LogoCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { mark } = project

  return (
    <div className={s.cover}>
      <div className={s.photo}>
        <Image
          src={mark.src}
          alt=""
          width={mark.width}
          height={mark.height}
          // O arquivo já sai no tamanho final; a recompressão só borraria a borda.
          unoptimized
          preload={priority}
          className={mark.bleed ? s.bleed : s.mark}
          style={mark.focus ? { objectPosition: mark.focus } : undefined}
        />
      </div>
      <div className={s.band}>
        <span className={`cover-type ${s.title}`}>{project.name}</span>
        <span className={`dots ${s.dots}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  )
}

/** Lado B: o verso da capa, com uma requisição real da API impressa. */
export function ApiCover({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <div className={s.back}>
      <p className={s.backTitle}>{project.api.title[locale]}</p>
      <CodeView bare code={project.api.code[locale]} label={`${project.name}: ${project.api.title[locale]}`} className={s.code} />
      <p className={s.backStack}>{project.backend.stack.slice(0, 5).join(' · ')}</p>
    </div>
  )
}
