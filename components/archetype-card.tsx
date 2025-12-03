"use client"

import type { WealthArchetype } from "@/lib/wealth-archetypes"
import { SacredGeometryFrame } from "./sacred-geometry-frame"

interface ArchetypeCardProps {
  archetype: WealthArchetype
  confidence?: number
  isActive?: boolean
  onClick?: () => void
}

export function ArchetypeCard({ archetype, confidence = 85, isActive = false, onClick }: ArchetypeCardProps) {
  return (
    <SacredGeometryFrame
      className={`cursor-pointer transition-all transform ${
        isActive ? "scale-105 ring-2 ring-accent-gold" : "hover:scale-102"
      }`}
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-5xl mb-3">{archetype.emoji}</div>
          <h3 className="text-2xl font-display font-bold text-foreground">{archetype.name}</h3>
          {confidence && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-surface-alt rounded overflow-hidden">
                <div className="h-full bg-gradient-gold" style={{ width: `${confidence}%` }} />
              </div>
              <span className="text-sm text-accent-gold font-semibold">{confidence}%</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-foreground-muted leading-relaxed text-sm">{archetype.description}</p>

        {/* Core Traits */}
        <div className="space-y-2 pt-2 border-t border-border-light">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest">Core Traits</p>
          <div className="flex flex-wrap gap-2">
            {archetype.coreTraits.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-semibold"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Money Energy Pattern */}
        <div className="bg-surface-alt rounded p-3 italic text-sm text-foreground-muted border-l-2 border-accent-gold">
          "{archetype.moneyEnergyPattern}"
        </div>

        {/* Ideal Asset Style */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-widest">Ideal Asset Vehicles</p>
          <ul className="space-y-1">
            {archetype.idealAssetStyle.map((asset) => (
              <li key={asset} className="text-sm text-foreground flex gap-2">
                <span className="text-accent-gold">→</span>
                <span>{asset}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SacredGeometryFrame>
  )
}
