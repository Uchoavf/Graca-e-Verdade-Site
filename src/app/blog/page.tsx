import Link from "next/link";
import { getSortedPosts, getCategories, getAllTags } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";

const CATEGORY_COLORS: Record<string, string> = {
  teologia: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "vida-crista": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  devocional: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  apologetica: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "estudo-biblico": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  escatologia: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  geral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

function getColor(c: string) {
  return CATEGORY_COLORS[c] || CATEGORY_COLORS["geral"];
}

export default async function Blog() {
  const posts = await getSortedPosts();
  const categories = await getCategories();
  const tags = await getAllTags();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <section className="mb-16 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Artigos
        </span>
        <h1 className="mb-4 text-4xl font-bold font-serif text-foreground sm:text-5xl">
          Todos os artigos
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
          Explore nossa coleção de estudos bíblicos, reflexões devocionais e
          artigos teológicos para edificação da sua fé.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div>
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="text-lg font-semibold text-foreground">Em breve</h3>
              <p className="mt-1 text-sm text-muted-foreground">Os primeiros artigos estão sendo preparados.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {categories.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Categorias
              </h3>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categorias/${cat.slug}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors capitalize"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-muted-foreground/60">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {tags.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/blog?tag=${tag.name}`}
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getColor(tag.name)}`}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Loja
            </h3>
            <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
              Conheça nossa seleção de livros e recursos para o seu crescimento espiritual.
            </p>
            <Link
              href="/loja"
              className="inline-block w-full rounded-full bg-accent px-4 py-2.5 text-center text-xs font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Visitar loja
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-20">
        <NewsletterCTA />
      </div>
    </div>
  );
}
