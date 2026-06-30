# Documentação do Projeto — Graça & Verdade

> Blog cristão de teologia e estudos bíblicos | Junho 2026

---

## 1. Visão Geral

Blog cristão voltado à edificação da fé, com artigos sobre teologia, vida cristã, estudos
bíblicos e devocionais. Conteúdo em Markdown, site estático (SSG) com Next.js. Estrutura
preparada para loja de afiliados e venda de livros.

**Repositório:** `Uchoavf/Graca-e-Verdade-Site`
**Domínio:** https://gracaeverdade.com.br
**Deploy:** Vercel — auto-deploy a cada push
**URL produção:** https://graca-e-verdade.vercel.app

> ⚠️ **Privacidade:** Em 25/06/2026, todos os dados pessoais do autor foram temporariamente removidos
> dos artigos (nome, email, credenciais acadêmicas, instituições, cidade, Lattes/ORCID).
> A identificação do autor será reinserida futuramente com informações atualizadas.
> Veja a seção "Autoria" para detalhes.

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
├── public/
│   ├── biblia-index.json             # Índice da Bíblia ACF (31k versículos, 6 MB)
│   ├── favicon.svg / favicon.ico
│   └── og-image.svg
├── scripts/
│   ├── parse-biblia.ts               # Gera biblia-index.json a partir da ACF .txt
│   └── extrair_artigos.py            # Extrai .docx → .md (puro Python, sem deps)
├── src/
│   ├── actions/
│   │   └── contato.ts                # Server Action — email via Nodemailer (+ rate limit + honeypot)
│   ├── app/
│   │   ├── api/newsletter/route.ts   # API newsletter — salva em /data/newsletter.json
│   │   ├── biblia/page.tsx           # Leitor bíblico online (ACF)
│   │   ├── blog/
│   │   │   ├── page.tsx              # Lista de artigos com sidebar
│   │   │   └── [slug]/page.tsx       # Artigo individual
│   │   ├── categorias/
│   │   │   ├── page.tsx              # Grade de categorias
│   │   │   └── [slug]/page.tsx       # Artigos por categoria
│   │   ├── contato/page.tsx          # Formulário com honeypot
│   │   ├── loja/page.tsx             # Placeholder de loja
│   │   ├── sobre/page.tsx            # Missão e valores
│   │   ├── globals.css               # Tema, variáveis CSS, .prose, animações
│   │   ├── layout.tsx                # Header + Footer + fontes
│   │   ├── page.tsx                  # Home (hero, destaques, categorias, newsletter)
│   │   ├── not-found.tsx             # 404
│   │   ├── robots.ts / sitemap.ts
│   ├── components/
│   │   ├── ArticleCard.tsx           # Card (default, featured, compact)
│   │   ├── BibleSearch.tsx           # Leitor bíblico com busca e navegação
│   │   ├── Footer.tsx                # Rodapé
│   │   ├── GiscusComments.tsx        # Comentários GitHub
│   │   ├── Header.tsx                # Navbar responsiva
│   │   ├── NewsletterCTA.tsx         # CTA newsletter
│   │   ├── ReadingProgress.tsx       # Barra de progresso
│   │   ├── ShareButtons.tsx          # WhatsApp, Telegram, X, copiar
│   │   ├── ThemeScript.tsx           # Script inline anti-flash
│   │   └── ThemeToggle.tsx           # Dark/light toggle
│   ├── lib/
│   │   ├── constants.ts              # CATEGORY_COLORS + getCategoryColor()
│   │   ├── posts.ts                  # Leitura de Markdown (fs + gray-matter + remark)
│   │   └── rate-limit.ts             # Rate limiting in-memory (5 req/min)
│   └── posts/                        # 13 artigos em Markdown
│       ├── [6 artigos originais]
│       └── [7 artigos do Artigos-luz-biblia]
├── .env.example                      # Template de variáveis de ambiente
├── .gitignore                        # Protege .env, /data/, node_modules
├── AGENTS.md
├── DEPLOY.md                         # Guia completo de deploy
├── DOCUMENTACAO.md                   # Este arquivo
├── README.md
├── eslint.config.mjs
├── next.config.ts                    # Headers de segurança
├── package.json
├── start-dev.sh                      # Script genérico (usa $SCRIPT_DIR)
└── tsconfig.json
```

---

## 4. Como Rodar

```bash
git clone git@github.com:Uchoavf/Graca-e-Verdade-Site.git
cd Graca-e-Verdade-Site
npm install
npm run dev   # http://localhost:3000
```

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção com TypeScript check |
| `npm start` | Iniciar build de produção |
| `npm run lint` | ESLint |

---

## 5. Configurar Formulário de Contato

Crie um arquivo `.env` (use `.env.example` como base):

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app     # 16 caracteres, sem espaços
EMAIL_FROM=seu-email@gmail.com
EMAIL_TO=seu-email@gmail.com
```

