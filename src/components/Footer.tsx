import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground font-serif" aria-label="Graça & Verdade - Início">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Graça &amp; Verdade
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Artigos para edificação da fé, estudo das Escrituras e crescimento espiritual.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navegação
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Início</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Artigos</Link>
              <Link href="/categorias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categorias</Link>
              <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</Link>
              <Link href="/loja" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Loja</Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Palavra
            </h3>
            <blockquote className="border-l-2 border-accent pl-4 text-sm italic text-muted-foreground leading-relaxed">
              &quot;E conhecerão a verdade, e a verdade os libertará.&quot;
              <span className="mt-1 block text-xs not-italic text-muted-foreground">— João 8:32</span>
            </blockquote>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Graça &amp; Verdade. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors" aria-label="YouTube">
              YouTube
            </a>
            <Link href="/contato" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
