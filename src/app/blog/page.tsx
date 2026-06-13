import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export default async function Blog() {
  const posts = await getSortedPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
      <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
        Artigos sobre desenvolvimento web, tecnologia e projetos.
      </p>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <time dateTime={post.date}>
                  {new Date(post.date + "T00:00:00").toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
