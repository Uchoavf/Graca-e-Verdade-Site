# Documentação do Projeto — Graça & Verdade

> Blog cristão de teologia e estudos bíblicos | Junho 2026

---

## 1. Visão Geral

Blog cristão voltado à edificação da fé, com artigos sobre teologia, vida cristã, estudos
bíblicos e devocionais. Conteúdo em Markdown, site estático (SSG) com Next.js. Estrutura
preparada para loja de afiliados e venda de livros.

**Repositório:** `Uchoavf/Graca-e-Verdade-Site`
**Domínio:** https://gracaeverdade.com.br
**Deploy:** Vercel

---

## 2. Tecnologias

| Tecnologia     | Versão   | Função                        |
|---------------|----------|-------------------------------|
| Next.js        | 16.2.6   | Framework React (App Router + SSG) |
| React          | 19.2.4   | Biblioteca UI                 |
| TypeScript     | 5.x      | Tipagem estática              |
| Tailwind CSS   | 4.x      | Estilização utilitária        |
| gray-matter    | 4.0.3    | Parse de frontmatter YAML     |
| remark         | 15.0.1   | Processador Markdown          |
| remark-html    | 16.0.1   | Markdown → HTML               |
| nodemailer     | 8.x      | Envio de emails (contato)     |
| Geist + Merriweather | —  | Fontes (sans-serif + serif)   |

---

## 3. Estrutura do Projeto

```
graca-e-verdade/
├── public/                         # Arquivos estáticos (favicon, og-image, SVGs)
├── src/
│   ├── actions/
│   │   └── contato.ts              # Server Action — envia email via Nodemailer
│   ├── app/
│   │   ├── api/
│   │   │   └── newsletter/
│   │   │       └── route.ts        # API route de newsletter (stub — retorna sempre ok)
│   │   ├── blog/
│   │   │   ├── page.tsx            # Lista de artigos com sidebar (categorias + tags + loja)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Artigo individual (reading progress, share, giscus, JSON-LD)
│   │   ├── categorias/
│   │   │   ├── page.tsx            # Grade de categorias
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Artigos filtrados por categoria
│   │   ├── contato/
│   │   │   └── page.tsx            # Formulário de contato funcional (useActionState)
│   │   ├── loja/
│   │   │   └── page.tsx            # Placeholder — vitrine de produtos e afiliados
│   │   ├── sobre/
│   │   │   └── page.tsx            # Missão, valores e identidade
│   │   ├── favicon.ico
│   │   ├── globals.css             # CSS global + variáveis de tema + estilos .prose
│   │   ├── layout.tsx              # Layout raiz (Header + Footer + fontes)
│   │   ├── not-found.tsx           # Página 404 com versículo
│   │   ├── page.tsx                # Home (hero, destaques, categorias, recentes, newsletter)
│   │   ├── robots.ts               # robots.txt dinâmico
│   │   └── sitemap.ts              # sitemap.xml dinâmico
│   ├── components/
│   │   ├── ArticleCard.tsx         # Card de artigo (3 variantes: default, featured, compact)
│   │   ├── CopyLinkButton.tsx      # [ÓRFÃO] — não importado em lugar nenhum
│   │   ├── Footer.tsx              # Rodapé com navegação, versículo e redes sociais
│   │   ├── GiscusComments.tsx      # Comentários via GitHub Discussions
│   │   ├── Header.tsx              # Header sticky com menu hamburger responsivo
│   │   ├── NewsletterCTA.tsx       # CTA de newsletter (client component)
│   │   ├── ProjectCard.tsx         # [ÓRFÃO] — não importado, legado de projeto antigo
│   │   ├── ReadingProgress.tsx     # Barra de progresso de leitura
│   │   ├── ShareButtons.tsx        # Compartilhar (WhatsApp, Telegram, X, copiar link)
│   │   ├── ThemeScript.tsx         # Script inline p/ evitar flash no carregamento
│   │   ├── ThemeToggle.tsx         # Toggle dark/light mode
│   │   └── WhatsAppButton.tsx      # [ÓRFÃO] — não importado, placeholder
│   ├── lib/
│   │   └── posts.ts                # Leitura de posts (fs + gray-matter + remark)
│   └── posts/                      # 6 artigos em Markdown
│       ├── como-estudar-a-biblia-guia-pratico.md
│       ├── fe-e-obras-o-ensino-de-tiago.md
│       ├── o-amor-de-deus-revelado-na-cruz.md
│       ├── o-poder-transformador-da-oracao.md
│       ├── o-que-e-a-graca-de-deus.md
│       └── os-frutos-do-espirito-santo.md
├── .gitignore
├── AGENTS.md                       # Instruções para LLM agents
├── DOCUMENTACAO.md                 # Este arquivo
├── README.md                       # Documentação pública do projeto
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── start-dev.sh                    # Script de inicialização com caminho fixo (corrigir)
└── tsconfig.json
```

---

## 4. Como Rodar

### Pré-requisitos

