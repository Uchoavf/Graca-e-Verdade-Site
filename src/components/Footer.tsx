export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} Ewerton. Todos os direitos reservados.
          {" "}&middot;{" "}
          <a href="https://meu-site-seven-cyan.vercel.app" className="hover:text-zinc-700 dark:hover:text-zinc-300">
            meu-site-seven-cyan.vercel.app
          </a>
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/Uchoavf" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
            GitHub
          </a>
          <a href="https://instagram.com/uchoavf" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
            Instagram
          </a>
          <a href="/contato" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
            Contato
          </a>
        </div>
      </div>
    </footer>
  )
}
