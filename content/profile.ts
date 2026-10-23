import type { Localized } from '@/lib/i18n'

export const profile = {
  name: 'Diego Dallaqua',
  role: {
    pt: 'Desenvolvedor Full Stack',
    en: 'Full Stack Developer',
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
    when: { pt: '2022 – 2026', en: '2022 – 2026' },
    text: {
      pt: 'Bacharelado em Ciência da Computação na UTFPR. Antes, curso técnico em Eletroeletrônica no SENAI Santo Paschoal Crepaldi (2019 – 2020).',
      en: 'BSc in Computer Science at UTFPR (Federal University of Technology – Paraná). Before that, a technical course in Electronics at SENAI Santo Paschoal Crepaldi (2019 – 2020).',
    },
  },
  {
    id: 'experiencia',
    label: { pt: 'Experiência', en: 'Experience' },
    when: { pt: 'ago 2023 – set 2024', en: 'Aug 2023 – Sep 2024' },
    text: {
      pt: 'Estágio em desenvolvimento Flutter na UTFPR Campus Santa Helena. Construí telas e fluxos do Manejo App, aplicativo multiplataforma feito com o SENAR-PR para ajudar produtores rurais no manejo de pragas e doenças, integrado a uma API REST em Node.js.',
      en: 'Flutter development intern at UTFPR Santa Helena. I built screens and flows for Manejo App, a cross-platform app made with SENAR-PR to help farmers manage pests and diseases, connected to a Node.js REST API.',
    },
  },
  {
    id: 'tcc',
    label: { pt: 'Trabalho de conclusão', en: 'Final project' },
    when: { pt: 'ago 2025 – jul 2026', en: 'Aug 2025 – Jul 2026' },
    text: {
      pt: 'Estágio em desenvolvimento full stack, entregue como TCC: o Rede Campo Online, desenvolvido com uma API REST em Node.js e TypeScript, banco de dados com MariaDB e interface em Flutter Web. Alcançou a pontuação de 4,83 na escala de usabilidade SUS e uma média de 93,5 no Lighthouse.',
      en: 'Full-stack development internship, delivered as my final project: Rede Campo Online, featuring a Node.js and TypeScript REST API, a MariaDB database and a Flutter Web developed interface. It achieved a score of 4.83 on the SUS usability scale, with a 93.5 Lighthouse average.',
    },
    projectSlug: 'rede-campo-online',
  },
  {
    id: 'certificacoes',
    label: { pt: 'Certificações', en: 'Certifications' },
    when: { pt: '2026', en: '2026' },
    text: {
      pt: 'Quality Assurance, pela GFT, e Java com IA, pelo Itaú.',
      en: 'Quality Assurance, by GFT, and Java with AI, by Itaú.',
    },
  },
  {
    id: 'hoje',
    label: { pt: 'Hoje', en: 'Now' },
    when: null,
    text: {
      pt: 'Desenvolvedor Full Stack em Presidente Prudente, SP, em busca da primeira vaga como júnior.',
      en: 'Full Stack Developer in Presidente Prudente, Brazil, looking for a first junior role.',
    },
  },
]
