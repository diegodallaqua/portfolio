# Portfólio · Diego Dallaqua

Site pessoal com a trajetória, os projetos e a stack de Diego Dallaqua. Next.js (App Router), páginas 100% estáticas, em português e inglês.

## Como rodar

Requisitos: Node.js 20.9+ (verificado com o 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build de produção e servidor |
| `npm run lint` | ESLint (regras do Next.js + TypeScript) |
| `npm run typecheck` | Verificação de tipos |

## Rotas

| Português | Inglês | Conteúdo |
|---|---|---|
| `/` | `/en` | Capa do disco com as faixas, projetos (Lado A ⇄ Lado B), trajetória, stack e contato |
| `/projetos` | `/en/projects` | Projetos como discos, com o seletor Lado A (interface) ⇄ Lado B (API) |
| `/projetos/[slug]` | `/en/projects/[slug]` | Detalhe: capa, Lado A (interface), Lado B (API), capturas, notas |

Cada idioma tem o próprio layout raiz (`app/(pt)` e `app/(en)`), com o `lang` certo no `<html>`. O 404 global fica em `app/global-not-found.tsx`. Sitemap, robots, ícone e imagens Open Graph são gerados no build.

## Onde editar o conteúdo

Todo o texto fica em `content/`, nos dois idiomas:

- `content/profile.ts`: nome, cargo, frase de posicionamento, bio, contatos e a **linha do tempo**.
- `content/projects.ts`: projetos (resumo, descrição, stack, destaques, repositórios, capturas, amostra de API) e a lista de tecnologias do `stack.json` da home.
- `content/dictionary.ts`: textos da interface (menus, títulos, rótulos).

### Preencher a trajetória

Os itens "Formação" e "Experiência" da linha do tempo estão marcados como **A preencher**. Em `content/profile.ts`, troque `text: null` pelo texto nos dois idiomas e, se quiser, `when: null` pelo período:

```ts
{
  id: 'formacao',
  label: { pt: 'Formação', en: 'Education' },
  when: { pt: '2020 – 2024', en: '2020 – 2024' },
  text: {
    pt: 'Bacharelado em ..., Universidade ...',
    en: 'Bachelor of ..., University ...',
  },
},
```

O nó tracejado "A preencher" vira um nó normal assim que o texto existe.

### Enviar as capturas dos projetos

Rede Campo Online mostra molduras vazias ("Captura a enviar") até as capturas chegarem. Para cada uma:

1. Salve o arquivo em `public/projects/<slug>/` (PNG, JPG ou WebP; a Vercel converte para AVIF/WebP no tamanho certo).
   - Desktop: de preferência 1440 × 900 px. A moldura de navegador mostra o topo em 16:10.
   - Mobile: 390 × 844 px (ou uma captura de página inteira com 390 px de largura).
2. Em `content/projects.ts`, no item correspondente de `shots`, preencha `src`, `width`, `height` e `alt`:

```ts
{
  frame: 'desktop',
  caption: { pt: 'Página inicial', en: 'Home page' },
  src: '/projects/rede-campo-online/home-desktop.png',
  width: 1440,
  height: 900,
  alt: { pt: 'Página inicial do Rede Campo Online...', en: 'Rede Campo Online home page...' },
},
```

As capturas do Pontuo vieram dos testes de navegador do próprio repositório (`pontuo/.artifacts`), com dados de teste. As do Infinito Medalhas foram feitas no build local do site, com o conteúdo de demonstração.

### Amostras de API

O lado "API" de cada projeto mostra uma requisição e resposta reais, tiradas do README ou do código do repositório (`api` em cada projeto de `content/projects.ts`).

### Repositórios privados

`api-pontuo`, `pontuo` e `infinito-medalhas` não estavam públicos no GitHub quando o site foi feito, então aparecem com o rótulo "privado" e sem link. Quando abrir um deles, troque `public: false` por `public: true` no `repo` correspondente em `content/projects.ts`.

## Design

Mundo "Lado A, Lado B", das capas da gravadora Elenco: cada projeto é um LP, com a interface no Lado A e a API no Lado B. Capas brancas (pretas no tema escuro), disco de vinil saindo da capa com selo vermelho `#D42A1F`, e pontos vermelhos como único ornamento. Tipografia: Jost em caixa baixa e negrito nos títulos de capa, Jost no texto, JetBrains Mono só em código de verdade. As capturas ficam em preto e branco nas capas e ganham cor ao passar o mouse e na página do projeto. Os tokens (cores dos dois temas, tipografia e espaçamento) ficam em `app/globals.css`.

Tema claro e escuro: o botão ao lado do idioma alterna e guarda a escolha no `localStorage`; sem escolha, o site segue `prefers-color-scheme`. Um script curto no `<head>` aplica o tema antes da pintura.

O seletor Lado A ⇄ Lado B vira todos os discos da seção ao mesmo tempo e troca cada capa pela requisição real da API. Funciona só com CSS (`:has()` sobre botões de rádio), sem JavaScript no cliente.

## Deploy na Vercel

1. Importe o repositório na Vercel (framework detectado: Next.js).
2. Opcional: defina `NEXT_PUBLIC_SITE_URL` com o domínio final (ex.: `https://diegodallaqua.dev`). Sem ela, o site usa a URL de produção da Vercel nos metadados, no sitemap e nas imagens de compartilhamento.

## Lighthouse

Build de produção local (`next start`), emulação padrão do Lighthouse 12:

| Página | Mobile (Perf / A11y / BP / SEO) | Desktop |
|---|---|---|
| `/` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/projetos` | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/projetos/pontuo` | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/projetos/rede-campo-online` | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/projetos/infinito-medalhas` | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en` | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en/projects` | 98 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
