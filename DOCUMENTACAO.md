# Documentação do Projeto — meu-site

> Versão 2.0 | Junho 2026

---

## 1. Visão Geral

Site de serviços e soluções nas áreas de **finanças**, **automação** e **criação de sites**.  
Construído com **Next.js**, **TypeScript** e **Tailwind CSS**. Deploy na **Vercel**.

---

## 2. Tecnologias

| Tecnologia     | Versão   | Função                        |
|---------------|----------|-------------------------------|
| Next.js        | 16.2.6   | Framework React (App Router)  |
| React          | 19.2.4   | Biblioteca UI                 |
| TypeScript     | 5.x      | Tipagem estática              |
| Tailwind CSS   | 4.x      | Estilização utilitária        |
| Nodemailer     | 7.x      | Envio de emails (contato)     |
| gray-matter    | 5.x      | Parse de frontmatter (blog)   |
| remark         | 15.x     | Markdown para HTML (blog)     |

---

## 3. Estrutura do Projeto

```
meu-site/
├── public/                        # Arquivos estáticos (imagens, favicon)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout raiz (header + footer + WhatsApp)
│   │   ├── page.tsx               # Home — hero + 3 pilares + diferenciais
│   │   ├── globals.css            # Estilos globais (Tailwind + tema)
│   │   ├── servicos/
│   │   │   └── page.tsx           # 12 serviços em 3 categorias
│   │   ├── projetos/
│   │   │   └── page.tsx           # Portfólio de projetos
│   │   ├── blog/
│   │   │   ├── page.tsx           # Listagem de artigos
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Artigo individual
│   │   └── contato/
│   │       └── page.tsx           # Formulário funcional + info
│   ├── actions/
│   │   └── contato.ts             # Server Action de envio de email
│   ├── components/
│   │   ├── Header.tsx             # Navbar responsiva
│   │   ├── Footer.tsx             # Footer com links sociais
│   │   ├── ProjectCard.tsx        # Card de projeto
│   │   └── WhatsAppButton.tsx     # Botão flutuante WhatsApp
│   ├── lib/
│   │   └── posts.ts               # Leitura de posts markdown
│   └── posts/
│       ├── como-criar-site-moderno.md
│       └── tendencias-web-2026.md
├── .env.example                    # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
├── next.config.ts
└── DOCUMENTACAO.md
```

---

## 4. Como Rodar em Outro Computador

### Pré-requisitos

- **Node.js** 18+ (recomendado via [nvm](https://github.com/nvm-sh/nvm))

### Passo a passo

```bash
# 1. Instalar Node.js (exemplo com nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install --lts

# 2. Copiar o projeto
cd meu-site

# 3. Instalar dependências
npm install

# 4. Rodar em desenvolvimento
npm run dev
```

O site estará em `http://localhost:3000`.

### Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm start        # Iniciar build de produção
npm run lint     # ESLint
```

---

## 5. Configurar o Formulário de Contato

O formulário envia emails via **Nodemailer + Gmail SMTP**.  

### Passos:

1. Crie um arquivo `.env` na raiz do projeto (use `.env.example` como base)
2. Configure as variáveis com seu email:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_FROM=seu-email@gmail.com
EMAIL_TO=seu-email@gmail.com
```

### Como obter a senha de app do Gmail:

1. Acesse https://myaccount.google.com/security
2. Ative **Verificação em duas etapas** (obrigatório)
3. Vá em **Senhas de app**
4. Selecione "Email" e "Outro"
5. Copie a senha gerada e cole em `EMAIL_PASS`

### No deploy (Vercel):

Adicione as mesmas variáveis em:  
**Vercel Project Settings → Environment Variables**

---

## 6. Páginas do Site

| Rota          | Arquivo                       | Descrição                              |
|--------------|-------------------------------|----------------------------------------|
| `/`          | `src/app/page.tsx`             | Home com hero e 3 pilares de serviços  |
| `/servicos`  | `src/app/servicos/page.tsx`    | 12 serviços detalhados                |
| `/projetos`  | `src/app/projetos/page.tsx`    | Portfólio de projetos                 |
| `/blog`      | `src/app/blog/page.tsx`        | Lista de artigos do blog              |
| `/blog/[slug]`| `src/app/blog/[slug]/page.tsx`| Artigo individual                     |
| `/contato`   | `src/app/contato/page.tsx`     | Formulário de contato funcional       |

---

## 7. Como Personalizar

### Alterar conteúdo da Home e Serviços

- **Home**: edite `src/app/page.tsx` — textos da hero, cards dos pilares, diferenciais
- **Serviços**: edite `src/app/servicos/page.tsx` — arrays `servicosFinancas`, `servicosAutomacoes`, `servicosSites`
- **Projetos**: edite `src/app/projetos/page.tsx` — array `projetos`

### Alterar número do WhatsApp

Edite `src/components/WhatsAppButton.tsx`:
```tsx
const phone = "5511999999999" // seu número com DDD
```

### Adicionar artigo ao blog

Crie um arquivo `.md` em `src/posts/`:

```markdown
---
title: "Título do artigo"
date: "2026-06-15"
description: "Descrição curta para listagem."
tags: ["Finanças", "IA"]
---

Conteúdo do artigo em markdown...
```

---

## 8. Deploy

### Vercel (recomendado)

```bash
npx vercel --prod
```

### Build local

```bash
npm run build && npm start
```

---

## 9. Observações Técnicas

- Projeto usa **Next.js 16** com **App Router** e **Turbopack**
- Componentes são **Server Components** por padrão; interativos usam `'use client'`
- O formulário de contato usa **Server Actions** (`useActionState`) + **Nodemailer**
- Blog usa **markdown** com `gray-matter` + `remark`
- Tailwind CSS v4 usa `@theme inline` em vez de `tailwind.config.js`
- As variáveis de ambiente `EMAIL_*` devem estar configuradas para o formulário funcionar
