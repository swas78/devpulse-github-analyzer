import React, { useState, useEffect, useRef, useCallback } from 'react'
import ProfileCard from '../components/ProfileCard'
import RepoCard from '../components/RepoCard'
import FilterSort from '../components/FilterSort'
import DevScoreCard from '../components/DevScoreCard'
import { calculateDevScore } from '../utils/calculateDevScore'

const PAGE_SIZE = 15

export default function ResultsPage({ profile, repos, onNewSearch }) {
  const [filteredRepos, setFilteredRepos] = useState(repos)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [showScoreCard, setShowScoreCard] = useState(false)
  const sentinelRef = useRef(null)

  const scoreData = calculateDevScore(profile, repos)

  // Reset pagination when filter changes
  const handleFiltered = useCallback(result => {
    setFilteredRepos(result)
    setVisibleCount(PAGE_SIZE)
  }, [])

  // IntersectionObserver — infinite scroll (bonus feature)
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + PAGE_SIZE)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [filteredRepos])

  const visibleRepos = filteredRepos.slice(0, visibleCount)
  const hasMore = visibleCount < filteredRepos.length

  return (
    <>
      {/* Dev Score Card modal */}
      {showScoreCard && (
        <DevScoreCard
          profile={profile}
          scoreData={scoreData}
          onClose={() => setShowScoreCard(false)}
        />
      )}

      <main className="pt-32 pb-20 pl-4 lg:pl-72 pr-6 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">

        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <ProfileCard profile={profile} scoreData={scoreData} />

          {/* View Score Card button */}
          {scoreData && (
            <button
              onClick={() => setShowScoreCard(true)}
              className="w-full kinetic-gradient text-on-primary font-syne font-bold py-3 rounded-lg uppercase tracking-widest text-xs active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">monitoring</span>
              View Score Card
            </button>
          )}

          {/* Back to search */}
          <button
            onClick={onNewSearch}
            className="w-full border border-outline-variant/40 text-on-surface-variant hover:text-primary hover:border-primary font-mono text-[10px] py-2.5 rounded-lg uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            New Search
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <section className="space-y-4 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-syne text-xl font-bold text-on-surface">
                Repositories
              </h2>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                {filteredRepos.length} result{filteredRepos.length !== 1 ? 's' : ''}
                {filteredRepos.length !== repos.length && ` of ${repos.length}`}
              </p>
            </div>
            <div className="font-mono text-[10px] text-on-surface-variant uppercase">
              @{profile.login}
            </div>
          </div>

          {/* Filter + Sort controls */}
          <FilterSort repos={repos} onFiltered={handleFiltered} />

          {/* Repo list */}
          {filteredRepos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-4">
                search_off
              </span>
              <p className="font-mono text-on-surface-variant text-sm uppercase tracking-widest">
                No repositories found
              </p>
              <p className="font-syne text-on-surface-variant/50 text-xs mt-2">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleRepos.map((repo, idx) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  isPinned={idx < 3 && filteredRepos === repos}
                />
              ))}

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div ref={sentinelRef} className="py-4 text-center">
                  <span className="font-mono text-[10px] text-on-surface-variant/40 uppercase tracking-widest animate-pulse">
                    Loading more...
                  </span>
                </div>
              )}

              {!hasMore && filteredRepos.length > PAGE_SIZE && (
                <div className="py-4 text-center">
                  <span className="font-mono text-[10px] text-on-surface-variant/30 uppercase tracking-widest">
                    — End of repositories —
                  </span>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
