import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getSortedPosts, getRecentPosts } from "@/lib/posts";
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

export async function generateStaticParams() {
  const posts = await getSortedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      authors: [post.author],
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = (await getRecentPosts(4)).filter(
    (p) => p.slug !== slug
  ).slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Voltar aos artigos
      </Link>

      <header className="mb-12 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Link
            href={`/categorias/${post.category}`}
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getColor(post.category)}`}
          >
            {post.category.replace("-", " ")}
          </Link>
          {post.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568L24 9.306l-6.064 5.828 1.48 8.279L12 19.447l-7.416 3.966 1.48-8.279L0 9.306l8.332-1.151z" />
              </svg>
              Destaque
            </span>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold font-serif text-foreground sm:text-4xl lg:text-5xl text-balance">
          {post.title}
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{post.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date + "T00:00:00").toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {post.readingTime && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`rounded-full px-3 py-1 text-xs font-medium ${getColor(tag)}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose mb-16"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Share */}
      <div className="mb-16 flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
        <span className="text-sm font-medium text-muted-foreground">
          Compartilhar:
        </span>
        <button className="rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-foreground border border-border hover:bg-muted transition-colors">
          Copiar link
        </button>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mb-16 border-t border-border pt-12">
          <h2 className="mb-8 text-2xl font-bold font-serif text-foreground">
            Artigos relacionados
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedPosts.map((p) => (
              <ArticleCard key={p.slug} post={p} variant="compact" />
            ))}
          </div>
        </section>
      )}

      <NewsletterCTA />
    </article>
  );
}
