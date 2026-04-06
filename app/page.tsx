import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'AutoRank — The Car Mod Authority',
  description:
    'Expert car modification guides, tuning tips, and performance upgrades from AutoRank — your authoritative source for automotive content.',
}

export default function HomePage() {
  const articles = getAllArticles()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
            Expert Automotive Content
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-5 leading-none">
          The Car Mod{' '}
          <span className="text-red-600">Authority</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Performance upgrades, tuning guides, and modification reviews written by experts.
          Everything you need to build your dream machine.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Article Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-24 text-gray-600">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <p className="text-lg font-medium text-gray-700">No articles yet.</p>
          <p className="text-sm text-gray-600 mt-1">Drop MDX files into content/articles/ to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
