import Link from "next/link";
import { getSortedPosts, getCategories, getAllTags } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import { getCategoryColor } from "@/lib/constants";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const allPosts = await getSortedPosts();
  const categories = await getCategories();
  const tags = await getAllTags();
  const { tag } = await searchParams;

  const posts = tag
    ? allPosts.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
    : allPosts;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <section className="mb-12 sm:mb-16">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Artigos
        </span>
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground tracking-tight">
          {tag ? `Tag: ${tag}` : "Todos os artigos"}
        </h1>
        {tag ? (
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground leading-relaxed">
              {posts.length} {posts.length === 1 ? "artigo encontrado" : "artigos encontrados"} com esta tag.
            </p>
            <Link href="/blog" className="text-xs font-medium text-accent hover:underline">
              Limpar filtro
            </Link>
          </div>
        ) : (
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Explore nossa coleção de estudos bíblicos, reflexões devocionais e artigos teológicos.
          </p>
          )}
      </section>

      <div className="grid gap-8 md:gap-10 md:grid-cols-[1fr_240px]">
        <div>
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-16 text-center animate-fade-in">
              <svg className="mx-auto mb-4 h-12 w-12 text-muted-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="text-lg font-semibold text-foreground">Em breve</h3>
              <p className="mt-1 text-sm text-muted-foreground">Os primeiros artigos estão sendo preparados.</p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          {categories.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categorias
              </h3>
              <nav className="space-y-0.5">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categorias/${cat.slug}`}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors capitalize"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-muted-foreground/50 tabular-nums">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {tags.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/blog?tag=${tag.name}`}
                    className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-medium ${getCategoryColor(tag.name)}`}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Loja
            </h3>
            <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
              Livros e recursos para seu crescimento espiritual.
            </p>
            <Link
              href="/loja"
              className="inline-block w-full rounded-full bg-accent px-4 py-2.5 text-center text-xs font-semibold text-accent-foreground hover:opacity-90 transition-all shadow-sm"
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
