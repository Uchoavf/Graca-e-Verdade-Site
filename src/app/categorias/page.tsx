import Link from "next/link";
import { getCategories } from "@/lib/posts";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <section className="mb-12 sm:mb-16">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent">
          Categorias
        </span>
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground tracking-tight">
          Explore por tema
        </h1>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          Navegue pelos artigos organizados por categorias temáticas.
        </p>
      </section>

      {categories.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all hover:border-border-hover hover:shadow-lg animate-scale-in"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/8 text-accent">
                <svg
                  className="h-7 w-7"
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
              <h2 className="mb-2 text-xl font-bold font-serif text-card-foreground group-hover:text-accent transition-colors capitalize">
                {cat.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {cat.count} {cat.count === 1 ? "artigo" : "artigos"}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-16 text-center animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground">Em breve</h3>
          <p className="mt-1 text-sm text-muted-foreground">As categorias de artigos estão sendo preparadas.</p>
        </div>
      )}
    </div>
  );
}
