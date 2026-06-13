import Link from "next/link";

export default function Servicos() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Serviços</h1>
      <p className="mb-16 text-lg text-zinc-600 dark:text-zinc-400">
        Soluções completas combinando finanças, automação e tecnologia.
      </p>

      {/* Finanças */}
      <section className="mb-20">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Finanças</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {servicosFinancas.map((s) => (
            <div key={s.titulo} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">{s.titulo}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Automações */}
      <section className="mb-20">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m-4.993 0h4.992" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Automações</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {servicosAutomacoes.map((s) => (
            <div key={s.titulo} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">{s.titulo}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sites */}
      <section className="mb-20">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Criação de Sites</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {servicosSites.map((s) => (
            <div key={s.titulo} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">{s.titulo}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
        <h2 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Não encontrou o que precisa?
        </h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Cada projeto é único. Entre em contato e vamos conversar sobre a solução ideal para você.
        </p>
        <Link
          href="/contato"
          className="inline-flex rounded-full bg-emerald-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-zinc-900 dark:hover:bg-emerald-400"
        >
          Fale comigo
        </Link>
      </div>
    </div>
  );
}

const servicosFinancas = [
  {
    titulo: "Consultoria financeira",
    descricao: "Análise de saúde financeira pessoal ou empresarial, com diagnóstico e plano de ação.",
  },
  {
    titulo: "Projeções e valuation",
    descricao: "Modelagem financeira, fluxo de caixa descontado, valuation de empresas e cenários.",
  },
  {
    titulo: "Planilhas inteligentes",
    descricao: "Planilhas automatizadas com fórmulas avançadas, macros e dashboards visuais.",
  },
  {
    titulo: "Relatórios gerenciais",
    descricao: "Relatórios financeiros automatizados com indicadores, gráficos e análises prontas.",
  },
];

const servicosAutomacoes = [
  {
    titulo: "Automação de processos",
    descricao: "Identificação e automatização de tarefas repetitivas com scripts e ferramentas inteligentes.",
  },
  {
    titulo: "Dashboards automatizados",
    descricao: "Painéis de controle que atualizam dados automaticamente de múltiplas fontes.",
  },
  {
    titulo: "Bots e web scraping",
    descricao: "Captura de dados da web, processamento automatizado e integração com planilhas.",
  },
  {
    titulo: "IA para negócios",
    descricao: "Aplicação de inteligência artificial para análise de dados, previsões e otimização.",
  },
];

const servicosSites = [
  {
    titulo: "Sites institucionais",
    descricao: "Sites profissionais para empresas e profissionais liberais, com design moderno e responsivo.",
  },
  {
    titulo: "Landing pages",
    descricao: "Páginas de conversão otimizadas para capturar leads e vender produtos ou serviços.",
  },
  {
    titulo: "Blogs e portais",
    descricao: "Blogs com sistema de artigos, categorias e SEO otimizado para ranquear no Google.",
  },
  {
    titulo: "Manutenção e SEO",
    descricao: "Atualização contínua, otimização de performance e estratégias de SEO para sites existentes.",
  },
];