**Senha de app do Gmail:** https://myaccount.google.com/security → Verificação em duas etapas → Senhas de app.

No deploy (Vercel), adicione as variáveis em **Settings → Environment Variables**.

---

## 6. Como Adicionar Artigos

Crie um arquivo `.md` em `src/posts/`. O nome do arquivo vira o slug da URL.

```yaml
---
title: "Título do Artigo"
date: "2026-06-25"
description: "Descrição curta para cards e meta tags."
tags: ["graca", "salvacao", "cruz"]
category: "teologia"
author: "Graça & Verdade"
featured: true
image: "https://images.unsplash.com/photo-xxxxx?w=1200&h=630&fit=crop&q=80"
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

### Buscar imagens no Unsplash

```bash
curl -H "Authorization: Client-ID SUA_KEY" \
  "https://api.unsplash.com/search/photos?query=shepherd+bible&per_page=3"
```

A URL da imagem: `https://images.unsplash.com/photo-{ID}?w=1200&h=630&fit=crop&q=80`

---

## 7. Rotas

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Static | Home (hero, destaques, categorias, recentes, newsletter) |
| `/blog` | Static | Lista de 13 artigos com sidebar |
| `/blog/[slug]` | SSG | Artigo individual (progresso, share, Giscus, JSON-LD) |
| `/categorias` | Static | Grade de categorias |
| `/categorias/[slug]` | SSG | Artigos por categoria |
| `/biblia` | Static | Leitor bíblico ACF (busca + navegação por livro/capítulo) |
| `/aconselhamento` | Static | Aconselhamento bíblico com IA |
| `/apoie` | Static | Página de doação — QR Code PIX |
| `/sobre` | Static | Missão e valores |
| `/contato` | Static | Formulário com honeypot + rate limit |
| `/loja` | Static | Placeholder de loja |
| `/robots.txt` | Static | Gerado automaticamente |
| `/sitemap.xml` | Static | Gerado automaticamente |
| `/api/newsletter` | Dynamic | API de newsletter com rate limit |

---

## 8. Artigos Publicados

### Originais (6)

| # | Título | Categoria | Data |
|---|--------|-----------|------|
| 1 | O Que é a Graça de Deus? | `teologia` | 10/06/2026 |
| 2 | O Poder Transformador da Oração | `devocional` | 08/06/2026 |
| 3 | Os Frutos do Espírito Santo | `vida-crista` | 05/06/2026 |
| 4 | Como Estudar a Bíblia | `estudo-biblico` | 03/06/2026 |
| 5 | Fé e Obras: O Ensino de Tiago | `teologia` | 01/06/2026 |
| 6 | O Amor de Deus Revelado na Cruz | `devocional` | 28/05/2026 |

### Convertidos do Artigos-luz-biblia (7)

| # | Título | Categoria | Data |
|---|--------|-----------|------|
| 7 | As Funções e o Papel do Pastor | `teologia` | 25/06/2026 |
| 8 | Economia do Reino — AT | `teologia` | 25/06/2026 |
| 9 | Economia do Reino — NT | `teologia` | 25/06/2026 |
| 10 | Economia do Reino — Comparada | `teologia` | 25/06/2026 |
| 11 | A Relação entre Marido e Mulher | `teologia` | 25/06/2026 |
| 12 | O Chamado Pastoral e a Ordenação de Mulheres | `teologia` | 29/06/2026 |
| 13 | A Validade do Dízimo na Igreja Contemporânea | `estudo-biblico` | 29/06/2026 |

---

## 9. Funcionalidades Implementadas

### Design e UX
- [x] Tema claro/escuro com toggle e detecção de sistema (sem flash)
- [x] Design responsivo — breakpoints `sm:` (640px), `md:` (768px iPad), `lg:` (1024px)
- [x] Menu hamburger com backdrop blur (≤768px)
- [x] Touch targets ≥ 44px no menu mobile
- [x] `safe-area-inset` para iPhones com notch
- [x] `100dvh` no body (viewport dinâmico)
- [x] Tipografia responsiva com `clamp()` na prosa
- [x] Fontes serif (Merriweather) + sans (Geist)
- [x] Paleta creme + dourado
- [x] Animações (fade-in, slide-up, scale-in)

