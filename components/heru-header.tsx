"use client"

import Link from "next/link"

export function HeruHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-gradient-gold">
            <span className="text-background font-bold text-sm">Ⓗ</span>
          </div>
          <span className="font-display text-xl font-semibold text-foreground group-hover:text-accent-gold transition-smooth">
            Heru AI
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <a href="#" className="text-foreground-muted hover:text-accent-gold transition-smooth text-sm">
            Platform
          </a>
          <a href="#" className="text-foreground-muted hover:text-accent-gold transition-smooth text-sm">
            Advisors
          </a>
          <a href="#" className="text-foreground-muted hover:text-accent-gold transition-smooth text-sm">
            Resources
          </a>
        </nav>
      </div>
    </header>
  )
}