- **Node.js** 18+ (recomendado via [nvm](https://github.com/nvm-sh/nvm))

### Passo a passo

```bash
# 1. Clonar
git clone git@github.com:Uchoavf/Graca-e-Verdade-Site.git
cd Graca-e-Verdade-Site

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev
```

O site estará em `http://localhost:3000`.

### Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção com checagem TypeScript |
| `npm start` | Iniciar build de produção |
| `npm run lint` | ESLint |

---

## 5. Configurar Formulário de Contato

O formulário envia emails via **Nodemailer + SMTP**. Crie um arquivo `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_FROM=seu-email@gmail.com
EMAIL_TO=seu-email@gmail.com
```

### Senha de app do Gmail:

1. https://myaccount.google.com/security
2. Ative **Verificação em duas etapas**
3. Vá em **Senhas de app** → "Email" → "Outro"
4. Cole a senha gerada em `EMAIL_PASS`

No deploy (Vercel), adicione as variáveis em **Project Settings → Environment Variables**.

---

## 6. Como Adicionar Artigos

Crie um arquivo `.md` em `src/posts/`:

```yaml
---
title: "Título do Artigo"
date: "2026-06-15"
description: "Descrição curta para cards e meta tags."
tags: ["graca", "salvacao", "cruz"]
category: "teologia"
author: "Graça & Verdade"
featured: true
image: "https://images.unsplash.com/photo-xxx?w=1200&h=630&fit=crop&q=80"
---
```

### Categorias disponíveis

| Slug | Nome | Cor |
|------|------|-----|
| `teologia` | Teologia | Rosa |
| `vida-crista` | Vida Cristã | Verde |
| `devocional` | Devocional | Âmbar |
| `apologetica` | Apologética | Azul |
| `estudo-biblico` | Estudo Bíblico | Violeta |
| `escatologia` | Escatologia | Laranja |
| `geral` | Geral | Cinza |

---

## 7. Rotas

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Static | Home (hero, destaques, categorias, recentes, newsletter) |
| `/blog` | Static | Lista de artigos com sidebar |
| `/blog/[slug]` | SSG | Artigo individual (progresso, share, Giscus, JSON-LD) |
| `/categorias` | Static | Grade de categorias |
| `/categorias/[slug]` | SSG | Artigos por categoria |
| `/sobre` | Static | Missão e valores |
| `/contato` | Static | Formulário de contato |
| `/loja` | Static | Placeholder de loja |
| `/robots.txt` | Static | Robots dinâmico |
| `/sitemap.xml` | Static | Sitemap dinâmico |
| `/api/newsletter` | Dynamic | API de newsletter (stub) |

---

## 8. Funcionalidades Implementadas

### Design e UX
- [x] Tema claro/escuro com toggle e detecção de sistema
- [x] Design responsivo (mobile, tablet, desktop) — breakpoints `sm:`, `md:`, `lg:`
- [x] Menu hamburger com backdrop blur no mobile
- [x] Touch targets ≥ 44px nos links do menu mobile
- [x] `safe-area-inset` para iPhones com notch
- [x] Tipografia responsiva com `clamp()` nos artigos
- [x] Fontes serif (Merriweather) + sans (Geist)
- [x] Paleta de cores quentes (creme + dourado) inspirada no Claude/Anthropic
- [x] Animações de entrada (fade-in, slide-up, scale-in)

### SEO e Metadados
- [x] `generateMetadata` dinâmico por artigo
- [x] JSON-LD estruturado (Article + BreadcrumbList)
- [x] Open Graph e Twitter Cards
- [x] `sitemap.xml` e `robots.txt` dinâmicos
- [x] Meta keywords e description
- [x] `metadataBase` configurado

### Conteúdo
- [x] 6 artigos em Markdown com frontmatter YAML
- [x] Categorias extraídas dinamicamente dos posts
- [x] Tags com links filtráveis
- [x] Tempo de leitura estimado (~200 palavras/min)
- [x] Sistema de "Destaques" (featured posts)

### Interatividade
- [x] Formulário de contato funcional (Server Action + Nodemailer)
- [x] Barra de progresso de leitura nos artigos
- [x] Botões de compartilhamento (WhatsApp, Telegram, X, copiar link)
- [x] Comentários via Giscus (GitHub Discussions)
- [x] CTA de newsletter com formulário (client component)
- [x] Artigos relacionados no final de cada post

---

## 9. Pendências e Melhorias Futuras

### Correções urgentes

| # | Item | Prioridade |
|---|------|:---:|
| 1 | **Newsletter funcional** — endpoint `/api/newsletter` é um stub, retorna sempre `success: true`. Conectar a Mailchimp, ConvertKit ou ao menos salvar em arquivo JSON | 🔴 |
| 2 | **`.env.example`** — criar arquivo documentando as variáveis de ambiente obrigatórias | 🔴 |
| 3 | **Remover componentes órfãos** — `ProjectCard.tsx`, `WhatsAppButton.tsx`, `CopyLinkButton.tsx` não são importados em lugar nenhum | 🔴 |
| 4 | **Extrair `CATEGORY_COLORS`** — código duplicado em `blog/page.tsx`, `blog/[slug]/page.tsx` e `ArticleCard.tsx`. Mover para `lib/constants.ts` | 🔴 |
| 5 | **Corrigir bug `getColor(tag.name)`** — na sidebar do blog, `getColor()` recebe nome de tag em vez de slug de categoria, sempre cai no fallback `geral` | 🟡 |
| 6 | **Corrigir `start-dev.sh`** — contém caminho absoluto de outra máquina (`/home/ewerton/meu-site`) | 🟡 |

### Melhorias de segurança e performance

| # | Item | Prioridade |
|---|------|:---:|
| 7 | **Rate limiting** — formulário de contato e newsletter sem proteção contra spam | 🟡 |
| 8 | **Imagens otimizadas** — usar `next/image` com `remotePatterns` para Unsplash | 🟡 |
| 9 | **Honeypot/Captcha** — campo invisível no formulário para bots | 🟢 |
| 10 | **CSP headers** — Content Security Policy para scripts inline | 🟢 |

### Funcionalidades novas

| # | Item | Prioridade |
|---|------|:---:|
| 11 | **Paginação no blog** — necessário quando houver >12 artigos | 🟡 |
| 12 | **Busca full-text** — fuse.js ou busca server-side | 🟡 |
| 13 | **RSS Feed** — `/feed.xml` para leitores | 🟢 |
| 14 | **Tabela de conteúdo (ToC)** — auto-gerada dos headings do artigo | 🟢 |
| 15 | **Open Graph images dinâmicas** — `@vercel/og` por artigo | 🟢 |
| 16 | **Séries de artigos** — agrupar posts relacionados | 🟢 |
| 17 | **Loja real** — integrar catálogo com links de afiliado | 🟢 |
| 18 | **Internacionalização** — `next-intl` para pt-BR, en, es | 🟢 |

### DevOps

| # | Item | Prioridade |
|---|------|:---:|
| 19 | **CI/CD** — GitHub Actions para lint + build a cada PR | 🟢 |
| 20 | **Pre-commit hooks** — Husky + lint-staged | 🟢 |
| 21 | **Analytics** — Plausible ou Vercel Analytics | 🟢 |

### Integração com outros repositórios

| # | Item | Prioridade |
|---|------|:---:|
| 22 | **Artigos Luz Bíblia** — converter artigos acadêmicos (.docx) para Markdown e publicar no blog | 🟢 |
| 23 | **Bíblia ACF** — integrar `biblia_completa.txt` como API de busca de versículos | 🟢 |

---

## 10. Build e Deploy

```bash
npm run build
```

O build gera todas as páginas como HTML estático. Exemplo de saída:

```
Route (app)
┌ ○ /                          # Static
├ ○ /_not-found                # Static
├ ƒ /api/newsletter             # Dynamic (stub)
├ ○ /blog                      # Static
├ ● /blog/[slug]               # SSG (6 artigos)
├ ○ /categorias                # Static
├ ● /categorias/[slug]         # SSG (4 categorias)
├ ○ /contato                   # Static
├ ○ /loja                      # Static
├ ○ /robots.txt                # Static
├ ○ /sitemap.xml               # Static
└ ○ /sobre                     # Static
```

### Deploy na Vercel

1. Conecte o repositório `Uchoavf/Graca-e-Verdade-Site` à Vercel
2. A Vercel detecta Next.js automaticamente
3. Configure as variáveis de ambiente (`EMAIL_*`)
4. Deploy automático a cada push na branch main

---

## 11. Decisões Técnicas

- **SSG puro**: Todas as páginas são pré-geradas no build. Zero banco de dados. Custo zero.
- **Markdown como CMS**: Arquivos `.md` versionados com Git, sem dependência de CMS headless.
- **`'use client'` mínimo**: Apenas componentes interativos usam renderização no cliente.
- **Sem `tailwind.config.js`**: Tailwind v4 usa `@theme inline` no CSS.
- **Server Actions**: Formulário de contato usa `useActionState` — sem API route adicional.

---

## 12. Repositórios Relacionados

| Repositório | Descrição |
|-------------|-----------|
| `Uchoavf/Artigos-luz-biblia` | Artigos acadêmicos ABNT (Python + .docx) — futura integração |
| `Uchoavf/jogo-da-velha` | Jogo da Velha com IA (Python + Tkinter) |
| `Uchoavf/calculadora-gordura-corporal` | Calculadora de gordura corporal |
| `Uchoavf/escala-ufra` | Planilha de escala de trabalho |
| `Uchoavf/temporizador-lavanderia` | Temporizador para lavanderia |
| `Uchoavf/Radoc.app` | App RADOC (private) |
| `Uchoavf/Radocpro.site` | Serviço RADOC PRO |

---

*Soli Deo Gloria.*
