import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-foreground font-serif" aria-label="Graça & Verdade — Início">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10">
                <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              Graça &amp; Verdade
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Artigos para edificação da fé, estudo das Escrituras e crescimento espiritual.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
              Navegação
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Início</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Artigos</Link>
              <Link href="/categorias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categorias</Link>
              <Link href="/biblia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bíblia</Link>
              <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</Link>
              <Link href="/loja" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Loja</Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
              Palavra
            </h3>
            <blockquote className="border-l-2 border-accent/40 pl-4 text-sm italic text-muted-foreground leading-relaxed">
              &quot;E conhecerão a verdade, e a verdade os libertará.&quot;
              <span className="mt-2 block text-xs not-italic text-muted-foreground/60">
                João 8:32
              </span>
            </blockquote>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Graça &amp; Verdade. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            <Link href="/contato" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
