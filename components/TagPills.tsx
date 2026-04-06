import Link from 'next/link'
import { formatTagLabel, slugifyTag } from '@/lib/tag-utils'

const pillClass =
  'text-[11px] font-semibold px-2.5 py-1 rounded-full bg-red-600/15 border border-red-600/35 text-red-400 hover:bg-red-600/25 hover:border-red-500/50 transition-colors'

export default function TagPills({
  tags,
  className = '',
}: {
  tags: string[]
  className?: string
}) {
  if (!tags.length) return null

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => {
        const href = `/tag/${slugifyTag(tag)}`
        return (
          <Link key={`${href}-${tag}`} href={href} className={pillClass}>
            {formatTagLabel(slugifyTag(tag))}
          </Link>
        )
      })}
    </div>
  )
}
