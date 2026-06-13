import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getSortedPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getSortedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/blog"
        className="mb-8 inline-flex text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        &larr; Voltar ao blog
      </Link>

      <article>
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>

        <time
          dateTime={post.date}
          className="mb-8 block text-sm text-zinc-500 dark:text-zinc-400"
        >
          {new Date(post.date + "T00:00:00").toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>

        <div
          className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-li:text-zinc-600 dark:prose-li:text-zinc-400 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm dark:prose-code:bg-zinc-800 prose-pre:rounded-xl prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
