import React from 'react'

export default function TopNav({ activePage = 'dashboard', onNavClick }) {
  const links = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'pulse', label: 'Pulse' },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0e14] border-b-4 border-[#8cfece]">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#8cfece] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            pulse_alert
          </span>
          <span className="text-2xl font-extrabold tracking-tighter text-[#8cfece] uppercase font-syne">
            DevPulse
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => onNavClick?.(link.id)}
              className={`uppercase tracking-widest text-xs font-mono transition-colors duration-300 ${
                activePage === link.id
                  ? 'text-[#8cfece] font-bold border-b-2 border-[#8cfece] pb-1'
                  : 'text-[#f1f3fc] font-medium hover:text-[#54fcd8]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button className="material-symbols-outlined text-[#f1f3fc] hover:text-[#8cfece] transition-colors duration-300 active:scale-95">
            dark_mode
          </button>
          <button className="material-symbols-outlined text-[#f1f3fc] hover:text-[#8cfece] transition-colors duration-300 active:scale-95">
            notifications
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-[#8cfece] overflow-hidden bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[#8cfece] text-xl">person</span>
          </div>
        </div>
      </nav>
    </header>
  )
}
