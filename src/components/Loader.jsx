import React from 'react'

function SkeletonBlock({ className }) {
  return <div className={`skeleton-pulse rounded ${className}`} />
}

export default function Loader() {
  return (
    <div className="pt-32 pb-20 pl-4 lg:pl-72 pr-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 animate-pulse">
      {/* Left column skeleton */}
      <div className="space-y-6">
        <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary-dim space-y-4">
          <div className="flex flex-col items-center space-y-3">
            <SkeletonBlock className="w-20 h-20 rounded-full" />
            <SkeletonBlock className="w-32 h-5" />
            <SkeletonBlock className="w-24 h-4 opacity-50" />
            <SkeletonBlock className="w-full h-16" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <SkeletonBlock className="h-14 rounded-lg" />
            <SkeletonBlock className="h-14 rounded-lg" />
            <SkeletonBlock className="h-14 rounded-lg" />
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl space-y-3">
          <SkeletonBlock className="w-28 h-4" />
          <SkeletonBlock className="w-full h-20 rounded-lg" />
          <SkeletonBlock className="w-full h-6 rounded-full" />
        </div>
      </div>

      {/* Right column skeleton */}
      <div className="space-y-4">
        <div className="flex gap-3 mb-6">
          <SkeletonBlock className="flex-1 h-10 rounded-lg" />
          <SkeletonBlock className="w-32 h-10 rounded-lg" />
          <SkeletonBlock className="w-32 h-10 rounded-lg" />
        </div>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-surface-container-high rounded-xl p-5 space-y-3 border border-outline-variant/20">
            <SkeletonBlock className="w-48 h-5" />
            <SkeletonBlock className="w-full h-4 opacity-60" />
            <div className="flex gap-4">
              <SkeletonBlock className="w-16 h-5 rounded-full" />
              <SkeletonBlock className="w-16 h-5 rounded-full" />
              <SkeletonBlock className="w-20 h-5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