### SEO e Metadados
- [x] `generateMetadata` dinâmico por artigo
- [x] JSON-LD estruturado (Article + BreadcrumbList)
- [x] Open Graph e Twitter Cards com imagem
- [x] `sitemap.xml` e `robots.txt` dinâmicos
- [x] `metadataBase` configurado

### Segurança
- [x] Rate limiting: newsletter (5 req/min), contato (3 req/15min)
- [x] Honeypot anti-bot no formulário de contato
- [x] Validação de entrada (regex, maxLength, trim)
- [x] Headers HTTP: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [x] CSRF protection via Next.js Server Actions
- [x] `.env` e `/data/` no `.gitignore`

### Conteúdo
- [x] 13 artigos com frontmatter YAML, imagens Unsplash
- [x] Categorias e tags extraídas dinamicamente
- [x] Tempo de leitura estimado (~200 palavras/min)
- [x] Imagens de capa otimizadas (Unsplash CDN, `w=1200&h=630&fit=crop&q=80`)
- [x] 5 artigos acadêmicos convertidos via script Python

### Interatividade
- [x] Formulário de contato funcional (Server Action + Nodemailer)
- [x] Barra de progresso de leitura
- [x] Botões de compartilhamento no topo e final do artigo (WhatsApp, Telegram, X, copiar link)
- [x] Comentários via Giscus (GitHub Discussions)
- [x] Newsletter salva emails em `/data/newsletter.json`
- [x] Artigos relacionados

### Leitor Bíblico (`/biblia`)
- [x] 31.105 versículos indexados (Almeida Corrigida Fiel)
- [x] Busca por referência exata (`João 3:16`) ou palavra-chave (`amor graça`)
- [x] Suporte a abreviações (`Jo 3:16`, `Sl 23`)
- [x] Navegação por livro (dropdown com 66 livros) e capítulo (prev/next)
- [x] Versículo destacado ao buscar
- [x] Scroll automático até o versículo
- [x] Botão de copiar versículo (hover)
- [x] Índice JSON estático (6 MB, carregado no browser)

### Aconselhamento Bíblico (`/aconselhamento`)
- [x] IA responde perguntas com conteúdo exclusivamente bíblico
- [x] Cita versículos no formato ACF (Almeida Corrigida Fiel)
- [x] Respostas pastorais, acolhedoras, máx 350 palavras
- [x] Sugestões de perguntas como exemplos
- [x] Backend via OpenRouter + Gemini Flash Lite (grátis)

### Doação (`/apoie`)
- [x] QR Code PIX funcional (escaneia e abre app do banco)
- [x] Chave copiável com 1 clique
- [x] Visual discreto com versículo de 2 Coríntios 9:7
- [x] Sem valor fixo — doador escolhe o quanto

### Código
- [x] Componentes órfãos removidos (ProjectCard, WhatsAppButton, CopyLinkButton)
- [x] `CATEGORY_COLORS` extraído para `src/lib/constants.ts` (DRY)
- [x] `.env.example` criado
- [x] `start-dev.sh` com caminho genérico (`$SCRIPT_DIR`)
- [x] `tsconfig.json` exclui `scripts/` do build
- [x] Lint: 0 erros, 2 warnings (apenas `<img>` — otimizável com `next/image`)

---

## 10. Scripts de Manutenção

### Gerar índice da Bíblia

```bash
npx tsx scripts/parse-biblia.ts \
  /caminho/para/biblia_completa.txt \
  public/biblia-index.json
```

### Extrair artigos .docx → .md

```bash
python3 scripts/extrair_artigos.py
```

Configurar caminhos no final do script (`artigos_dir`, `output_dir`).

### Buscar imagens no Unsplash

```bash
UNSPLASH_KEY="sua-key"
curl -H "Authorization: Client-ID $UNSPLASH_KEY" \
  "https://api.unsplash.com/search/photos?query=PASTORA&per_page=5"
```

---

## 11. Build e Deploy

```bash
npm run build   # 28 páginas estáticas, ~16s
```

