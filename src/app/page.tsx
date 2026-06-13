import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="flex min-h-[85vh] flex-col justify-center py-20">
        <p className="mb-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          Economista & Desenvolvedor
        </p>
        <h1 className="mb-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Finanças, automação e tecnologia em um só lugar
        </h1>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Sou economista com domínio de finanças, automação de processos e
          desenvolvimento web. Uso IA e tecnologia para entregar soluções
          inteligentes e resultados reais.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/servicos"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-zinc-900 dark:hover:bg-emerald-400"
          >
            Ver serviços
          </Link>
          <Link
            href="/contato"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
          >
            Entrar em contato
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">O que eu faço</h2>
        <p className="mb-12 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Três pilares que se complementam para resolver problemas reais.
        </p>

        <div className="grid gap-8 sm:grid-cols-3">
          <div className="group rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-emerald-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Finanças</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Análise financeira, projeções, valuation, planilhas inteligentes e
              consultoria para pessoas e empresas.
            </p>
          </div>

          <div className="group rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-purple-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-purple-700">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m-4.993 0h4.992" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Automações</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Automação de processos, bots, dashboards, integração de sistemas
              e scripts inteligentes com IA.
            </p>
          </div>

          <div className="group rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Sites</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Criação de sites modernos, rápidos e otimizados para SEO. Do
              portfólio pessoal ao site institucional.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">Por que trabalhar comigo?</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Visão analítica</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Minha formação em economia me dá base sólida para analisar dados,
                modelar cenários e tomar decisões orientadas a resultados.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Tecnologia com IA</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Uso inteligência artificial para acelerar entregas, automatizar
                processos e criar soluções mais eficientes.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Comunicação clara</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Traduzo problemas complexos em soluções simples. Você entende
                cada etapa do processo, sem jargões desnecessários.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Entrega de ponta a ponta</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Da análise inicial ao deploy. Cuido de todas as etapas para você
                focar no que realmente importa: seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
