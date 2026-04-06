/** URL segment for /tag/[tag] — lowercase kebab-case. */
export function slugifyTag(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/['']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 64) || 'tag'
  )
}

/** Pretty label for headings (e.g. cold-air-intake → Cold Air Intake). */
export function formatTagLabel(tagOrSlug: string): string {
  return tagOrSlug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}
