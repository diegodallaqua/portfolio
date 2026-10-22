import type { Localized } from '@/lib/i18n'

/**
 * Captura de tela de um projeto.
 *
 * Sem `src`, a página mostra uma célula vazia rotulada com `caption`. Para
 * publicar a captura, coloque o arquivo em `public/projects/<slug>/` e
 * preencha `src`, `width`, `height` e `alt`.
 */
export type Shot = {
  frame: 'desktop' | 'mobile'
  caption: Localized
  src?: string
  width?: number
  height?: number
  alt?: Localized
  /**
   * Recorte na capa do disco: ponto de foco (object-position) e aproximação.
   * Padrão: topo centralizado, sem aproximação.
   */
  cover?: { focus: string; zoom?: number }
}

export type Side = {
  /** Título do lado: "API", "Front end", "Conteúdo e servidor"... */
  title: Localized
  /**
   * Repositório no GitHub. `public: false` mostra o nome sem link (repositório
   * privado); troque para `true` quando ele for aberto.
   */
  repo: { name: string; url: string; public: boolean }
  stack: string[]
  highlights: Localized<string[]>
}

/**
 * Amostra real de API mostrada no painel "API": requisição e resposta
 * copiadas dos READMEs ou do código de cada repositório.
 */
export type ApiSample = {
  title: Localized
  code: Localized
}

export type Project = {
  slug: string
  name: string
  api: ApiSample
  kind: Localized
  summary: Localized
  description: Localized<string[]>
  backend: Side
  frontend: Side
  shots: Shot[]
  /** Observação honesta sobre o estado do projeto (dados de teste, licença...). */
  notes: Localized<string[]>
  logo?: { src: string; width: number; height: number }
}

const gh = (repo: string) => `https://github.com/diegodallaqua/${repo}`

