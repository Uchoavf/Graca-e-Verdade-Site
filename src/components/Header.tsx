'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Ewerton<span className="text-emerald-600 dark:text-emerald-400">.</span>
        </Link>

        <button
          className="block sm:hidden p-2 text-zinc-700 dark:text-zinc-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className={`${menuOpen ? 'flex' : 'hidden'} sm:flex absolute sm:static top-16 left-0 w-full sm:w-auto flex-col sm:flex-row items-center gap-6 bg-white sm:bg-transparent p-6 sm:p-0 border-b sm:border-0 border-zinc-200 dark:bg-black dark:sm:bg-transparent dark:border-zinc-800`}>
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50" onClick={() => setMenuOpen(false)}>
            Início
          </Link>
          <Link href="/servicos" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50" onClick={() => setMenuOpen(false)}>
            Serviços
          </Link>
          <Link href="/projetos" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50" onClick={() => setMenuOpen(false)}>
            Projetos
          </Link>
          <Link href="/blog" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/contato" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50" onClick={() => setMenuOpen(false)}>
            Contato
          </Link>
        </nav>
      </div>
    </header>
  )
}
