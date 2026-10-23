import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/content/dictionary'
import { projects, stackMatrix } from '@/content/projects'
import s from './Stack.module.css'

/** Créditos do disco: cada tecnologia e um ponto vermelho em cada projeto onde aparece. */
export function Stack({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home

  return (
    <section id="stack" className={`page ${s.section}`} aria-labelledby="stack-titulo">
      <div className={s.head} data-reveal>
        <h2 id="stack-titulo" className={`cover-type ${s.title}`}>
          {t.stackTitle}
        </h2>
        <p className={s.intro}>{t.stackIntro}</p>
      </div>

      <div className={s.groups}>
        {stackMatrix.map((group) => (
          <table key={group.id} className={s.table} data-reveal>
            <caption className={s.caption}>{group.title[locale]}</caption>
            <thead>
              <tr>
                <th scope="col" className={s.techHead}>
                  <span className="visually-hidden">{t.stackTech}</span>
                </th>
                {projects.map((project) => (
                  <th key={project.slug} scope="col" className={s.projectHead}>
                    {project.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row" className={s.tech}>
                    {row.name}
                  </th>
                  {projects.map((project) => (
                    <td key={project.slug} className={s.cell}>
                      {row.projects.includes(project.slug) && (
                        <>
                          <i className={s.dot} aria-hidden="true" />
                          <span className="visually-hidden">{t.used}</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </section>
  )
}
