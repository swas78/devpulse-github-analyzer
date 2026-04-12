import React from 'react'

const NAV_ITEMS = [
  { id: 'overview', icon: 'grid_view', label: 'Overview' },
  { id: 'repositories', icon: 'terminal', label: 'Repositories' },
  { id: 'projects', icon: 'account_tree', label: 'Projects' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
]

export default function SideNav({ activeItem = 'repositories', onItemClick, onNewScan }) {
  return (
    <aside className="hidden lg:flex flex-col h-full w-64 fixed left-0 top-0 pt-24 pb-8 px-4 bg-[#0f141a] border-r-4 border-[#8cfece] z-40">
      {/* Brand */}
      <div className="mb-10 px-4">
        <h2 className="text-xl font-bold text-[#8cfece] font-mono tracking-widest uppercase">DevPulse</h2>
        <p className="text-[10px] text-[#f1f3fc]/40 font-mono mt-1">Terminal v1.0</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(item => {
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={`w-full flex items-center gap-3 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-200 active:translate-x-1 ${
                isActive
                  ? 'text-[#8cfece] font-bold bg-[#20262f]/50 border-l-4 border-[#8cfece] pl-3'
                  : 'text-[#f1f3fc]/60 hover:text-[#f1f3fc] hover:bg-[#20262f] px-4'
              }`}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Deploy Button */}
      <div className="mt-4 mx-0 space-y-4">
        <button
          onClick={onNewScan}
          className="w-full py-3 bg-[#8cfece] text-[#006146] font-bold rounded-lg active:translate-x-1 duration-200 uppercase text-[10px] tracking-widest font-mono hover:bg-[#54fcd8] transition-colors"
        >
          Deploy New Scan
        </button>
        <div className="border-t border-outline-variant/20 pt-4 space-y-2">
          <button className="flex items-center gap-3 px-4 py-2 text-[#f1f3fc]/40 hover:text-[#8cfece] font-mono text-[10px] uppercase w-full transition-colors">
            <span className="material-symbols-outlined text-sm">help_outline</span>
            <span>Support</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-[#f1f3fc]/40 hover:text-[#8cfece] font-mono text-[10px] uppercase w-full transition-colors">
            <span className="material-symbols-outlined text-sm">code</span>
            <span>API Docs</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
