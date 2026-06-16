import Link from "next/link";
import type { PostData } from "@/lib/posts";

interface ArticleCardProps {
  post: PostData;
  variant?: "default" | "featured" | "compact";
}

const CATEGORY_COLORS: Record<string, string> = {
  teologia: "bg-rose-50 text-rose-700",
  "vida-crista": "bg-emerald-50 text-emerald-700",
  devocional: "bg-amber-50 text-amber-700",
  apologetica: "bg-sky-50 text-sky-700",
  "estudo-biblico": "bg-violet-50 text-violet-700",
  escatologia: "bg-orange-50 text-orange-700",
  geral: "bg-neutral-100 text-neutral-600",
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS["geral"];
}

export default function ArticleCard({
  post,
  variant = "default",
}: ArticleCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-border-hover hover:shadow-md animate-scale-in"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getCategoryColor(post.category)}`}>
              {post.category.replace("-", " ")}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-card-foreground group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date + "T00:00:00").toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border-hover hover:shadow-lg animate-slide-up"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-accent/8 via-muted to-muted flex items-center justify-center border-b border-border/50 relative overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <svg
              className="h-14 w-14 text-accent/25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className={`mb-3 inline-block self-start rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${getCategoryColor(post.category)}`}>
            {post.category.replace("-", " ")}
          </span>
          <h2 className="mb-2.5 text-xl font-bold text-card-foreground font-serif group-hover:text-accent transition-colors">
            {post.title}
          </h2>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
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
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-border-hover hover:shadow-md animate-slide-up"
    >
      <span className={`mb-3 inline-block self-start rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${getCategoryColor(post.category)}`}>
        {post.category.replace("-", " ")}
      </span>
      <h2 className="mb-2.5 text-lg font-bold text-card-foreground font-serif group-hover:text-accent transition-colors">
        {post.title}
      </h2>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {post.description}
      </p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
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
    </Link>
  );
}
