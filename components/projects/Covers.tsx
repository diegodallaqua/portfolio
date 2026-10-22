import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { getDictionary } from '@/content/dictionary'
import { CodeView } from '../CodeView'
import s from './Covers.module.css'

type ShotProps = {
  project: Project
  locale: Locale
  /** Mostra a captura em cores desde o início (página do projeto). */
  color?: boolean
  priority?: boolean
  sizes: string
}

/** Lado A: a tela do projeto em foto de capa, com o nome em caixa baixa e os pontos. */
export function ShotCover({ project, locale, color = false, priority = false, sizes }: ShotProps) {
  const t = getDictionary(locale)
  const shot = project.shots.find((item) => item.frame === 'desktop' && item.src) ?? null

  return (
    <div className={s.cover}>
      <div className={s.photo}>
        {shot?.src ? (
          <Image
            src={shot.src}
            alt={shot.alt?.[locale] ?? shot.caption[locale]}
            fill
            sizes={sizes}
            preload={priority}
            data-mono={color ? undefined : true}
            className={s.image}
            style={{
              objectPosition: shot.cover?.focus ?? '50% 0%',
              transform: shot.cover?.zoom ? `scale(${shot.cover.zoom})` : undefined,
              transformOrigin: shot.cover?.focus,
            }}
          />
        ) : (
          <div className={s.empty}>
            {project.logo && (
              <Image
                src={project.logo.src}
                alt=""
                width={project.logo.width}
                height={project.logo.height}
                className={s.logo}
                sizes="240px"
              />
            )}
            <span className={s.pending}>{t.project.pendingShot}</span>
          </div>
        )}
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
