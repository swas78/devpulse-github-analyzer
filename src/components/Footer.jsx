import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-[#0a0e14] border-t border-[#f1f3fc]/10 opacity-60">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1440px] mx-auto font-mono text-[10px] uppercase tracking-widest">
        <div className="mb-4 md:mb-0 text-[#f1f3fc]/40">
          © 2024 DevPulse Terminal. All rights reserved.
        </div>
        <div className="flex gap-8">
          {['Privacy', 'Security', 'Terms', 'Status'].map(link => (
            <a key={link} href="#" className="text-[#f1f3fc]/40 hover:text-[#8cfece] transition-colors duration-300">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