export const projects: Project[] = [
  {
    slug: 'pontuo',
    name: 'Pontuo',
    api: {
      title: { pt: 'Desempenho por matéria', en: 'Performance by subject' },
      code: {
        pt: `GET /api/performance/me/subjects
Authorization: Bearer <token>

200 OK
[
  { "id": 5, "description": "Biologia", "questions": 12,
    "answered": 11, "correct": 8, "accuracy": 66.67 },
  { "id": 7, "description": "Química", "questions": 8,
    "answered": 8, "correct": 3, "accuracy": 37.50 }
]`,
        en: `GET /api/performance/me/subjects
Authorization: Bearer <token>

200 OK
[
  { "id": 5, "description": "Biologia", "questions": 12,
    "answered": 11, "correct": 8, "accuracy": 66.67 },
  { "id": 7, "description": "Química", "questions": 8,
    "answered": 8, "correct": 3, "accuracy": 37.50 }
]`,
      },
    },
    kind: {
      pt: 'Plataforma de simulados para vestibular',
      en: 'Mock-exam platform for university entrance exams',
    },
    summary: {
      pt: 'O estudante monta um simulado por área, matéria e vestibular, responde contra o relógio e acompanha a evolução do desempenho.',
      en: 'Students build a mock exam by area, subject and entrance exam, answer against the clock and follow how their performance evolves.',
    },
    description: {
      pt: [
        'O Pontuo prepara estudantes para vestibulares como ENEM, FUVEST e VUNESP. O catálogo organiza instituições, vestibulares, áreas do conhecimento, matérias, tópicos e questões de múltipla escolha.',
        'O simulado é montado, corrigido e travado no servidor. O gabarito nunca chega ao estudante antes da resposta, e o desempenho é calculado por área, matéria, tópico e dificuldade.',
      ],
      en: [
        'Pontuo prepares students for Brazilian entrance exams such as ENEM, FUVEST and VUNESP. The catalog organizes institutions, exams, knowledge areas, subjects, topics and multiple-choice questions.',
        'Each mock exam is drawn, graded and locked on the server. The answer key never reaches the student before they answer, and performance is computed by area, subject, topic and difficulty.',
      ],
    },
    backend: {
      title: { pt: 'API REST', en: 'REST API' },
      repo: { name: 'api-pontuo', url: gh('api-pontuo'), public: false },
      stack: ['Java 17', 'Spring Boot 4', 'Spring Security', 'Spring Data JPA', 'MariaDB', 'Flyway', 'JUnit', 'Mockito', 'GitHub Actions'],
      highlights: {
        pt: [
          'Simulado montado no servidor: GET /api/questions/draw sorteia questões com filtros combinados.',
          'Correção feita e congelada no servidor no momento da resposta; o gabarito não vai para o estudante.',
          'JWT (HS256) com perfis Estudante e Administrador, senhas em BCrypt e logout por revogação do token.',
          'Desempenho por área, matéria, tópico e dificuldade, tópicos mais fracos e evolução simulado a simulado.',
          'Banco versionado em 9 migrations Flyway, com os 27 estados e as 5.571 cidades do Brasil já cadastrados.',
          'Testes unitários, web, de repositório e de integração; CI no GitHub Actions com MariaDB.',
        ],
        en: [
          'Server-side exam assembly: GET /api/questions/draw draws questions with combinable filters.',
          'Grading happens on the server and is frozen at answer time; the answer key never reaches the student.',
          'JWT (HS256) with Student and Administrator roles, BCrypt passwords and logout by token revocation.',
          'Performance by area, subject, topic and difficulty, weakest topics, and exam-by-exam progress.',
          'Database versioned in 9 Flyway migrations, seeded with Brazil’s 27 states and 5,571 cities.',
          'Unit, web, repository and integration tests; CI on GitHub Actions against MariaDB.',
        ],
      },
    },
    frontend: {
      title: { pt: 'Aplicação web', en: 'Web app' },
      repo: { name: 'pontuo', url: gh('pontuo'), public: false },
      stack: ['React 19', 'TypeScript', 'Vite', 'React Router', 'Vitest', 'Playwright'],
      highlights: {
        pt: [
          'Montagem por área, disciplina, assunto, vestibular e dificuldade, mostrando quantas questões estão disponíveis.',
          'Execução com cronômetro, salvamento confirmado, retomada e finalização automática.',
          'Análise de desempenho com gráfico e tabela alternativa para leitores de tela.',
          'Código organizado por funcionalidade, com regras de domínio separadas de React e de HTTP.',
          'Testes unitários com Vitest e fluxos de navegador com Playwright sobre uma API simulada por contrato.',
          'Layout responsivo, teclado, foco visível, estados de carregamento, erro e vazio, e movimento reduzido.',
        ],
        en: [
          'Exam builder by area, subject, topic, entrance exam and difficulty, showing how many questions are available.',
          'Timed sessions with confirmed saving, resume and automatic submission.',
          'Performance analysis with a chart and an alternative table for screen readers.',
          'Feature-based code, with domain rules kept apart from React and HTTP.',
          'Unit tests with Vitest and browser flows with Playwright against a contract-mocked API.',
          'Responsive layout, keyboard support, visible focus, loading, error and empty states, and reduced motion.',
        ],
      },
    },
    shots: [
      {
        frame: 'desktop',
        caption: { pt: 'Visão geral do estudante', en: 'Student overview' },
        src: '/projects/pontuo/dashboard-desktop.png',
        width: 1440,
        height: 1729,
        // Aproxima no cartão escuro "O seu futuro se constrói".
        cover: { focus: '49% 21%', zoom: 1.6 },
        alt: {
          pt: 'Painel do Pontuo com simulados concluídos, aproveitamento geral, gráfico de evolução e simulados recentes.',
          en: 'Pontuo dashboard with completed exams, overall accuracy, a progress chart and recent exams.',
        },
      },
      {
        frame: 'mobile',
        caption: { pt: 'Visão geral no celular', en: 'Overview on mobile' },
        src: '/projects/pontuo/dashboard-mobile.png',
        width: 390,
        height: 2236,
        alt: {
          pt: 'Painel do Pontuo em tela de celular.',
          en: 'Pontuo dashboard on a phone screen.',
        },
      },
      {
        frame: 'desktop',
        caption: { pt: 'Resultado do simulado', en: 'Mock exam result' },
        src: '/projects/pontuo/result-desktop.png',
        width: 1440,
        height: 1044,
        alt: {
          pt: 'Resultado de um simulado com aproveitamento, acertos, erros e conferência das respostas.',
          en: 'Mock exam result with accuracy, right and wrong answers, and an answer review.',
        },
      },
      {
        frame: 'mobile',
        caption: { pt: 'Entrada no celular', en: 'Sign-in on mobile' },
        src: '/projects/pontuo/login-mobile.png',
        width: 390,
        height: 844,
        alt: {
          pt: 'Tela de login do Pontuo em celular.',
          en: 'Pontuo sign-in screen on a phone.',
        },
      },
    ],
    notes: {
      pt: ['Capturas geradas pelos testes de navegador, com dados de teste.', 'API sob licença MIT.'],
      en: ['Captures produced by the browser tests, with test data.', 'API released under the MIT license.'],
    },
  },
  {
    slug: 'rede-campo-online',
    name: 'Rede Campo Online',
    api: {
      title: { pt: 'Recursos da API', en: 'API resources' },
      code: {
        pt: `GET /health
200 OK
{ "ok": true }

GET  /news            // leitura pública
POST /news            // Authorization: Bearer <token>
GET  /publications    // artigos, teses, livros, capítulos
POST /images          // upload para o Cloudflare R2, variantes WebP`,
        en: `GET /health
200 OK
{ "ok": true }

GET  /news            // public read
POST /news            // Authorization: Bearer <token>
GET  /publications    // articles, theses, books, chapters
POST /images          // upload to Cloudflare R2, WebP variants`,
      },
    },
    kind: {
      pt: 'Site e painel do grupo de pesquisa Rede Campo',
      en: 'Website and admin panel for the Rede Campo research group',
    },
    summary: {
      pt: 'Plataforma pública de notícias, projetos, eventos, publicações e membros, com painel administrativo para o grupo manter todo o conteúdo.',
      en: 'A public platform for news, projects, events, publications and members, with an admin panel where the group maintains all content.',
    },
    description: {
      pt: [
        'Desenvolvido como Trabalho de Conclusão de Curso para o grupo de pesquisa Rede Campo. A área pública reúne notícias, projetos, eventos, membros e publicações acadêmicas: artigos, teses, livros e capítulos.',
        'O painel administrativo, protegido por login, gerencia todo esse conteúdo. Front end e API foram escritos do zero e conversam por uma API REST própria.',
      ],
      en: [
        'Built as an undergraduate final project for the Rede Campo research group. The public area brings together news, projects, events, members and academic publications: articles, theses, books and chapters.',
        'A login-protected admin panel manages all of that content. Front end and API were written from scratch and talk over their own REST API.',
      ],
    },
    backend: {
      title: { pt: 'API REST', en: 'REST API' },
      repo: { name: 'API-rede-campo-online', url: gh('API-rede-campo-online'), public: true },
      stack: ['Node.js', 'TypeScript', 'Express', 'TypeORM', 'MariaDB', 'TSyringe', 'Celebrate', 'Sharp', 'Cloudflare R2'],
      highlights: {
        pt: [
          '25 recursos REST organizados por domínio: membros, projetos, eventos, notícias e publicações.',
          'Arquitetura modular com DDD e Clean Architecture, injeção de dependência com TSyringe e TypeScript strict.',
          'JWT com blacklist no logout e validação declarada nas rotas com Celebrate e Joi.',
          'Imagens no Cloudflare R2, com variantes WebP geradas pelo Sharp.',
          'Helmet, CORS e rate limit na camada HTTP; schema versionado por migrations.',
        ],
        en: [
          '25 REST resources organized by domain: members, projects, events, news and publications.',
          'Modular architecture with DDD and Clean Architecture, dependency injection with TSyringe and strict TypeScript.',
          'JWT with a logout blacklist and route-level validation with Celebrate and Joi.',
          'Images stored on Cloudflare R2, with WebP variants generated by Sharp.',
          'Helmet, CORS and rate limiting at the HTTP layer; schema versioned through migrations.',
        ],
      },
    },
    frontend: {
      title: { pt: 'Site e painel em Flutter Web', en: 'Flutter Web site and panel' },
      repo: { name: 'rede_campo_online', url: gh('rede_campo_online'), public: true },
      stack: ['Flutter Web', 'Dart', 'MobX', 'GetIt', 'go_router'],
      highlights: {
        pt: [
          'Área pública com home, sobre, notícias, projetos, eventos, publicações e membros.',
          'Painel em /admin protegido por login JWT, com guarda de rota.',
          'Arquitetura feature-first com stores MobX e listagens paginadas genéricas reaproveitadas no painel.',
          'Versão desktop e versão mobile de cada tela, com breakpoints responsivos.',
          'Upload de mídia com recorte de imagem e cache das imagens de rede.',
        ],
        en: [
          'Public area with home, about, news, projects, events, publications and members.',
          'Admin panel at /admin behind JWT login, with a route guard.',
          'Feature-first architecture with MobX stores and generic paginated lists reused across the panel.',
          'A desktop and a mobile version of every screen, with responsive breakpoints.',
          'Media upload with image cropping and cached network images.',
        ],
      },
    },
    shots: [
      { frame: 'desktop', caption: { pt: 'Página inicial', en: 'Home page' } },
      { frame: 'mobile', caption: { pt: 'Página inicial no celular', en: 'Home page on mobile' } },
      { frame: 'desktop', caption: { pt: 'Painel administrativo', en: 'Admin panel' } },
    ],
    notes: {
      pt: ['Repositórios públicos apenas para portfólio; não é software open source.'],
      en: ['Repositories are public for portfolio purposes only; this is not open-source software.'],
    },
    logo: { src: '/projects/rede-campo-online/logo-white.png', width: 707, height: 353 },
  },
  {
    slug: 'infinito-medalhas',
    name: 'Infinito Medalhas',
    api: {
      title: { pt: 'Webhook de revalidação', en: 'Revalidation webhook' },
      code: {
        pt: `POST /api/revalidate
sanity-webhook-signature: t=…,v1=…   // HMAC, janela de 5 min

{ "_type": "medal", "slug": "circuito-kids-primavera-2025" }

200 OK
{ "ok": true,
  "revalidated": ["medal", "medal:circuito-kids-primavera-2025"],
  "type": "medal", "slug": "circuito-kids-primavera-2025", "now": "…" }`,
        en: `POST /api/revalidate
sanity-webhook-signature: t=…,v1=…   // HMAC, 5-minute window

{ "_type": "medal", "slug": "circuito-kids-primavera-2025" }

200 OK
{ "ok": true,
  "revalidated": ["medal", "medal:circuito-kids-primavera-2025"],
  "type": "medal", "slug": "circuito-kids-primavera-2025", "now": "…" }`,
      },
    },
    kind: {
      pt: 'Site institucional com visualizador 3D',
      en: 'Brand website with a 3D viewer',
    },
    summary: {
      pt: 'Vitrine das medalhas produzidas pela marca, com visualizador 3D, catálogo filtrável, história, parceiros e contatos.',
      en: 'A showcase of the brand’s medals with a 3D viewer, a filterable catalog, its story, partners and contacts.',
    },
    description: {
      pt: [
        'Site institucional da Infinito Medalhas em arquitetura Jamstack: Next.js com App Router, conteúdo no Sanity e publicação na Vercel.',
        'Cada medalha tem página própria com ficha técnica e um visualizador 3D que gira, aproxima e responde ao teclado. Sem WebGL2, a página mostra a galeria de fotos.',
      ],
      en: [
        'Brand website for Infinito Medalhas on a Jamstack architecture: Next.js App Router, content in Sanity, deployed on Vercel.',
        'Every medal has its own page with a spec sheet and a 3D viewer that rotates, zooms and responds to the keyboard. Without WebGL2, the page falls back to a photo gallery.',
      ],
    },
    backend: {
      title: { pt: 'Conteúdo e servidor', en: 'Content and server' },
      repo: { name: 'infinito-medalhas', url: gh('infinito-medalhas'), public: false },
      stack: ['Next.js 16', 'Sanity', 'SSG + ISR', 'Vercel', 'GitHub Actions', 'Lighthouse CI'],
      highlights: {
        pt: [
          'Modelo de conteúdo no Sanity Studio: medalhas, eventos, parceiros, perguntas frequentes e institucional.',
          'Webhook de revalidação com assinatura HMAC e janela de 5 minutos contra replay; o cache é invalidado por tags.',
          'CSP, HSTS e demais cabeçalhos de segurança; token de leitura do CMS só no servidor.',
          'Páginas estáticas com revalidação, sitemap, Open Graph e dados estruturados schema.org.',
          'CI com npm audit, lint, type-check, build e Lighthouse CI em três tamanhos de tela.',
        ],
        en: [
          'Content model in Sanity Studio: medals, events, partners, FAQs and brand pages.',
          'Revalidation webhook with an HMAC signature and a 5-minute replay window; cache invalidated by tags.',
          'CSP, HSTS and other security headers; the CMS read token stays on the server.',
          'Static pages with revalidation, sitemap, Open Graph and schema.org structured data.',
          'CI running npm audit, lint, type-check, build and Lighthouse CI at three screen sizes.',
        ],
      },
    },
    frontend: {
      title: { pt: 'Interface', en: 'Interface' },
      repo: { name: 'infinito-medalhas', url: gh('infinito-medalhas'), public: false },
      stack: ['React 19', 'TypeScript', 'React Three Fiber', 'drei', 'Tailwind CSS', 'Framer Motion'],
      highlights: {
        pt: [
          'Visualizador 3D com arrastar, pinça, botões de zoom e atalhos de teclado.',
          'Porta-medalhas interativo: a peça balança na fita ao passar o mouse ou focar pelo teclado.',
          'Catálogo paginado com filtros por evento e acabamento que funcionam sem JavaScript.',
          'Acessibilidade 100 no Lighthouse em todas as páginas, no celular e no desktop.',
          'O 3D é carregado num pacote separado, só na página de detalhe e depois que o navegador fica ocioso.',
        ],
        en: [
          '3D viewer with drag, pinch, zoom buttons and keyboard shortcuts.',
          'Interactive medal rack: each piece swings on its ribbon on hover or keyboard focus.',
          'Paginated catalog with event and finish filters that work without JavaScript.',
          'Lighthouse accessibility score of 100 on every page, on mobile and desktop.',
          '3D code ships in a separate bundle, loaded only on the detail page once the browser is idle.',
        ],
      },
    },
    shots: [
      {
        frame: 'desktop',
        caption: { pt: 'Abertura com a medalha em destaque', en: 'Opening with the featured medal' },
        src: '/projects/infinito-medalhas/home-desktop.png',
        width: 1440,
        height: 900,
        cover: { focus: '0% 0%' },
        alt: {
          pt: 'Página inicial da Infinito Medalhas com o título "Medalhas que ninguém deixa na gaveta" e uma medalha dourada de maratona.',
          en: 'Infinito Medalhas home page with a gold marathon medal beside the headline.',
        },
      },
      {
        frame: 'mobile',
        caption: { pt: 'Abertura no celular', en: 'Opening on mobile' },
        src: '/projects/infinito-medalhas/home-mobile.png',
        width: 780,
        height: 1688,
        alt: {
          pt: 'Página inicial da Infinito Medalhas em tela de celular.',
          en: 'Infinito Medalhas home page on a phone screen.',
        },
      },
      {
        frame: 'desktop',
        caption: { pt: 'Visualizador 3D da medalha', en: 'Medal 3D viewer' },
        src: '/projects/infinito-medalhas/viewer-desktop.png',
        width: 1440,
        height: 900,
        alt: {
          pt: 'Página de detalhe com o visualizador 3D de uma medalha prateada e a ficha da peça.',
          en: 'Detail page with the 3D viewer of a silver medal and its spec sheet.',
        },
      },
    ],
    notes: {
      pt: [
        'O site roda com conteúdo de demonstração até a marca cadastrar os dados reais; as capturas mostram esse conteúdo.',
        'Notas do Lighthouse medidas em build de produção local.',
      ],
      en: [
        'The site runs on demonstration content until the brand enters its real data; the captures show that content.',
        'Lighthouse scores measured on a local production build.',
      ],
    },
    logo: { src: '/projects/infinito-medalhas/icon.svg', width: 64, height: 64 },
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)

/**
 * Matriz de tecnologias da página inicial: em quais projetos cada uma aparece.
 */
export type StackGroup = { id: string; title: Localized; rows: { name: string; projects: string[] }[] }

export const stackMatrix: StackGroup[] = [
  {
    id: 'back',
    title: { pt: 'Back end', en: 'Back end' },
    rows: [
      { name: 'Java', projects: ['pontuo'] },
      { name: 'Spring Boot', projects: ['pontuo'] },
      { name: 'Node.js', projects: ['rede-campo-online'] },
      { name: 'Express', projects: ['rede-campo-online'] },
      { name: 'TypeORM', projects: ['rede-campo-online'] },
      { name: 'MariaDB / MySQL', projects: ['pontuo', 'rede-campo-online'] },
      { name: 'Flyway', projects: ['pontuo'] },
      { name: 'Sanity CMS', projects: ['infinito-medalhas'] },
    ],
  },
  {
    id: 'front',
    title: { pt: 'Front end', en: 'Front end' },
    rows: [
      { name: 'TypeScript', projects: ['pontuo', 'rede-campo-online', 'infinito-medalhas'] },
      { name: 'React', projects: ['pontuo', 'infinito-medalhas'] },
      { name: 'Next.js', projects: ['infinito-medalhas'] },
      { name: 'Vite', projects: ['pontuo'] },
      { name: 'Flutter', projects: ['rede-campo-online'] },
      { name: 'Dart', projects: ['rede-campo-online'] },
      { name: 'MobX', projects: ['rede-campo-online'] },
      { name: 'Three.js / R3F', projects: ['infinito-medalhas'] },
    ],
  },
  {
    id: 'quality',
    title: { pt: 'Qualidade e infra', en: 'Quality and infra' },
    rows: [
      { name: 'JWT', projects: ['pontuo', 'rede-campo-online'] },
      { name: 'JUnit / Mockito', projects: ['pontuo'] },
      { name: 'Vitest', projects: ['pontuo'] },
      { name: 'Playwright', projects: ['pontuo'] },
      { name: 'GitHub Actions', projects: ['pontuo', 'infinito-medalhas'] },
      { name: 'Lighthouse CI', projects: ['infinito-medalhas'] },
      { name: 'Cloudflare R2', projects: ['rede-campo-online'] },
      { name: 'Vercel', projects: ['infinito-medalhas'] },
    ],
  },
]
