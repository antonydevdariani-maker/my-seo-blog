import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import RelatedArticles from '@/components/RelatedArticles'
import TagPills from '@/components/TagPills'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      tags: article.tags.length ? article.tags : article.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)

  if (!article) notFound()

  const related = getRelatedArticles(article.slug, article.tags, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'AutoRank',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AutoRank',
    },
    keywords: [...article.tags, ...article.keywords].join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-10 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All articles
        </Link>

        {/* Article header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <time className="text-sm text-gray-500 font-medium">{formatDate(article.date)}</time>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">
            {article.title}
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed">{article.description}</p>

          <TagPills tags={article.tags} className="mt-6" />
        </header>

        <hr className="border-white/10 mb-10" />

        {/* Article content */}
        <article className="prose prose-invert prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-li:text-gray-300
          prose-strong:text-white
          prose-a:text-red-500 prose-a:no-underline hover:prose-a:text-red-400
          prose-blockquote:border-l-red-600 prose-blockquote:text-gray-400 prose-blockquote:not-italic
          prose-code:text-red-400 prose-code:bg-red-600/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-[#111111] prose-pre:border prose-pre:border-white/10">
          <MDXRemote source={article.content} />
        </article>

        <RelatedArticles articles={related} />

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-[#111111] border border-white/10 rounded-xl text-center">
          <h3 className="text-lg font-bold text-white mb-2">More Car Mod Guides</h3>
          <p className="text-gray-500 text-sm mb-4">
            Explore all our expert articles on performance upgrades and tuning.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            Browse all articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}
