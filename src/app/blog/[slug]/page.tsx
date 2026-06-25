import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getSortedPosts, getRecentPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import GiscusComments from "@/components/GiscusComments";
import { getCategoryColor } from "@/lib/constants";

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

  const ogImage = post.image
    ? { url: post.image, width: 1200, height: 630, alt: post.title }
    : undefined;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "pt_BR",
      publishedTime: post.date,
      tags: post.tags,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImage ? [ogImage.url] : [],
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
    <article className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-24">
      <ReadingProgress />

      {post.image && (
        <div className="mb-10 overflow-hidden rounded-2xl border border-border shadow-md animate-fade-in">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[2/1] object-cover"
          />
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: post.image ?? undefined,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Graça & Verdade",
              logo: {
                "@type": "ImageObject",
                url: "https://gracaeverdade.com.br/favicon.svg",
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: "https://gracaeverdade.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://gracaeverdade.com.br/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
              },
            ],
          }),
        }}
      />

      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group animate-fade-in"
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Voltar aos artigos
      </Link>

      <header className="mb-14 border-b border-border pb-10 animate-slide-up">
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <Link
            href={`/categorias/${post.category}`}
            className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${getCategoryColor(post.category)}`}
          >
            {post.category.replace("-", " ")}
          </Link>
          {post.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-accent/8 px-2.5 py-1 text-[11px] font-semibold text-accent">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568L24 9.306l-6.064 5.828 1.48 8.279L12 19.447l-7.416 3.966 1.48-8.279L0 9.306l8.332-1.151z" />
              </svg>
              Destaque
            </span>
          )}
        </div>

        <h1 className="mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-foreground text-balance leading-[1.15] tracking-tight">
          {post.title}
        </h1>

        <p className="mb-6 text-base sm:text-lg leading-relaxed text-muted-foreground font-serif italic">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{post.author}</span>
          <span aria-hidden="true" className="text-muted-foreground/30">&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date + "T00:00:00").toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {post.readingTime && (
            <>
              <span aria-hidden="true" className="text-muted-foreground/30">&middot;</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${getCategoryColor(tag)}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose mb-20 animate-fade-in"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="mb-20 rounded-xl border border-border bg-muted/30 p-5">
        <ShareButtons title={post.title} slug={post.slug} />
      </div>

      {relatedPosts.length > 0 && (
        <section className="mb-20 border-t border-border pt-14">
          <h2 className="mb-8 text-2xl font-bold font-serif text-foreground tracking-tight">
            Artigos relacionados
          </h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {relatedPosts.map((p) => (
              <ArticleCard key={p.slug} post={p} variant="compact" />
            ))}
          </div>
        </section>
      )}

      <GiscusComments />

      <NewsletterCTA />
    </article>
  );
}
