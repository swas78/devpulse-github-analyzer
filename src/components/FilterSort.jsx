import React, { useState, useMemo, useEffect } from 'react'

/**
 * FilterSort.jsx
 * All filtering and sorting uses Array HOFs — .filter() and .sort()
 * NO for/while loops.
 */
export default function FilterSort({ repos, onFiltered }) {
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('')
  const [sortBy, setSortBy] = useState('stars')

  // .map() + Set — build unique language list
  const languages = useMemo(
    () => [...new Set(repos.map(r => r.language).filter(Boolean))].sort(),
    [repos]
  )

  const filteredAndSortedRepos = useMemo(() => {
    // Step 1: .filter() by search query
    const searched = repos.filter(r =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description || '').toLowerCase().includes(search.toLowerCase())
    )

    // Step 2: .filter() by language
    const filtered = searched.filter(r => !language || r.language === language)

    // Step 3: .sort() by selected criterion
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
      if (sortBy === 'forks') return b.forks_count - a.forks_count
      if (sortBy === 'updated') return new Date(b.pushed_at) - new Date(a.pushed_at)
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

    return sorted
  }, [repos, search, language, sortBy])

  // Notify parent after render when filtered results change
  useEffect(() => {
    onFiltered(filteredAndSortedRepos)
  }, [filteredAndSortedRepos, onFiltered])

  const inputBase =
    'bg-surface-container-low border border-outline-variant/30 focus:border-primary text-on-surface font-mono text-xs uppercase tracking-wider rounded-lg px-4 py-2.5 outline-none transition-colors duration-200'

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      {/* Search */}
      <div className="flex-1 relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search repositories..."
          className={`${inputBase} pl-9 w-full`}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Language filter */}
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className={`${inputBase} min-w-[140px] cursor-pointer`}
      >
        <option value="">All languages</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className={`${inputBase} min-w-[140px] cursor-pointer`}
      >
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Last updated</option>
        <option value="name">Name A–Z</option>
      </select>
    </div>
  )
}
