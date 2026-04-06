import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

export default function RelatedArticles({ articles }: { articles: ArticleMeta[] }) {
  if (!articles.length) return null

  return (
    <section className="mt-16 pt-12 border-t border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
        <h2 className="text-lg font-black text-white uppercase tracking-wider">
          Related Articles
        </h2>
      </div>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/blog/${a.slug}`}
              className="group block h-full bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-red-600/40 hover:bg-[#141414] transition-all duration-200"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                {a.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-3">
                {a.description}
              </p>
              <span className="text-xs font-semibold text-red-500 group-hover:text-red-400">
                Read more →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
