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

Cada idioma tem o próprio layout raiz (`app/(pt)` e `app/(en)`), com o `lang` certo no `<html>`. O 404 global fica em `app/global-not-found.tsx`. Sitemap, robots, ícone e imagens Open Graph são gerados no build. Endereços antigos ou trocados de idioma (`/pt`, `/projects`, `/en/projetos`...) redirecionam para a rota certa (`next.config.ts`).

## Estrutura do código

- `app/`: rotas. Cada arquivo de página só escolhe o idioma e chama a vista correspondente.
- `views/`: as três páginas (início, projetos, projeto), iguais nos dois idiomas.
- `components/`: o disco (`Record`), as capas, as seções da home e as peças de página de projeto.
- `content/`: todo o texto e os dados do site (veja abaixo).
- `lib/`: rotas e âncoras de cada idioma (`i18n.ts`), metadados (`metadata.ts`, `pages.ts`), imagens Open Graph (`og.tsx`), tema (`theme.ts`) e fontes (`fonts.ts`).

## Onde editar o conteúdo

Todo o texto fica em `content/`, nos dois idiomas:

- `content/profile.ts`: nome, cargo, cidade, bio, frase da trajetória, contatos e a **linha do tempo**.
- `content/projects.ts`: projetos (resumo, descrição, stack, destaques, repositórios, marca da capa, capturas, amostra de API, notas) e a matriz de tecnologias da seção stack da home (`stackMatrix`).
- `content/dictionary.ts`: textos da interface (menus, títulos, rótulos).

### Linha do tempo

Cada etapa da trajetória é um item de `timeline` em `content/profile.ts`. A última etapa da lista recebe o selo "agora", e `projectSlug` acrescenta o link "Ver projeto".

Para marcar uma etapa que ainda não foi escrita, use `text: null`: ela aparece com a etiqueta tracejada "a preencher" e o texto opcional de `pending`. Para preencher, troque `null` pelo texto nos dois idiomas e, se quiser, `when: null` pelo período:

```ts
{
  id: 'formacao',
  label: { pt: 'Formação', en: 'Education' },
  when: { pt: '2022 – 2026', en: '2022 – 2026' },
  text: {
    pt: 'Bacharelado em ..., Universidade ...',
    en: 'Bachelor of ..., University ...',
  },
},
```

### Marca da capa

A capa de cada disco mostra a marca do projeto (`mark` em `content/projects.ts`) sobre o preto do vinil. `bleed: true` é para uma arte com fundo próprio, que ocupa a área inteira da capa; `focus` ajusta o recorte (`object-position`). O arquivo vai sem otimização, então exporte já no tamanho final.

### Capturas dos projetos

As capturas ficam no encarte da página de cada projeto, em cor. A primeira captura desktop ilustra o Lado A e não se repete no encarte. Uma captura sem `src` aparece como moldura vazia, com a logo do projeto (`logo`) e o aviso "Captura a enviar". Para publicar uma:

1. Salve o arquivo em `public/projects/<slug>/` (PNG, JPG ou WebP). A captura é servida sem otimização, no arquivo original, para manter o texto nítido.
   - Desktop: de preferência 1440 × 900 px. A moldura mostra o topo em 16:10; capturas mais largas que isso aparecem inteiras.
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

O Lado B de cada projeto mostra uma requisição e resposta reais, tiradas do README ou do código do repositório (`api` em cada projeto de `content/projects.ts`). A mesma amostra aparece no verso da capa quando o seletor está no Lado B.

### Repositórios privados

`api-pontuo`, `pontuo` e `infinito-medalhas` não estavam públicos no GitHub quando o site foi feito, então aparecem com o rótulo "privado" e sem link. Quando abrir um deles, troque `public: false` por `public: true` no `repo` correspondente em `content/projects.ts`.

## Design

Mundo "Lado A, Lado B", das capas da gravadora Elenco: cada projeto é um LP, com a interface no Lado A e a API no Lado B. Capas brancas (pretas no tema escuro), disco de vinil saindo da capa com selo vermelho `#D42A1F`, e pontos vermelhos como único ornamento. Tipografia: Jost em caixa baixa e negrito nos títulos de capa, Jost no texto, JetBrains Mono só em código de verdade. A capa de cada projeto traz a marca dele em preto e branco; as capturas, em cor, ficam só no encarte da página do projeto. Os tokens (cores dos dois temas, tipografia e espaçamento) ficam em `app/globals.css`.

A capa inicial usa a arte original **Curto-circuito**, inspirada em capas de rock: uma ilustração gráfica de dois cabos ligados por um raio, com formas planas e textura de serigrafia em preto, azul, vermelho e branco. A imagem fica em `public/images/curto-circuito.webp`; o nome e “Ponta a ponta.” / “End to End.” são textos HTML brancos sobre a arte nos dois temas. O [prompt de edição](docs/curto-circuito.md) está documentado para futuras variações.

Tema claro e escuro: o botão ao lado do idioma alterna e guarda a escolha no `localStorage`; sem escolha, o site segue `prefers-color-scheme`. Um script curto no `<head>` aplica o tema antes da pintura.

O seletor Lado A ⇄ Lado B vira todos os discos da seção ao mesmo tempo e troca cada capa pela requisição real da API. Funciona só com CSS (`:has()` sobre botões de rádio), sem JavaScript no cliente.

### Movimento

- No carregamento, o disco do topo da página desliza para fora da capa. Ao passar o mouse, o disco gira. Ao trocar de lado, a capa e o disco trocam de posição: o disco passa por trás da capa e sai pelo lado oposto, já virado no selo B (no Lado A ele sai pela direita; no Lado B, pela esquerda; nas linhas espelhadas, o inverso).
- Ao rolar, os blocos abaixo da dobra sobem e aparecem quando entram na tela, e os discos da discografia saem da capa junto com a linha. Para animar um novo bloco, marque o elemento com o atributo `data-reveal`; o script fica em `components/ScrollReveal.tsx`.
- Sem JavaScript, na impressão ou com `prefers-reduced-motion: reduce`, nada fica escondido e nenhuma animação roda: a página aparece completa.

## Deploy na Vercel

1. Importe o repositório na Vercel (framework detectado: Next.js). Não é preciso mudar nenhuma configuração.
2. Opcional: defina `NEXT_PUBLIC_SITE_URL` com o domínio final (ex.: `https://diegodallaqua.dev`). Sem ela, o site usa `VERCEL_PROJECT_PRODUCTION_URL`, que a Vercel preenche com o domínio de produção (o domínio próprio, se houver, ou o `.vercel.app`) nos metadados, no sitemap e nas imagens de compartilhamento. Essas URLs são gravadas no build: depois de adicionar ou trocar o domínio, faça um novo deploy.

Observações:

- `engines.node` no `package.json` aceita qualquer versão a partir da 20.9, então a Vercel usa a mais recente e avisa no build. Para fixar uma versão, troque por `"24.x"`.
- A Content Security Policy de `next.config.ts` bloqueia os scripts da barra de ferramentas da Vercel (`vercel.live`) nos deploys de preview. A produção não é afetada; para usar comentários nos previews, libere `https://vercel.live` na CSP.

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
