import type { Localized } from '@/lib/i18n'

export const profile = {
  name: 'Diego Dallaqua',
  role: {
    pt: 'Desenvolvedor Full Stack e Cross-Platform',
    en: 'Full Stack and Cross-Platform Developer',
  } satisfies Localized,
  location: {
    pt: 'Presidente Prudente, SP',
    en: 'Presidente Prudente, Brazil',
  } satisfies Localized,
  bio: {
    pt: 'Desenvolvedor Full Stack com amplo conhecimento em desenvolvimento cross-platform com Flutter. Gosto de construir soluções limpas, escaláveis e centradas no usuário, que conectam tecnologia, design e impacto real.',
    en: 'Full Stack Developer with extensive knowledge in cross-platform development using Flutter. Interested in building clean, scalable, and user-centered solutions that connect technology, design, and real-world impact.',
  } satisfies Localized,
  philosophy: {
    pt: 'Simplicidade não é o oposto da complexidade. É o que sobra depois que você entende.',
    en: 'Simplicity is not the opposite of complexity. It’s what’s left after you understand.',
  } satisfies Localized,
  email: 'dldallaquapro@gmail.com',
  linkedin: 'https://www.linkedin.com/in/diego-dallaqua/',
  github: 'https://github.com/diegodallaqua',
}

/**
 * Linha do tempo da página inicial.
 *
 * `text: null` marca um trecho que ainda não foi escrito: a página mostra uma
 * célula vazia com o rótulo de `pending`. Para preencher, troque `null` pelo
 * texto nos dois idiomas (e `when` pelo período, se houver).
 */
export type TimelineEntry = {
  id: string
  label: Localized
  when: Localized | null
  text: Localized | null
  pending?: Localized
  projectSlug?: string
}

export const timeline: TimelineEntry[] = [
  {
    id: 'formacao',
    label: { pt: 'Formação', en: 'Education' },
    when: null,
    text: null,
    pending: {
      pt: 'Curso, instituição e período',
      en: 'Degree, institution and dates',
    },
  },
  {
    id: 'tcc',
    label: { pt: 'Trabalho de conclusão', en: 'Final project' },
    when: null,
    text: {
      pt: 'Rede Campo Online: site responsivo e API próprios para o grupo de pesquisa Rede Campo, do banco de dados ao painel administrativo.',
      en: 'Rede Campo Online: a responsive website and its own API for the Rede Campo research group, from the database to the admin panel.',
    },
    projectSlug: 'rede-campo-online',
  },
  {
    id: 'experiencia',
    label: { pt: 'Experiência', en: 'Experience' },
    when: null,
    text: null,
    pending: {
      pt: 'Cargo, empresa e período',
      en: 'Role, company and dates',
    },
  },
  {
    id: 'hoje',
    label: { pt: 'Hoje', en: 'Now' },
    when: null,
    text: {
      pt: 'Desenvolvedor Full Stack e Cross-Platform em Presidente Prudente, SP. Back end em Java e Node.js; front end em React, Next.js e Flutter.',
      en: 'Full Stack and Cross-Platform Developer in Presidente Prudente, Brazil. Back end in Java and Node.js; front end in React, Next.js and Flutter.',
    },
  },
]
