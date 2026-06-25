import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 sm:px-6 text-center">
      <span className="mb-4 text-5xl sm:text-6xl md:text-8xl font-bold font-serif text-accent/30">
        404
      </span>
      <h1 className="mb-3 text-xl sm:text-2xl md:text-3xl font-bold font-serif text-foreground">
        Página não encontrada
      </h1>
      <p className="mb-8 max-w-sm sm:max-w-md text-muted-foreground leading-relaxed">
        O caminho que você procura pode ter mudado, mas a Palavra de Deus permanece para sempre.
      </p>
      <blockquote className="mb-10 max-w-lg italic text-muted-foreground font-serif text-base sm:text-lg leading-relaxed">
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
