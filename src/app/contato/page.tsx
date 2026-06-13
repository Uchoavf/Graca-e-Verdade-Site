'use client'

import { useActionState } from 'react'
import { enviarContato } from '@/actions/contato'

export default function Contato() {
  const [state, formAction, pending] = useActionState(enviarContato, null)

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Contato</h1>
      <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
        Tem um projeto em mente? Vamos conversar.
      </p>

      <div className="grid gap-12 lg:grid-cols-2">
        <form action={formAction} className="flex flex-col gap-6">
          <div>
            <label htmlFor="nome" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-400"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-400"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="mensagem" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              rows={5}
              className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-emerald-400"
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
            className="self-start rounded-full bg-emerald-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500 dark:text-zinc-900 dark:hover:bg-emerald-400"
          >
            {pending ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Email</h2>
            <a href="mailto:contato@ewerton.dev" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
              contato@ewerton.dev
            </a>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Redes</h2>
            <div className="flex flex-col gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
