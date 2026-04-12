import React from 'react'

export default function DevScoreCard({ profile, scoreData, onClose }) {
  if (!profile || !scoreData) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-on-surface-variant hover:text-primary font-mono text-xs uppercase tracking-widest flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            Close
          </button>
        )}

        {/* Gradient border glow wrapper */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#8cfece] via-[#54fcd8] to-[#3db489] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />

          <div className="relative bg-[#161b22] rounded-xl p-8 teal-bloom border border-primary/20">
            {/* Header branding */}
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  Terminal v1.0
                </span>
                <div className="text-xl font-extrabold tracking-tighter text-primary uppercase font-syne">
                  DevPulse
                </div>
              </div>
              <div className="bg-surface-container px-3 py-1 border-l-2 border-primary">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase">
                  Certified: {new Date().getFullYear()}.Q{Math.ceil((new Date().getMonth() + 1) / 3)}
                </span>
              </div>
            </div>

            {/* Profile identity */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5 mb-10">
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-primary/30 p-1 bg-surface-container-low">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary-container font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow-lg uppercase">
                  VERIFIED
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="font-mono text-sm text-primary mb-[-6px] ml-1">
                  @{profile.login}
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight font-syne text-on-surface">
                  {profile.name || profile.login}
                </h1>
              </div>
            </div>

            {/* Score hero */}
            <div className="flex flex-col items-center justify-center py-6 mb-8 border-y border-white/5 bg-surface-container-low/50 rounded-lg">
              <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Aggregate Developer Score
              </div>
              <div className="flex items-baseline justify-center gap-2">
                <span
                  className="text-7xl font-extrabold font-syne tracking-tighter"
                  style={{ color: scoreData.grade.color }}
                >
                  {scoreData.score}
                </span>
                <span className="text-2xl font-bold font-mono text-on-surface-variant">/ 100</span>
              </div>
              <div className="mt-4">
                <span
                  className="px-6 py-1.5 rounded-full font-syne font-extrabold text-sm tracking-widest uppercase italic text-on-primary-container"
                  style={{ backgroundColor: scoreData.grade.color }}
                >
                  {scoreData.grade.label}
                </span>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="space-y-4 mb-10">
              {scoreData.breakdown.map(item => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-secondary">{item.icon}</span>
                      <span className="font-mono text-[11px] uppercase text-on-surface">{item.label}</span>
                    </div>
                    <span className="font-mono text-[11px] text-primary">{item.pts} pts</span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-1000"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTAs */}
            <div className="flex flex-col items-center gap-4 pt-5 border-t border-white/5">
              <p className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                Share your Dev Score
              </p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-sm text-on-surface">share</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-sm text-on-surface">download</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-2 rounded-lg kinetic-gradient text-on-primary font-syne font-bold text-xs uppercase tracking-widest active:scale-95 transition-all">
                  Claim Badge
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative chips */}
        <div className="hidden lg:block absolute top-[15%] -left-24 obsidian-glass border border-white/10 px-4 py-2 rounded-lg transform -rotate-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-mono text-[10px] text-on-surface uppercase">Top 1% Activity</span>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-[20%] -right-24 obsidian-glass border border-white/10 px-4 py-2 rounded-lg transform rotate-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-[10px] text-on-surface uppercase">
              {scoreData.langs[0] || 'Fullstack'} Specialist
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
