import React from 'react'

export default function ErrorState({ type, username, onRetry }) {
  const isNotFound = type === 'NOT_FOUND'
  const isRateLimit = type === 'RATE_LIMIT'
  const isInvalidToken = type === 'INVALID_TOKEN'
  const isNetworkError = type === 'NETWORK_ERROR'
  const systemStateLabel = isRateLimit || isInvalidToken || isNetworkError ? 'API_FAULT' : 'USER_FAULT'

  return (
    <div className="pt-32 pb-20 pl-4 lg:pl-72 pr-8 max-w-[1440px] mx-auto flex items-center justify-center min-h-screen">
      <div className="max-w-xl w-full">
        {/* Terminal header */}
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary/70 mb-4">
          &gt; SYSTEM_STATE // {systemStateLabel}
        </div>

        {/* Error heading */}
        <h2
          className={`font-syne text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 uppercase ${
            isRateLimit || isInvalidToken || isNetworkError ? 'text-error' : 'text-on-surface'
          }`}
        >
          {isNotFound && 'User not found'}
          {isRateLimit && 'API limit reached'}
          {isInvalidToken && 'Invalid GitHub token'}
          {isNetworkError && 'Connection problem'}
          {!isNotFound && !isRateLimit && !isInvalidToken && !isNetworkError && 'Something went wrong'}
        </h2>

        {/* Description */}
        <p className="font-mono text-on-surface-variant text-sm mb-8 leading-relaxed">
          {isNotFound && (
            <>
              No GitHub user found for{' '}
              <span className="text-primary font-bold">"{username}"</span>.
              <br />
              Check the spelling and try again.
            </>
          )}
          {isRateLimit && (
            <>
              GitHub API rate limit exceeded (60 req/hour unauthenticated).
              <br />
              Add a{' '}
              <span className="text-primary">VITE_GITHUB_TOKEN</span> in your{' '}
              <span className="text-secondary">.env</span> file for 5,000 req/hour.
            </>
          )}
          {isInvalidToken && (
            <>
              The value in <span className="text-primary">VITE_GITHUB_TOKEN</span> is not valid.
              <br />
              Remove it, leave it blank, or replace it with a real GitHub personal access token.
            </>
          )}
          {isNetworkError && (
            <>
              The app could not reach the GitHub API.
              <br />
              Check your internet connection, VPN, firewall, or browser privacy extensions and try again.
            </>
          )}
          {!isNotFound && !isRateLimit && !isInvalidToken && !isNetworkError && 'An unexpected error occurred. Please try again.'}
        </p>

        {/* Error code badge */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest border ${
              isRateLimit
                ? 'border-error/40 text-error bg-error-container/20'
                : isInvalidToken || isNetworkError
                ? 'border-error/40 text-error bg-error-container/20'
                : 'border-outline-variant/40 text-on-surface-variant bg-surface-container-low'
            }`}
          >
            ERROR_CODE: {isNotFound ? '404' : isRateLimit ? '403' : isInvalidToken ? '401' : isNetworkError ? 'NET' : '500'}
          </div>
          <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onRetry}
            className="kinetic-gradient text-on-primary font-syne font-bold px-8 py-3 rounded-lg uppercase tracking-widest text-sm active:scale-95 transition-all duration-200"
          >
            Try Again
          </button>
          {(isRateLimit || isInvalidToken) && (
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/40 text-primary font-mono text-xs px-8 py-3 rounded-lg uppercase tracking-widest hover:bg-primary/10 transition-all duration-200"
            >
              Get Token ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
