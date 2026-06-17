import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 text-6xl font-bold font-serif text-accent/30 sm:text-8xl">
        404
      </span>
      <h1 className="mb-3 text-2xl font-bold font-serif text-foreground sm:text-3xl">
        Página não encontrada
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">
        O caminho que você procura pode ter mudado, mas a Palavra de Deus permanece para sempre.
      </p>
      <blockquote className="mb-10 max-w-lg italic text-muted-foreground font-serif text-lg leading-relaxed">
        &quot;Passará o céu e a terra, porém as minhas palavras não passarão.&quot;
        <span className="mt-2 block text-sm not-italic text-muted-foreground/60">
          Mateus 24:35
        </span>
      </blockquote>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-all shadow-sm"
        >
          Voltar ao início
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-sm"
        >
          Ver artigos
        </Link>
      </div>
    </div>
  );
}
