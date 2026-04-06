import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTagSlugs, getArticlesByTagSlug } from '@/lib/articles'
import { formatTagLabel, slugifyTag } from '@/lib/tag-utils'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: { tag: string }
}

export async function generateStaticParams() {
  return getAllTagSlugs().map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = formatTagLabel(params.tag)
  return {
    title: `${label} — Articles`,
    description: `AutoRank articles tagged ${label.toLowerCase()}.`,
  }
}

export default function TagPage({ params }: Props) {
  const normalized = slugifyTag(params.tag)
  const articles = getArticlesByTagSlug(normalized)

  if (articles.length === 0) {
    notFound()
  }

  const heading = formatTagLabel(normalized)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/25 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Tag</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Articles tagged:{' '}
          <span className="text-red-600">{heading}</span>
        </h1>
        <p className="text-gray-500 text-sm uppercase tracking-widest">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      <div className="h-px bg-white/10 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
