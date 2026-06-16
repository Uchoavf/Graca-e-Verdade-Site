'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground" aria-label="Graça & Verdade - Início">
          <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="font-serif">Graça &amp; Verdade</span>
        </Link>

        <button
          className="block sm:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className={`${menuOpen ? 'flex' : 'hidden'} sm:flex absolute sm:static top-16 left-0 w-full sm:w-auto flex-col sm:flex-row items-center gap-6 bg-background sm:bg-transparent p-6 sm:p-0 border-b sm:border-0 border-border`}>
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Início
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Artigos
          </Link>
          <Link href="/categorias" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Categorias
          </Link>
          <Link href="/sobre" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Sobre
          </Link>
          <Link href="/loja" className="text-sm font-medium text-accent-foreground bg-accent px-4 py-2 rounded-full hover:opacity-90 transition-opacity" onClick={() => setMenuOpen(false)}>
            Loja
          </Link>
        </nav>
      </div>
    </header>
  )
}
