import BibleReader from "@/components/BibleSearch";

export const metadata = {
  title: "Bíblia Online",
  description: "Busque versículos na Bíblia Almeida Corrigida Fiel (ACF).",
};

export default function BibliaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
      <section className="mb-10 sm:mb-14">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Bíblia
        </span>
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground tracking-tight">
          Bíblia Online
        </h1>
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          Leia a Bíblia Sagrada online. Selecione um livro e capítulo, ou busque
          por referência (ex: &quot;João 3:16&quot;) ou palavra-chave.
          Tradução Almeida Corrigida Fiel (ACF).
        </p>
      </section>

      <BibleReader />

      <div className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="mb-3 text-lg font-bold font-serif text-foreground">
          Dicas de busca
        </h2>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Referência exata:</strong>{" "}
            &quot;João 3:16&quot;, &quot;Salmos 23&quot;, &quot;Gênesis 1&quot;
          </li>
          <li>
            <strong className="text-foreground">Abreviações:</strong>{" "}
            &quot;Jo 3:16&quot;, &quot;Sl 23&quot;, &quot;Gn 1:1&quot;
          </li>
          <li>
            <strong className="text-foreground">Termos:</strong>{" "}
            &quot;amor&quot;, &quot;graça&quot;, &quot;salvação&quot;
          </li>
          <li>
            <strong className="text-foreground">Sem acentos:</strong>{" "}
            funciona com ou sem acentuação
          </li>
        </ul>
      </div>
    </div>
  );
}
