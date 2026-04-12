import React from 'react'
import { langColor, formatNumber, timeAgo } from '../utils/calculateDevScore'

export default function RepoCard({ repo, isPinned = false }) {
  return (
    <article
      className={`group relative bg-[#161b22] border border-[#30363d] rounded-xl p-5 hover:border-[#8cfece]/40 transition-all duration-300 cursor-pointer ${
        isPinned ? 'border-t-2 border-t-primary-dim' : ''
      }`}
      style={isPinned ? { borderTop: '2px solid #7defc0' } : {}}
      onClick={() => window.open(repo.html_url, '_blank')}
    >
      {/* Teal left accent bar on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-xl" />

      {/* Repo name */}
      <h2 className="text-[#8cfece] font-mono font-bold text-base tracking-tight group-hover:underline mb-1 truncate">
        {repo.name}
      </h2>

      {/* Description */}
      {repo.description && (
        <p className="text-on-surface-variant text-xs font-syne leading-relaxed mb-3 line-clamp-2">
          {repo.description}
        </p>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 mt-2">
        {/* Language chip */}
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: langColor(repo.language) }}
            />
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
              {repo.language}
            </span>
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1">
          <span
            className="material-symbols-outlined text-secondary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-mono text-[10px] text-on-surface-variant">
            {formatNumber(repo.stargazers_count)}
          </span>
        </div>

        {/* Forks */}
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">
            fork_right
          </span>
          <span className="font-mono text-[10px] text-on-surface-variant">
            {formatNumber(repo.forks_count)}
          </span>
        </div>

        {/* Last updated */}
        <span className="font-mono text-[10px] text-on-surface-variant/50 ml-auto">
          {timeAgo(repo.pushed_at)}
        </span>
      </div>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {repo.topics.slice(0, 4).map(topic => (
            <span
              key={topic}
              className="bg-surface-container-highest text-[#8cfece] font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
