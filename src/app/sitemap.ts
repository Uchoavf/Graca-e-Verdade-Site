import type { MetadataRoute } from "next";
import { getSortedPosts, getCategories } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gracaeverdade.com.br";
  const buildDate = new Date();

  const posts = await getSortedPosts();
  const categories = await getCategories();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: buildDate, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: buildDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/categorias`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/biblia`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/aconselhamento`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/sobre`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/loja`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contato`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.4 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categorias/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}
