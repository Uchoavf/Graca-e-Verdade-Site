'use client'

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-serif text-base sm:text-lg font-bold text-foreground" aria-label="Graça & Verdade — Início">
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-accent/10">
            <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
          <span className="hidden sm:inline">Graça &amp; Verdade</span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-2">
          <ThemeToggle />

          <button
            className="block md:hidden rounded-lg p-3 text-muted-foreground hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 w-full md:w-auto flex-col md:flex-row items-stretch md:items-center gap-0.5 bg-background/95 md:bg-transparent p-3 md:p-0 border-b md:border-0 border-border backdrop-blur-xl shadow-lg md:shadow-none`}>
          {[
            { href: '/', label: 'Início' },
            { href: '/blog', label: 'Artigos' },
            { href: '/categorias', label: 'Categorias' },
            { href: '/biblia', label: 'Bíblia' },
            { href: '/sobre', label: 'Sobre' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-4 py-3 md:py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px] md:min-h-0 flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/loja"
            className="rounded-full bg-accent px-5 py-3 md:py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-all shadow-sm min-h-[44px] md:min-h-0 flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Loja
          </Link>
        </nav>
      </div>
    </header>
  );
}
