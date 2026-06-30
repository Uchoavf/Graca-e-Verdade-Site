import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByCategory, getCategories } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <Link
        href="/categorias"
        className="mb-8 sm:mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Todas as categorias
      </Link>

      <section className="mb-12 sm:mb-16">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Categoria
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground tracking-tight capitalize">
          {category?.name ?? slug.replace("-", " ")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {posts.length} {posts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-16 text-center animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground">Nenhum artigo ainda</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ainda não há artigos publicados nesta categoria.</p>
          <Link href="/blog" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
            Ver todos os artigos
          </Link>
        </div>
      )}
    </div>
  );
}
