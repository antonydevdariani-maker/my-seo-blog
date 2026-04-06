import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors">
              AutoRank
            </span>
            <p className="text-[10px] text-gray-500 leading-none font-medium tracking-widest uppercase">
              The Car Mod Authority
            </p>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
          >
            Articles
          </Link>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
          >
            Guides
          </a>
          <a
            href="#"
            className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded font-semibold transition-colors"
          >
            Subscribe
          </a>
        </nav>

        <button className="sm:hidden text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
