import Link from "next/link";
import { getFeaturedPosts, getRecentPosts, getCategories } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();
  const recentPosts = await getRecentPosts(6);
  const categories = await getCategories();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/80 via-background to-background">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-amber-500/[0.03] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 md:py-36">
          <div className="mx-auto max-w-3xl text-center animate-slide-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 sm:px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Novo artigo publicado
            </div>
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-serif text-foreground text-balance leading-[1.05]">
              Graça &amp; Verdade
            </h1>
            <p className="mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed text-muted-foreground text-balance max-w-2xl mx-auto">
              Artigos profundos sobre a Bíblia, teologia e vida cristã. Um espaço para estudar as Escrituras, crescer na fé e conhecer a verdade que liberta.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog"
                className="rounded-full bg-accent px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-all shadow-sm"
              >
                Explorar artigos
              </Link>
              <Link
                href="/sobre"
                className="rounded-full border border-border bg-card px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-sm"
              >
                Sobre o projeto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-10 sm:mb-14">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
              Destaques
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-foreground tracking-tight">
              Artigos em destaque
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-10 sm:mb-14">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
              Temas
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-foreground tracking-tight">
              Explore por categoria
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-border-hover hover:shadow-md animate-scale-in"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/8 text-accent">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-accent transition-colors capitalize text-sm">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cat.count} {cat.count === 1 ? "artigo" : "artigos"}
                  </p>
                </div>
                <svg
                  className="h-4 w-4 text-muted-foreground/20 group-hover:text-accent/50 transition-colors shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10 sm:mb-14">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
            Recentes
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-foreground tracking-tight">
            Últimos artigos
          </h2>
        </div>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recentPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
        {recentPosts.length >= 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all shadow-sm"
            >
              Ver todos os artigos
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Versículo */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <blockquote className="text-xl sm:text-2xl md:text-3xl italic leading-relaxed text-muted-foreground font-serif">
            &quot;Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.&quot;
          </blockquote>
          <cite className="mt-4 block text-sm font-medium text-accent not-italic tracking-wide">
            Salmos 119:105
          </cite>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-24">
        <NewsletterCTA />
      </section>
    </div>
  );
}
