# Guia de Deploy — Graça & Verdade

> Passo a passo seguro para colocar o site no ar na Vercel.

---

## Índice

1. [Antes de publicar — checklist de segurança](#1-antes-de-publicar--checklist-de-segurança)
2. [Medidas de proteção já implementadas](#2-medidas-de-proteção-já-implementadas)
3. [Subir o código para o GitHub](#3-subir-o-código-para-o-github)
4. [Conectar à Vercel e fazer deploy](#4-conectar-à-vercel-e-fazer-deploy)
5. [Configurar domínio personalizado (opcional)](#5-configurar-domínio-personalizado)
6. [Verificações pós-deploy](#6-verificações-pós-deploy)
7. [Manutenção contínua](#7-manutenção-contínua)
8. [Plano de contingência](#8-plano-de-contingência)

---

## 1. Antes de publicar — checklist de segurança

Antes de fazer o deploy, execute estas verificações no seu computador local:

```bash
# 1. Testar build de produção
npm run build

# 2. Rodar lint (deve retornar 0 erros)
npm run lint

# 3. Verificar se variáveis de ambiente estão no .env.example
cat .env.example

# 4. Verificar que o .gitignore protege:
#    - .env (senhas)
#    - /data/ (emails da newsletter)
#    - node_modules/
cat .gitignore

# 5. Verificar se NÃO há segredos no código
grep -r "ghp_\|sk-\|API_KEY\|password" src/ --include="*.ts" --include="*.tsx"
```

### O que NUNCA commitar

| Tipo de dado | Onde fica | Risco |
|---|---|---|
| Senha de app do Gmail | `.env` → nunca commitado | 🔴 Acesso ao email |
| Token do GitHub (`ghp_*`) | `.env` / keyring | 🔴 Acesso aos repositórios |
| Chaves de API (Mailchimp, etc.) | `.env` | 🔴 Uso indevido/cobrança |
| Lista de emails da newsletter | `/data/` → gitignored | 🔴 Vazamento de dados (LGPD) |

---

## 2. Medidas de proteção já implementadas

### 2.1 Proteção contra bots e spam

| Proteção | Como funciona | Arquivo |
|---|---|---|
| **Rate limiting — newsletter** | Máx 5 inscrições por IP a cada 1 minuto | `src/lib/rate-limit.ts` + `api/newsletter/route.ts` |
| **Rate limiting — contato** | Máx 3 envios por IP a cada 15 minutos | `src/lib/rate-limit.ts` + `actions/contato.ts` |
| **Honeypot (contato)** | Campo invisível que bots preenchem; se preenchido, formulário é descartado silenciosamente | `actions/contato.ts` + `contato/page.tsx` |
| **Validação de email** | Regex completa + limite de 320 caracteres | `api/newsletter/route.ts` |
| **Validação de campos** | Trim + limite de tamanho (nome: 100, email: 320, mensagem: 5000) | `actions/contato.ts` |

### 2.2 Proteção de dados

| Proteção | Implementação |
|---|---|
| **Emails da newsletter** | Salvos em `/data/newsletter.json` (gitignored, não versionado) |
| **Formulário de contato** | Dados enviados diretamente por email (não armazenados no servidor) |
| **IP dos usuários** | Usado apenas em memória para rate limiting (não armazenado em disco) |

### 2.3 Headers de segurança

Configurados em `next.config.ts`:

| Header | Valor | Proteção |
|---|---|---|
| `X-Frame-Options` | `DENY` | Impede que o site seja embutido em iframes (clickjacking) |
| `X-Content-Type-Options` | `nosniff` | Impede que o navegador adivinhe o tipo de conteúdo |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controla quanto da URL é enviada ao navegar para outros sites |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Bloqueia acesso a hardware do usuário |
| `X-XSS-Protection` | `0` | Desativa o filtro XSS legado do navegador (substituído por CSP) |

### 2.4 Práticas de código seguro

- **Server Actions** do Next.js têm proteção CSRF built-in
- **`dangerouslySetInnerHTML`** usado apenas para conteúdo controlado (Markdown processado por remark)
- **Nodemailer** com autenticação SMTP (não envia sem credenciais)
- **Sem banco de dados** — ataque de injeção SQL não se aplica

---

## 3. Subir o código para o GitHub

```bash
# 1. Verificar o que mudou
git status

# 2. Adicionar todos os arquivos (exceto os ignorados)
git add .

# 3. Verificar se nenhum segredo será commitado
git diff --cached --name-only | grep -E "\.env$|\.env.local$|data/"

# 4. Commit com mensagem descritiva
git commit -m "segurança: rate limiting, honeypot, headers, newsletter real"

# 5. Push para o GitHub
git push origin main
```

> Se o repositório remoto ainda não estiver configurado:
> ```bash
> git remote add origin git@github.com:Uchoavf/Graca-e-Verdade-Site.git
> git branch -M main
> git push -u origin main
> ```

---

## 4. Conectar à Vercel e fazer deploy

### 4.1 Criar conta na Vercel (se ainda não tiver)

1. Acesse https://vercel.com
2. Clique em **Sign Up** → **Continue with GitHub**
3. Autorize a Vercel a acessar seus repositórios

### 4.2 Importar o projeto

1. No dashboard da Vercel, clique em **Add New... → Project**
2. Selecione o repositório `Uchoavf/Graca-e-Verdade-Site`
3. A Vercel detecta automaticamente que é um projeto Next.js

### 4.3 Configurar variáveis de ambiente

Na tela de configuração do projeto, expanda **Environment Variables** e adicione:

| Nome | Valor | Onde conseguir |
|---|---|---|
| `EMAIL_HOST` | `smtp.gmail.com` | Fixo |
| `EMAIL_PORT` | `587` | Fixo |
| `EMAIL_USER` | `seu-email@gmail.com` | Seu email |
| `EMAIL_PASS` | `xxxx xxxx xxxx xxxx` | Senha de app do Gmail (16 caracteres, sem espaços) |
| `EMAIL_FROM` | `seu-email@gmail.com` | Mesmo do USER |
| `EMAIL_TO` | `seu-email@gmail.com` | Email que recebe as mensagens |

> **Como gerar senha de app do Gmail:**
> 1. https://myaccount.google.com/security
> 2. Ative **Verificação em duas etapas** (obrigatório)
> 3. Vá em **Senhas de app** (ou busque "app password")
> 4. Selecione app: "Email" → dispositivo: "Outro" → nome: "Vercel"
> 5. Copie os 16 caracteres (sem espaços) para `EMAIL_PASS`

### 4.4 Fazer o deploy

1. Clique em **Deploy**
2. Aguarde ~2 minutos
3. A Vercel fornecerá uma URL como `graca-e-verdade-site.vercel.app`
4. Clique para abrir e testar o site

---

## 5. Configurar domínio personalizado (opcional)

Se você tem o domínio `gracaeverdade.com.br`:

### 5.1 Adicionar domínio na Vercel

1. No projeto na Vercel, vá em **Settings → Domains**
2. Adicione `gracaeverdade.com.br`
3. A Vercel fornecerá os registros DNS que você precisa configurar

### 5.2 Configurar DNS no seu provedor

| Tipo | Nome | Valor |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

### 5.3 Forçar HTTPS

A Vercel gera certificados SSL automaticamente via Let's Encrypt. Após adicionar o domínio:
1. Aguarde a propagação DNS (até 48h, geralmente 5-30 minutos)
2. O certificado SSL é emitido automaticamente
3. Todo tráfego HTTP é redirecionado para HTTPS

---

## 6. Verificações pós-deploy

Após o deploy, faça estas verificações no site publicado:

### 6.1 Testes funcionais

| Teste | Como fazer | Resultado esperado |
|---|---|---|
| Página inicial | Abrir `/` | Hero, artigos, categorias, newsletter visíveis |
| Blog | Abrir `/blog` | Lista de 6 artigos com sidebar |
| Artigo | Abrir `/blog/o-que-e-a-graca-de-deus` | Artigo completo com share, comentários |
| Categorias | Abrir `/categorias` | 4 categorias com contagem |
| Contato | Preencher e enviar formulário | Mensagem enviada, email recebido |
| Newsletter | Inscrever email em `/` | Mensagem de sucesso |
| Página 404 | Abrir `/pagina-inexistente` | Página 404 com versículo |
| Tema escuro | Clicar no ícone de sol/lua | Alternar entre light/dark |
| Menu mobile | Reduzir tela < 768px | Menu hamburger aparece |
| HTTPS | Verificar cadeado no navegador | Conexão segura (HTTPS) |

### 6.2 Testes de segurança

```bash
# 1. Verificar headers de segurança
curl -I https://gracaeverdade.com.br | grep -E "X-Frame|X-Content|Referrer|Permission"

# 2. Testar rate limiting (enviar 6 requisições rápidas)
for i in $(seq 1 6); do
  curl -s -X POST https://gracaeverdade.com.br/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"teste@exemplo.com"}' | jq .
done
# A 6ª requisição deve retornar erro 429

# 3. Verificar SSL
curl -I https://gracaeverdade.com.br 2>&1 | grep -E "SSL|HTTP/2|200"
```

### 6.3 SEO

1. https://search.google.com/search-console — adicionar propriedade
2. Enviar `sitemap.xml` no Google Search Console
3. Testar dados estruturados: https://search.google.com/test/rich-results
4. Verificar meta tags com https://metatags.io

---

## 7. Manutenção contínua

### 7.1 Semanal

- Verificar se o formulário de contato está funcionando (enviar teste)
- Verificar logs da Vercel em **Project → Analytics → Logs**
- Responder emails de contato recebidos

### 7.2 Mensal

- Atualizar dependências: `npm update` + `npm run build` + commit + push
- Verificar se a lista de newsletter está crescendo em `/data/newsletter.json`
- Fazer backup manual da lista de emails (baixar da Vercel ou acessar via deploy)

### 7.3 Trimestral

- Revisar e rotacionar senha de app do Gmail
- Verificar se há novas vulnerabilidades: `npm audit`
- Testar o plano de contingência (seção 8)

### 7.4 Adicionar novos artigos

```bash
# 1. Criar arquivo .md em src/posts/
# 2. Preencher frontmatter YAML
# 3. Commit e push
git add src/posts/meu-novo-artigo.md
git commit -m "artigo: Meu Novo Artigo"
git push origin main
# A Vercel faz deploy automático
```

---

## 8. Plano de contingência

### Se o formulário de contato parar de funcionar

1. Verificar se `EMAIL_PASS` ainda é válida (senhas de app do Gmail expiram)
2. Gerar nova senha em https://myaccount.google.com/security
3. Atualizar a variável na Vercel: **Project → Settings → Environment Variables**
4. Fazer redeploy: **Deployments → ... → Redeploy**

### Se o site sair do ar

1. Verificar status da Vercel: https://vercel-status.com
2. Verificar logs de build na Vercel
3. Fazer rollback para o último deploy funcional: **Deployments → (último bom) → Promote to Production**

### Se houver vazamento de dados

1. Remover imediatamente as variáveis de ambiente da Vercel
2. Rotacionar todas as senhas (Gmail, GitHub)
3. Se emails da newsletter vazaram, notificar assinantes (obrigação LGPD)
4. Reportar à Vercel se o vazamento foi pela plataforma

---

## Resumo rápido

```bash
# 1. Testar localmente
npm run build && npm run lint

# 2. Commit e push
git add . && git commit -m "deploy: versão de produção" && git push

# 3. Vercel faz deploy automático
# 4. Acessar: https://graca-e-verdade-site.vercel.app
```

### Variáveis obrigatórias na Vercel

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app-16-caracteres
EMAIL_FROM=seu-email@gmail.com
EMAIL_TO=seu-email@gmail.com
```

---

Pronto! Seu site estará no ar com proteção contra spam, headers de segurança, formulário com honeypot e newsletter salvando emails.
