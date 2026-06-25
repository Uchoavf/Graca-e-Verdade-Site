'use client'

import { useActionState } from 'react'
import { enviarContato } from '@/actions/contato'

export default function Contato() {
  const [state, formAction, pending] = useActionState(enviarContato, null)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20">
      <section className="mb-10 sm:mb-12 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Contato
        </span>
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground">
          Entre em contato
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Tem dúvidas, sugestões ou gostaria de contribuir com o projeto? Envie sua mensagem.
        </p>
      </section>

      <div className="grid gap-8 md:gap-12 md:grid-cols-2">
        <form action={formAction} className="flex flex-col gap-6">
          <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ top: -9999, left: -9999 }}>
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="nome" className="mb-1 block text-sm font-medium text-foreground">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              maxLength={100}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={320}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="mensagem" className="mb-1 block text-sm font-medium text-foreground">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              maxLength={5000}
              rows={5}
              className="w-full resize-none rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
              placeholder="Sua mensagem..."
            />
          </div>

          {state?.error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
              {state.error}
            </p>
          )}

          {state?.success && (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              Mensagem enviada com sucesso! Entrarei em contato em breve.
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="self-start rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-foreground font-serif">Email</h2>
            <p className="text-muted-foreground text-sm">
              Preencha o formulário ao lado para entrar em contato.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold text-foreground font-serif">Redes Sociais</h2>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 p-6">
            <blockquote className="text-sm italic text-muted-foreground leading-relaxed">
              &quot;Ora, àquele que é poderoso para fazer infinitamente mais do que tudo quanto pedimos ou pensamos, conforme o seu poder que opera em nós, a ele seja a glória.&quot;
              <span className="mt-2 block text-xs not-italic text-muted-foreground">
                Efésios 3:20-21
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
