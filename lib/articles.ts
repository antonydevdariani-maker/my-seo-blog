import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  keywords: string[]
}

export interface Article extends ArticleMeta {
  content: string
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

      return {
        slug,
        title: (data.title as string) || 'Untitled',
        description: (data.description as string) || '',
        date: (data.date as string) || '',
        keywords: (data.keywords as string[]) || [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug: (data.slug as string) || slug,
    title: (data.title as string) || 'Untitled',
    description: (data.description as string) || '',
    date: (data.date as string) || '',
    keywords: (data.keywords as string[]) || [],
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
