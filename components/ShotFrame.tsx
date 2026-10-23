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

/** Proporção da dobra de cada moldura; o mesmo valor está no CSS. */
const FOLD = { desktop: 16 / 10, mobile: 390 / 844 }

/**
 * Captura impressa no encarte: a tela inteira, com borda fina e legenda.
 * Sem arquivo, a página mostra a marca do projeto e o aviso de captura a enviar.
 *
 * A captura vai sem otimização: o PNG original mantém o texto nítido, que a
 * recompressão em AVIF/WebP borrava.
 */
export function ShotFrame({ shot, project, locale, sizes, className = '' }: Props) {
  const t = getDictionary(locale).project
  const caption = shot.caption[locale]
  // Capturas altas param na dobra; as mais largas que ela aparecem inteiras.
  const wide = shot.width && shot.height && shot.width / shot.height > FOLD[shot.frame]

  return (
    <figure className={`${s.figure} ${className}`} data-frame={shot.frame}>
      <div className={s.plate} style={wide ? { aspectRatio: `${shot.width} / ${shot.height}` } : undefined}>
        {shot.src && shot.width && shot.height ? (
          <Image
            src={shot.src}
            alt={shot.alt?.[locale] ?? caption}
            width={shot.width}
            height={shot.height}
            sizes={sizes}
            unoptimized
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
