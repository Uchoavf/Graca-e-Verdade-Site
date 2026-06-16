'use client'

export default function NewsletterCTA() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/6 via-accent/10 to-accent/5 border border-border p-10 sm:p-14 text-center">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative">
        <svg
          className="mx-auto mb-4 h-9 w-9 text-accent/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <h2 className="mb-3 text-2xl font-bold font-serif text-foreground tracking-tight">
          Receba novos artigos
        </h2>
        <p className="mb-6 max-w-md mx-auto text-sm leading-relaxed text-muted-foreground">
          Inscreva-se para receber estudos bíblicos, devocionais e reflexões diretamente na sua caixa de entrada.
        </p>
        <form
          className="mx-auto flex max-w-md flex-col gap-2.5 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Seu melhor e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Seu melhor e-mail"
            required
            className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/40 focus:outline-none focus:ring-3 focus:ring-accent/10 transition-all"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-all shadow-sm"
          >
            Inscrever-se
          </button>
        </form>
      </div>
    </section>
  );
}
