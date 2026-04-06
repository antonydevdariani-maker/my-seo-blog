import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { slugifyTag } from '@/lib/tag-utils'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  keywords: string[]
  /** Topic tags for related posts and /tag/[tag] pages */
  tags: string[]
}

export interface Article extends ArticleMeta {
  content: string
}

function parseTagsField(data: Record<string, unknown>): string[] {
  const raw = data.tags
  if (Array.isArray(raw)) {
    return raw
      .filter((t): t is string => typeof t === 'string')
      .map((t) => t.trim())
      .filter(Boolean)
  }
  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }
  return []
}

function normalizeTags(tags: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const t of tags) {
    const s = slugifyTag(t)
    if (!seen.has(s)) {
      seen.add(s)
      out.push(s)
    }
  }
  return out
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDirectory)) return []

  const files = fs.readdirSync(articlesDirectory)

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(articlesDirectory, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)
      const slug = (data.slug as string) || file.replace(/\.mdx$/, '')
      const tags = normalizeTags(parseTagsField(data as Record<string, unknown>))

      return {
        slug,
        title: (data.title as string) || 'Untitled',
        description: (data.description as string) || '',
        date: (data.date as string) || '',
        keywords: Array.isArray(data.keywords)
          ? data.keywords.filter((k): k is string => typeof k === 'string')
          : [],
        tags,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const tags = normalizeTags(parseTagsField(data as Record<string, unknown>))

  return {
    slug: (data.slug as string) || slug,
    title: (data.title as string) || 'Untitled',
    description: (data.description as string) || '',
    date: (data.date as string) || '',
    keywords: Array.isArray(data.keywords)
      ? data.keywords.filter((k): k is string => typeof k === 'string')
      : [],
    tags,
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) return []
  return fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

/** Unique tag URL slugs across all articles. */
export function getAllTagSlugs(): string[] {
  const articles = getAllArticles()
  const set = new Set<string>()
  for (const a of articles) {
    for (const t of a.tags) {
      set.add(slugifyTag(t))
    }
  }
  return Array.from(set).sort()
}

export function getArticlesByTagSlug(tagSlug: string): ArticleMeta[] {
  const normalized = slugifyTag(tagSlug)
  return getAllArticles().filter((a) =>
    a.tags.some((t) => slugifyTag(t) === normalized),
  )
}

/**
 * Other articles that share at least one tag (by slugified tag), excluding current slug.
 */
export function getRelatedArticles(
  currentSlug: string,
  tags: string[],
  limit = 3,
): ArticleMeta[] {
  if (!tags.length) return []

  const tagSet = new Set(tags.map((t) => slugifyTag(t)))
  const others = getAllArticles().filter((a) => a.slug !== currentSlug)

  const scored = others
    .map((article) => {
      const overlap = article.tags.filter((t) => tagSet.has(slugifyTag(t))).length
      return { article, overlap }
    })
    .filter((x) => x.overlap > 0)
    .sort(
      (a, b) =>
        b.overlap - a.overlap ||
        new Date(b.article.date).getTime() - new Date(a.article.date).getTime(),
    )

  return scored.slice(0, limit).map((x) => x.article)
}
