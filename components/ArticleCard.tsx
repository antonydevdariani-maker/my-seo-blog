import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import TagPills from '@/components/TagPills'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <div className="group flex flex-col bg-[#111111] border border-white/5 rounded-xl p-6 hover:border-red-600/40 hover:bg-[#161616] transition-all duration-200">
      <Link href={`/blog/${article.slug}`} className="block flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
          <time className="text-xs text-gray-500 font-medium">{formatDate(article.date)}</time>
        </div>

        <h2 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4">
          {article.description}
        </p>

        <div className="flex items-center gap-1.5 text-red-500 text-sm font-semibold group-hover:gap-2.5 transition-all">
          Read article
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      <TagPills tags={article.tags} className="mt-4 pt-4 border-t border-white/5" />
    </div>
  )
}
