import type { Locale } from '@/lib/i18n'

const pt = {
  skip: 'Pular para o conteúdo',
  nav: { label: 'Principal', projects: 'Projetos', path: 'Trajetória', contact: 'Contato' },
  language: { switchTo: 'Read in English', short: { pt: 'PT', en: 'EN' } },
  theme: { toLight: 'Usar tema claro', toDark: 'Usar tema escuro' },
  sides: {
    a: 'Lado A',
    b: 'Lado B',
    ui: 'Interface',
    api: 'API',
    switchLabel: 'Lado do disco',
  },
  home: {
    title: 'Diego Dallaqua · Desenvolvedor Full Stack',
    description:
      'Portfólio de Diego Dallaqua: projetos full stack com Java, Spring Boot, Node.js, React, Next.js e Flutter, da API à interface.',
    cover: { lead: 'Ponta', tail: 'a ponta.' },
    records: 'Discos',
    ctaProjects: 'Ver projetos',
    ctaContact: 'Falar comigo',
    projectsTitle: 'três discos, dois lados cada.',
    projectsIntro:
      'No Lado A, a interface. No Lado B, a API. Vire todos os discos de uma vez para ver as marcas ou os endpoints.',
    pathTitle: 'trajetória',
    pathIntro: 'Do trabalho de conclusão aos produtos de hoje.',
    pending: 'a preencher',
    now: 'agora',
    seeProject: 'Ver projeto',
    open: 'Abrir projeto',
    stackTitle: 'stack',
    stackIntro: 'Cada tecnologia e os projetos em que ela aparece.',
    stackTech: 'Tecnologia',
    used: 'usada',
    contactTitle: 'vamos conversar.',
    contactText: 'Escreva para falar de uma vaga, um projeto ou uma ideia.',
    emailLabel: 'E-mail',
  },
  projects: {
    metaTitle: 'Projetos · Diego Dallaqua',
    description:
      'Pontuo, Rede Campo Online e Infinito Medalhas: três produtos completos, do back end à interface.',
    intro:
      'Em cada um, escrevi do servidor à interface. Vire os discos para ver a marca no Lado A ou os endpoints no Lado B.',
  },
  project: {
    stack: 'Stack',
    repo: 'Repositório',
    repos: 'Repositórios',
    private: 'privado',
    shots: 'capturas',
    pendingShot: 'Captura a enviar',
    notes: 'Notas',
    next: 'Próximo projeto',
    sample: 'Exemplo',
  },
  footer: { built: 'Feito com Next.js.', rights: 'Diego Dallaqua' },
  notFound: { title: 'página não encontrada.', text: 'Esse endereço não existe.', home: 'Voltar ao início' },
}

export type Dictionary = typeof pt

const en: Dictionary = {
  skip: 'Skip to content',
  nav: { label: 'Main', projects: 'Projects', path: 'Path', contact: 'Contact' },
  language: { switchTo: 'Ler em português', short: { pt: 'PT', en: 'EN' } },
  theme: { toLight: 'Use light theme', toDark: 'Use dark theme' },
  sides: {
    a: 'Side A',
    b: 'Side B',
    ui: 'Interface',
    api: 'API',
    switchLabel: 'Record side',
  },
  home: {
    title: 'Diego Dallaqua · Full Stack Developer',
    description:
      'Portfolio of Diego Dallaqua: full-stack projects with Java, Spring Boot, Node.js, React, Next.js and Flutter, from the API to the interface.',
    cover: { lead: 'End', tail: 'to End.' },
    records: 'Records',
    ctaProjects: 'See projects',
    ctaContact: 'Get in touch',
    projectsTitle: 'three records, two sides each.',
    projectsIntro:
      'Side A is the interface. Side B is the API. Turn every record over at once to see the marks or the endpoints.',
    pathTitle: 'path',
    pathIntro: 'From the final project to the products of today.',
    pending: 'to be filled',
    now: 'now',
    seeProject: 'See project',
    open: 'Open project',
    stackTitle: 'stack',
    stackIntro: 'Every technology and the projects it appears in.',
    stackTech: 'Technology',
    used: 'used',
    contactTitle: 'let’s talk.',
    contactText: 'Write to talk about a role, a project or an idea.',
    emailLabel: 'Email',
  },
  projects: {
    metaTitle: 'Projects · Diego Dallaqua',
    description:
      'Pontuo, Rede Campo Online and Infinito Medalhas: three complete products, from back end to interface.',
    intro:
      'In each one, I wrote everything from the server to the interface. Turn the records over to see the mark on Side A or the endpoints on Side B.',
  },
  project: {
    stack: 'Stack',
    repo: 'Repository',
    repos: 'Repositories',
    private: 'private',
    shots: 'screens',
    pendingShot: 'Capture coming',
    notes: 'Notes',
    next: 'Next project',
    sample: 'Sample',
  },
  footer: { built: 'Built with Next.js.', rights: 'Diego Dallaqua' },
  notFound: { title: 'page not found.', text: 'This address does not exist.', home: 'Back to home' },
}

const dictionaries: Record<Locale, Dictionary> = { pt, en }

export const getDictionary = (locale: Locale) => dictionaries[locale]