```
Route (app)
┌ ○ /                          # Static
├ ○ /_not-found
├ ƒ /api/newsletter             # Dynamic (salva JSON)
├ ○ /biblia                    # Static (leitor bíblico)
├ ○ /blog
├ ● /blog/[slug]               # SSG (13 artigos)
├ ○ /categorias
├ ● /categorias/[slug]         # SSG (4 categorias)
├ ○ /contato
├ ○ /loja
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /sobre
```

### Deploy na Vercel

Conectado ao GitHub. Deploy automático a cada push na main.
Variáveis de ambiente: configurar `EMAIL_*` no dashboard da Vercel.

---

## 12. Pendências

| # | Item | Prioridade |
|---|------|:---:|
| 1 | `next/image` para otimização de imagens (remotePatterns) | 🟡 |
| 2 | Paginação no blog (>12 artigos) | 🟡 |
| 3 | RSS Feed | 🟢 |
| 4 | Tabela de conteúdo (ToC) nos artigos | 🟢 |
| 5 | Open Graph images dinâmicas (`@vercel/og`) | 🟢 |
| 6 | Loja real com links de afiliado | 🟢 |
| 7 | Busca full-text nos artigos | 🟢 |
| 8 | CI/CD com GitHub Actions | 🟢 |
| 9 | Analytics (Plausible ou Vercel) | 🟢 |
| 10 | Internacionalização | 🟢 |

---

## 13. Autoria

### Dados removidos (25/06/2026)

Os seguintes dados pessoais foram removidos e devem ser reinseridos com informações atualizadas:

- Nome completo (Ewerton Uchôa Vieira Fiel)
- Emails pessoais e institucional
- Credenciais acadêmicas (UFPA, IBADEM, UFRA, Uniasselvi)
- Vínculos profissionais (UFRA, TRF1)
- Cidade (Ananindeua-PA)
- Cargo eclesiástico (Diácono, Ministério Arca da Aliança)
- Links Lattes e ORCID

### Permanentemente anônimo

- Senhas e tokens (`.env` — gitignored)
- Lista de emails da newsletter (`/data/` — gitignored)

### Roteiro para reinserir dados

1. Criar um arquivo de bio atualizado
2. Adicionar ao frontmatter de cada artigo ou ao final do corpo
3. Atualizar página `/sobre` com informações do autor
4. Adicionar links Lattes/ORCID com URLs completas

---

## 14. Repositórios Relacionados

| Repositório | Descrição |
|-------------|-----------|
| `Uchoavf/Artigos-luz-biblia` | Artigos acadêmicos ABNT — 5 já convertidos para o blog |
| `Uchoavf/jogo-da-velha` | Jogo da Velha com IA (Python + Tkinter) |
| `Uchoavf/calculadora-gordura-corporal` | Calculadora US Navy |
| `Uchoavf/escala-ufra` | Planilha de escala de trabalho |
| `Uchoavf/temporizador-lavanderia` | Temporizador para lavanderia |
| `Uchoavf/Radoc.app` | App RADOC (private) |
| `Uchoavf/Radocpro.site` | Serviço RADOC PRO |

---

## 15. Changelog

| Data | Mudanças |
|------|----------|
| 29/06 | Aconselhamento bíblico com IA (OpenRouter + Gemini Flash Lite) |
| 29/06 | Página `/apoie` com QR Code PIX |
| 29/06 | 2 novos artigos (13 total): Pastorado Feminino, Validade do Dízimo |
| 29/06 | Artigos 12+13 fundidos em artigo único (originais em `_arquivo/`) |
| 29/06 | Links Instagram/YouTube removidos (futuro) |
| 29/06 | Toggle de tema: html.light força modo claro mesmo com sistema dark |
| 29/06 | 14 bugs corrigidos (código, frontend, artigos) |
| 29/06 | Fuzzing e pen test — 6 vulnerabilidades corrigidas |
| 29/06 | Descrições truncadas corrigidas em 4 artigos |
| 25/06 | Leitor bíblico com busca e navegação (66 livros, 31k versículos) |
| 25/06 | 5 artigos convertidos de `.docx` → `.md` (Artigos-luz-biblia) |
| 25/06 | Imagens Unsplash temáticas em todos os artigos |
| 25/06 | Rate limiting, honeypot, security headers |
| 25/06 | Newsletter salva emails em JSON |
| 25/06 | Design responsivo para mobile/tablet/desktop |
| 25/06 | Dados pessoais removidos dos artigos |
| 25/06 | Deploy na Vercel (https://graca-e-verdade.vercel.app) |

---

*Soli Deo Gloria.*
