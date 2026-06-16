# Graça & Verdade — Blog Bíblico e Teologia Cristã

Blog cristão voltado à edificação da fé, com artigos sobre teologia, vida cristã, estudos bíblicos, devocionais e apologética. Estrutura preparada para expansão futura com loja de afiliados e venda de livros.

> *"E conhecerão a verdade, e a verdade os libertará."* — João 8:32

---

## Índice

- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar](#como-rodar)
- [Como Adicionar Artigos](#como-adicionar-artigos)
- [Paleta de Cores](#paleta-de-cores)
- [Rotas (Pages)](#rotas-pages)
- [Componentes Reutilizáveis](#componentes-reutilizáveis)
- [Sistema de Categorias](#sistema-de-categorias)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
- [Build e Deploy](#build-e-deploy)
- [Recomendações e Melhorias Futuras](#recomendações-e-melhorias-futuras)
- [Licença](#licença)

---

## Tecnologias

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| [Next.js](https://nextjs.org) | 16.2.6 | Framework React com SSR/SSG |
| [React](https://react.dev) | 19.2.4 | Biblioteca de UI |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Estilização utilitária |
| [TypeScript](https://typescriptlang.org) | 5.x | Tipagem estática |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | 4.0.3 | Parser de frontmatter Markdown |
| [remark](https://remark.js.org) | 15.0.1 | Processador Markdown |
| [remark-html](https://github.com/remarkjs/remark-html) | 16.0.1 | Conversão Markdown → HTML |
| [nodemailer](https://nodemailer.com) | 8.x | Envio de emails (formulário de contato) |
| [Geist](https://vercel.com/font) + [Merriweather](https://fonts.google.com/specimen/Merriweather) | — | Fontes (sans-serif + serif) |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx             # Listagem de todos os artigos com sidebar
│   │   └── [slug]/
│   │       └── page.tsx         # Página individual de artigo (SSG)
│   ├── categorias/
│   │   ├── page.tsx             # Grade de categorias
│   │   └── [slug]/
│   │       └── page.tsx         # Artigos filtrados por categoria
│   ├── contato/
│   │   └── page.tsx             # Formulário de contato com Nodemailer
│   ├── loja/
│   │   └── page.tsx             # Loja (placeholder para afiliados/livros)
│   ├── sobre/
│   │   └── page.tsx             # Página "Sobre" com missão e valores
│   ├── globals.css              # CSS global + variáveis da paleta + estilos prose
│   ├── layout.tsx               # Layout raiz (Header + Footer + fontes)
│   └── page.tsx                 # Home page (hero, destaques, categorias, newsletter)
├── components/
│   ├── ArticleCard.tsx           # Card de artigo (3 variantes: default, featured, compact)
│   ├── Footer.tsx                # Rodapé com navegação, versículo e redes sociais
│   ├── Header.tsx                # Header sticky com navegação e menu mobile
│   └── NewsletterCTA.tsx         # Call-to-action de newsletter (client component)
├── lib/
│   └── posts.ts                  # Lógica de leitura de posts (FS + gray-matter + remark)
└── posts/
    ├── o-que-e-a-graca-de-deus.md
    ├── o-poder-transformador-da-oracao.md
    ├── os-frutos-do-espirito-santo.md
    ├── como-estudar-a-biblia-guia-pratico.md
    ├── fe-e-obras-o-ensino-de-tiago.md
    └── o-amor-de-deus-revelado-na-cruz.md
```

---

## Como Rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor de desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000
```

### Comandos disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com Turbopack |
| `npm run build` | Build de produção com checagem TypeScript |
| `npm run start` | Iniciar servidor de produção |
| `npm run lint` | Rodar ESLint |

---

## Como Adicionar Artigos

1. Crie um arquivo `.md` dentro de `src/posts/`
2. Use o nome do arquivo como slug (ex: `meu-artigo.md` → `/blog/meu-artigo`)
3. Preencha o frontmatter YAML no topo do arquivo:

```yaml
---
title: "Título do Artigo"
date: "2026-06-15"
description: "Descrição curta que aparece nos cards e meta tags"
tags: ["tag1", "tag2", "tag3"]
category: "teologia"     # opções: teologia, vida-crista, devocional, apologetica, estudo-biblico, escatologia, geral
author: "Nome do Autor"
featured: true           # true = aparece na seção "Destaques" da home
---
```

4. Escreva o conteúdo em Markdown abaixo do frontmatter

### Categorias disponíveis

| Slug | Nome | Cor do badge |
|------|------|-------------|
| `teologia` | Teologia | Rosa |
| `vida-crista` | Vida Cristã | Verde |
| `devocional` | Devocional | Âmbar |
| `apologetica` | Apologética | Azul |
| `estudo-biblico` | Estudo Bíblico | Violeta |
| `escatologia` | Escatologia | Laranja |
| `geral` | Geral | Cinza |

---

## Paleta de Cores

Inspirada no design do site do Claude (Anthropic) — tons quentes, creme e dourado, com contraste suave entre claro e escuro.

### Light Mode

| Variável CSS | Hex | Uso |
|-------------|-----|-----|
| `--background` | `#faf8f5` | Fundo da página |
| `--foreground` | `#1a1a1a` | Texto principal |
| `--muted` | `#e8e4dd` | Fundos secundários |
| `--muted-foreground` | `#6b6660` | Texto secundário |
| `--accent` | `#c9a962` | Cor de destaque (dourado) |
| `--card` | `#ffffff` | Fundo de cards |
| `--border` | `#e0dbd4` | Bordas |

### Dark Mode

| Variável | Hex |
|----------|-----|
| `--background` | `#141311` |
| `--foreground` | `#f5f3f0` |
| `--accent` | `#d4b870` |
| `--card` | `#1c1b18` |

---

## Rotas (Pages)

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Static | Home com hero, destaques, categorias e newsletter |
| `/blog` | Static | Listagem de todos os artigos com sidebar |
| `/blog/[slug]` | SSG | Artigo individual com metadados, tags e relacionados |
| `/categorias` | Static | Grade de categorias com ícones |
| `/categorias/[slug]` | SSG | Artigos filtrados por categoria |
| `/sobre` | Static | Missão, valores e identidade do projeto |
| `/contato` | Static | Formulário de contato funcional |
| `/loja` | Static | Vitrine de produtos e programa de afiliados |

---

## Componentes Reutilizáveis

### `ArticleCard`
Card de artigo com 3 variantes:
- **`default`** — Card padrão com categoria, título, descrição e metadados
- **`featured`** — Card grande com placeholder de imagem, ideal para seção de destaques
- **`compact`** — Card horizontal compacto, usado em artigos relacionados

### `NewsletterCTA`
Client component com formulário de inscrição para newsletter. Usa `'use client'` para permitir `onSubmit`. Visual com blur decorativo no fundo.

---

## Sistema de Categorias

As categorias são extraídas dinamicamente dos arquivos Markdown. A cada build, o sistema:
1. Lê todos os `.md` de `src/posts/`
2. Agrupa por `category`
3. Conta artigos por categoria
4. Gera páginas estáticas (`/categorias/[slug]`) via `generateStaticParams`

Cada categoria recebe badge colorido de acordo com o mapeamento em `CATEGORY_COLORS`.

---

## Arquitetura e Decisões Técnicas

### Por que Next.js com SSG?
- **Performance**: Páginas de artigos são pré-geradas no build (Static Site Generation)
- **SEO**: Metadados via `generateMetadata` para cada artigo
- **Escalabilidade**: Markdown como fonte de conteúdo (sem banco de dados, sem CMS)
- **Custo zero de hospedagem**: Compatível com Vercel (free tier)

### Por que Markdown?
- Arquivos de texto puro versionáveis com Git
- Sem dependência de banco de dados
- Fácil de editar em qualquer editor
- Frontmatter YAML para metadados estruturados

### Tratamento de conteúdo
- `gray-matter` extrai frontmatter YAML
- `remark` + `remark-html` convertem Markdown para HTML seguro
- Classes CSS aplicadas via `.prose` no `globals.css`
- Estimativa de tempo de leitura (~200 palavras/min)

---

## Build e Deploy

```bash
# Build de produção
npm run build

# O build gera:
# - Páginas estáticas (/, /blog, /categorias, /sobre, /contato, /loja)
# - Páginas SSG para cada artigo e categoria

# Para deploy na Vercel:
# 1. Conecte o repositório GitHub à Vercel
# 2. A Vercel detecta Next.js automaticamente
# 3. Deploy automático a cada push na branch main
```

### Exemplo de saída do build:
```
Route (app)
┌ ○ /
├ ○ /blog
├ ● /blog/[slug]          (6 artigos)
├ ○ /categorias
├ ● /categorias/[slug]     (4 categorias)
├ ○ /contato
├ ○ /loja
└ ○ /sobre
```

---

## Recomendações e Melhorias Futuras

### Curto prazo (melhorias imediatas)

1. **Imagens nos artigos**: Adicionar suporte a imagens de capa via frontmatter (`image: /caminho.jpg`) e renderizá-las nos cards e no topo dos artigos
2. **Sistema de busca**: Implementar busca full-text nos artigos (pode usar `fuse.js` ou busca server-side simples)
3. **Paginação no blog**: Quando houver muitos artigos (>12), adicionar paginação na página `/blog`
4. **RSS Feed**: Gerar feed RSS para leitores assinarem
5. **Compartilhamento social real**: Implementar botões de compartilhar com URLs dinâmicas (Twitter/X, Facebook, WhatsApp, Telegram)

### Médio prazo (expansão do blog)

6. **Newsletter funcional**: Conectar o `NewsletterCTA` a um serviço como Mailchimp, ConvertKit ou Buttondown
7. **Comentários**: Integrar Giscus (comentários via GitHub Discussions) ou Disqus
8. **Séries de artigos**: Agrupar artigos relacionados em séries (ex: "Estudo do Livro de Romanos — Parte 1, 2, 3")
9. **Modo escuro automático**: Refinar a transição light/dark mode com toggle manual
10. **Índice de conteúdo (ToC)**: Gerar tabela de conteúdo automática nos artigos a partir dos headings

### Longo prazo (loja e afiliados)

11. **Loja completa**: Substituir o placeholder atual por integração real:
    - Catálogo de livros com busca e filtros
    - Página de produto com descrição, preço e link de afiliado
    - Carrinho (se for e-commerce próprio) ou redirect para marketplace
12. **Sistema de afiliados**: 
    - Cadastro de afiliados com dashboard
    - Links rastreáveis com parâmetros UTM
    - Relatório de cliques e conversões
13. **Área de membros**: Conteúdo exclusivo para assinantes (estudos aprofundados, e-books)
14. **Internacionalização**: Suporte a múltiplos idiomas (espanhol, inglês) via `next-intl`
15. **Migração para CMS headless**: Se o volume de artigos crescer muito, considerar migrar para Strapi, Sanity ou Contentful (mantendo a possibilidade de continuar com Markdown)

### Performance e SEO

16. **Open Graph images**: Gerar imagens de compartilhamento automáticas via `@vercel/og` para cada artigo
17. **Sitemap**: Gerar `sitemap.xml` dinâmico com todas as rotas
18. **Schema.org**: Adicionar dados estruturados `Article` e `BreadcrumbList` para rich snippets no Google
19. **Lighthouse 100**: Auditar e otimizar para score perfeito em Performance, Acessibilidade, Best Practices e SEO

### DevOps

20. **CI/CD**: Configurar GitHub Actions para rodar lint e build a cada PR
21. **Pre-commit hooks**: Husky + lint-staged para garantir qualidade do código
22. **Monitoramento**: Configurar Vercel Analytics ou Plausible para métricas de audiência

---

## Licença

Projeto pessoal. Todos os direitos reservados.

---

Feito com ❤️ para a glória de Deus. *Soli Deo Gloria.*

