import React from 'react'
import { formatNumber, getLanguageDistribution, langColor } from '../utils/calculateDevScore'

export default function ProfileCard({ profile, scoreData }) {
  const langDist = getLanguageDistribution(
    scoreData?.langs?.map(l => ({ language: l })) || []
  )

  return (
    <section className="space-y-4">
      {/* Profile Identity Card */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#8cfece]/5 blur-2xl -mr-10 -mt-10" />
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-[72px] h-[72px] rounded-full border-2 border-[#8cfece] object-cover"
            />
            {scoreData && (
              <div className="absolute -bottom-1 -right-1 bg-[#8cfece] text-[#00291b] text-[8px] font-bold font-mono px-1.5 py-0.5 rounded uppercase">
                {scoreData.grade.label}
              </div>
            )}
          </div>

          {/* Name + username */}
          <h1 className="text-lg font-bold text-on-surface font-syne mb-0.5">
            {profile.name || profile.login}
          </h1>
          <p className="text-[#8cfece] font-mono text-xs lowercase tracking-tighter">
            @{profile.login}
          </p>

          {/* Bio */}
          {profile.bio && (
            <p className="text-on-surface-variant text-xs mt-3 leading-relaxed font-syne">
              {profile.bio}
            </p>
          )}

          {/* Location / Blog */}
          {(profile.location || profile.blog) && (
            <div className="mt-3 space-y-1">
              {profile.location && (
                <p className="text-on-surface-variant text-[10px] font-mono flex items-center gap-1 justify-center">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {profile.location}
                </p>
              )}
              {profile.blog && (
                <a
                  href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8cfece] text-[10px] font-mono flex items-center gap-1 justify-center hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">link</span>
                  {profile.blog.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { val: formatNumber(profile.followers), label: 'Followers' },
            { val: formatNumber(profile.following), label: 'Following' },
            { val: formatNumber(profile.public_repos), label: 'Repos' },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center p-2 bg-surface-container rounded border border-[#30363d]">
              <span className="text-primary font-mono text-sm font-bold">{val}</span>
              <span className="text-[9px] uppercase font-mono text-on-surface-variant">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dev Score Card */}
      {scoreData && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <h3 className="text-[10px] font-mono uppercase text-on-surface-variant tracking-widest mb-4">
            DevPulse Score
          </h3>
          <div className="flex items-center gap-4 mb-4">
            {/* Score Ring */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#20262f" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={scoreData.grade.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - scoreData.score / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg"
                style={{ color: scoreData.grade.color }}
              >
                {scoreData.score}
              </div>
            </div>
            <div>
              <div
                className="text-xl font-extrabold font-syne uppercase tracking-widest"
                style={{ color: scoreData.grade.color }}
              >
                {scoreData.grade.label}
              </div>
              <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
                Dev Score / 100
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Stack */}
      {scoreData && scoreData.langs.length > 0 && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
          <h3 className="text-[10px] font-mono uppercase text-on-surface-variant tracking-widest mb-3">
            Stack Composition
          </h3>
          {/* Segmented bar */}
          <div className="flex h-2 rounded-full overflow-hidden mb-3 bg-surface-container">
            {getLanguageDistribution(scoreData.langs.map(l => ({ language: l }))).map(({ lang, pct }) => (
              <div
                key={lang}
                style={{ width: `${pct}%`, backgroundColor: langColor(lang) }}
                className="h-full transition-all duration-500"
              />
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {getLanguageDistribution(scoreData.langs.map(l => ({ language: l }))).map(({ lang, pct }) => (
              <div key={lang} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: langColor(lang) }} />
                <span className="text-[10px] font-mono text-on-surface-variant">{lang} {pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
