import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-autorank-domain.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...articleEntries,
  ]
}
