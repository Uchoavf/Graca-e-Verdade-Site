type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  link?: string
}

export default function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
