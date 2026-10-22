import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { Project, Shot } from '@/content/projects'
import { getDictionary } from '@/content/dictionary'
import s from './ShotFrame.module.css'

type Props = {
  shot: Shot
  project: Project
  locale: Locale
  sizes: string
  className?: string
}

/**
 * Captura impressa no encarte: a tela inteira, com borda fina e legenda.
 * Sem arquivo, a página mostra a marca do projeto e o aviso de captura a enviar.
 */
export function ShotFrame({ shot, project, locale, sizes, className = '' }: Props) {
  const t = getDictionary(locale).project
  const caption = shot.caption[locale]

  return (
    <figure className={`${s.figure} ${className}`} data-frame={shot.frame}>
      <div className={s.plate}>
        {shot.src && shot.width && shot.height ? (
          <Image
            src={shot.src}
            alt={shot.alt?.[locale] ?? caption}
            width={shot.width}
            height={shot.height}
            sizes={sizes}
            className={s.image}
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
                sizes="200px"
              />
            )}
            <p className={s.pending}>{t.pendingShot}</p>
          </div>
        )}
      </div>
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  )
}
