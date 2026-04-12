import React, { useState, useEffect } from 'react'
import { useThrottle } from '../hooks/useThrottle'

export default function HomePage({ onSearch, loading }) {
  const [username, setUsername] = useState('')

  // Restore last searched username from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dp-last-username')
    if (saved) setUsername(saved)
  }, [])

  const handleSearch = useThrottle(() => {
    if (!username.trim()) return
    localStorage.setItem('dp-last-username', username.trim())
    onSearch(username.trim())
  }, 500)

  const handleKey = e => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <>
      {/* Main canvas */}
      <main className="min-h-screen pt-32 pb-20 px-8 max-w-[1440px] mx-auto flex flex-col items-center justify-center">

        {/* Hero search section */}
        <div className="w-full max-w-3xl text-center mb-16 relative">
          {/* Ambient glows */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Hero heading */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 font-syne leading-none">
            <span className="block text-outline-variant opacity-20">DECODE.</span>
            <span className="block text-primary">ANALYZE.</span>
            <span className="block text-on-surface">OPTIMIZE.</span>
          </h1>

          <p className="font-mono text-on-surface-variant text-sm uppercase tracking-[0.2em] mb-12">
            Quantum Reputation Metrics for the Modern Dev
          </p>

          {/* Search interface */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-focus-within:opacity-100 transition duration-500 blur" />
            <div className="relative flex flex-col md:flex-row items-stretch bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/30">
              {/* Terminal icon */}
              <div className="flex items-center px-6 border-r border-outline-variant/30 bg-surface-container-low">
                <span className="material-symbols-outlined text-primary">terminal</span>
              </div>

              {/* Input */}
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Search a GitHub username..."
                className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface py-5 px-6 font-mono text-base placeholder:text-on-surface-variant/40 outline-none"
                disabled={loading}
              />

              {/* Analyze button */}
              <button
                onClick={handleSearch}
                disabled={loading || !username.trim()}
                className="bg-primary-container text-on-primary-container hover:bg-primary transition-all duration-300 font-bold px-10 py-5 uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed font-syne text-sm"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    Scanning...
                  </>
                ) : (
                  <>
                    Analyze
                    <span className="material-symbols-outlined text-base">bolt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Empty state illustration */}
          <div className="mt-20 flex flex-col items-center opacity-80">
            <div className="w-64 h-64 mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary/20 border-dashed rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-32 h-32 border border-secondary/40 rounded-lg rotate-45 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute w-16 h-16 bg-primary/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl animate-pulse">monitoring</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
            </div>
            <h3 className="font-mono text-primary text-xs uppercase tracking-widest mb-2">System Ready</h3>
            <p className="font-syne text-on-surface-variant font-medium text-sm">
              Enter a username to generate their Dev Score
            </p>
          </div>
        </div>

        {/* Metric artifacts bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4 opacity-50 pointer-events-none">
          <div className="bg-surface-container-low p-8 rounded-lg border-l-4 border-primary">
            <div className="font-mono text-primary text-[10px] mb-4">LATEST_SCAN_0x01</div>
            <div className="font-syne text-2xl font-bold mb-2">98.4%</div>
            <div className="font-mono text-on-surface-variant text-[10px] uppercase tracking-tighter">Contribution Consistency</div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-lg">
            <div className="font-mono text-primary text-[10px] mb-4">GLOBAL_PULSE</div>
            <div className="font-syne text-2xl font-bold mb-2">42ms</div>
            <div className="font-mono text-on-surface-variant text-[10px] uppercase tracking-tighter">API Response Latency</div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-lg border-r-4 border-secondary">
            <div className="font-mono text-primary text-[10px] mb-4">ACTIVE_NODES</div>
            <div className="font-syne text-2xl font-bold mb-2">12,049</div>
            <div className="font-mono text-on-surface-variant text-[10px] uppercase tracking-tighter">Verified Developers</div>
          </div>
        </div>
      </main>
    </>
  )
}
