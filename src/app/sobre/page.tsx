import Link from "next/link";

export default function Sobre() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Sobre mim</h1>
      <p className="mb-16 text-lg text-zinc-600 dark:text-zinc-400">
        Economista unindo finanças, tecnologia e inteligência artificial.
      </p>

      <div className="grid gap-16 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Quem sou eu</h2>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p>
                Sou economista de formação, apaixonado por números e tecnologia. Minha trajetória
                une o pensamento analítico das ciências econômicas com a prática do desenvolvimento
                web e automação de processos.
              </p>
              <p>
                Nos últimos anos venho mergulhando no universo da inteligência artificial aplicada
                a negócios — criando soluções que automatizam tarefas, geram insights e aumentam a
                produtividade de pessoas e empresas.
              </p>
              <p>
                Acredito que tecnologia só faz sentido quando resolve problemas reais. Por isso cada
                projeto começa com uma pergunta simples: como isso melhora a vida do cliente?
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Formação</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Graduação em Economia</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Bacharel em Ciências Econômicas</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Inteligência Artificial</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Projetos com IA aplicada a finanças e automação de processos</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Desenvolvimento Web</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Next.js, React, TypeScript e tecnologias modernas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Contato rápido</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a href="/contato" className="flex items-center gap-3 text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                Formulário de contato
              </a>
              <a href="https://github.com/Uchoavf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="https://instagram.com/uchoavf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>

          <Link
            href="/contato"
            className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-zinc-900 dark:hover:bg-emerald-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            Fale comigo
          </Link>
        </aside>
      </div>
    </div>
  );
}
