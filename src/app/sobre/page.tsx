export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <section className="mb-16 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Sobre
        </span>
        <h1 className="mb-4 text-4xl font-bold font-serif text-foreground sm:text-5xl">
          Sobre o Graça &amp; Verdade
        </h1>
      </section>

      <div className="prose space-y-8">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="mt-0 text-2xl font-serif">Nossa Missão</h2>
          <p>
            O <strong>Graça &amp; Verdade</strong> nasceu do desejo de compartilhar
            o conhecimento das Escrituras de forma acessível, profunda e edificante.
            Acreditamos que a Bíblia é a Palavra viva de Deus, relevante para todas
            as áreas da vida.
          </p>
          <p>
            Nosso nome é inspirado em João 1:17:{" "}
            <em>&quot;Porque a lei foi dada por intermédio de Moisés; a graça e a verdade vieram por meio de Jesus Cristo.&quot;</em>
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="mt-0 text-2xl font-serif">O Que Você Encontra Aqui</h2>
          <ul className="space-y-3">
            <li>
              <strong>Estudos bíblicos profundos</strong> — análises de livros,
              personagens e temas das Escrituras
            </li>
            <li>
              <strong>Reflexões devocionais</strong> — para alimentar sua vida
              espiritual diária
            </li>
            <li>
              <strong>Artigos teológicos</strong> — sobre doutrinas fundamentais
              da fé cristã
            </li>
            <li>
              <strong>Recursos e livros</strong> — materiais selecionados para
              aprofundamento (em breve)
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="mt-0 text-2xl font-serif">Nossos Valores</h2>
          <div className="grid gap-6 sm:grid-cols-3 mt-6">
            <div className="text-center">
              <div className="mb-3 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground">Fidelidade Bíblica</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Compromisso com a interpretação fiel das Escrituras
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground">Amor e Graça</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tudo o que fazemos é motivado pelo amor de Deus
              </p>
            </div>
            <div className="text-center">
              <div className="mb-3 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground">Acessibilidade</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Linguagem clara para todos os níveis de conhecimento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
