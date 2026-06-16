import Link from "next/link";

const PRODUCTS = [
  {
    name: "Bíblia de Estudo",
    description: "Bíblia com comentários, mapas e referências cruzadas para estudo aprofundado.",
    price: "R$ 89,90",
    link: "#",
  },
  {
    name: "Fundamentos da Fé",
    description: "Um guia essencial para novos convertidos e estudiosos das Escrituras.",
    price: "R$ 39,90",
    link: "#",
  },
  {
    name: "Devocional Diário",
    description: "365 reflexões para alimentar sua vida espiritual todos os dias.",
    price: "R$ 49,90",
    link: "#",
  },
  {
    name: "Curso de Teologia",
    description: "Aprenda teologia no seu ritmo com conteúdo acessível e profundo.",
    price: "R$ 197,00",
    link: "#",
  },
  {
    name: "Caderno de Estudos",
    description: "Caderno pautado com guias de estudo e espaço para anotações.",
    price: "R$ 29,90",
    link: "#",
  },
  {
    name: "Kit Livros dos Profetas",
    description: "Coleção de estudos sobre os profetas maiores e menores.",
    price: "R$ 69,90",
    link: "#",
  },
];

export default function StorePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <section className="mb-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
          <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Em breve &mdash; Programa de afiliados
        </div>
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Loja
        </span>
        <h1 className="mb-4 text-4xl font-bold font-serif text-foreground sm:text-5xl tracking-tight">
          Recursos para sua jornada
        </h1>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          Livros, cursos e materiais selecionados para aprofundar seu conhecimento bíblico e crescimento espiritual.
        </p>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-24">
        {PRODUCTS.map((product) => (
          <Link
            key={product.name}
            href={product.link}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-border-hover hover:shadow-lg animate-scale-in"
          >
            <div className="mb-5 flex h-40 items-center justify-center rounded-xl bg-muted">
              <svg
                className="h-12 w-12 text-muted-foreground/15"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-lg font-bold font-serif text-card-foreground group-hover:text-accent transition-colors">
              {product.name}
            </h2>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-accent">
                {product.price}
              </span>
              <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground group-hover:opacity-90 transition-all shadow-sm">
                Ver detalhes
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/4 to-accent/8 p-10 sm:p-14 text-center">
        <h2 className="mb-4 text-2xl font-bold font-serif text-foreground tracking-tight">
          Programa de afiliados
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Em breve, você poderá recomendar nossos produtos e receber comissões
          por cada venda realizada através do seu link.
        </p>
        <button
          type="button"
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-all shadow-sm"
        >
          Quero ser afiliado
        </button>
      </div>
    </div>
  );
}
