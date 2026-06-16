import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export type PostData = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  category: string
  author: string
  featured: boolean
  image?: string
  readingTime?: string
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes === 1 ? '1 min de leitura' : `${minutes} min de leitura`
}

export async function getSortedPosts(): Promise<PostData[]> {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        description: data.description ?? '',
        tags: data.tags ?? [],
        category: data.category ?? 'geral',
        author: data.author ?? 'Graça & Verdade',
        featured: data.featured ?? false,
        image: data.image ?? undefined,
        readingTime: data.readingTime ?? estimateReadingTime(content),
      }
    })

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getFeaturedPosts(): Promise<PostData[]> {
  const posts = await getSortedPosts()
  return posts.filter((post) => post.featured).slice(0, 4)
}

export async function getRecentPosts(count: number = 6): Promise<PostData[]> {
  const posts = await getSortedPosts()
  return posts.slice(0, count)
}

export async function getPostsByCategory(
  category: string
): Promise<PostData[]> {
  const posts = await getSortedPosts()
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export async function getCategories(): Promise<
  { name: string; slug: string; count: number }[]
> {
  const posts = await getSortedPosts()
  const categoryMap = new Map<string, number>()

  for (const post of posts) {
    const cat = post.category.toLowerCase()
    categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + 1)
  }

  return Array.from(categoryMap.entries())
    .map(([slug, count]) => ({
      name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
      slug,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const posts = await getSortedPosts()
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getAllTags(): Promise<
  { name: string; count: number }[]
> {
  const posts = await getSortedPosts()
  const tagMap = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase()
      tagMap.set(key, (tagMap.get(key) ?? 0) + 1)
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    category: data.category ?? 'geral',
    author: data.author ?? 'Graça & Verdade',
    featured: data.featured ?? false,
    image: data.image ?? undefined,
    readingTime: data.readingTime ?? estimateReadingTime(content),
    contentHtml: processedContent.toString(),
  }
}
