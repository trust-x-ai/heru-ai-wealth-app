"use client"

import type { WealthProfile } from "@/lib/wealth-profiling"
import type { WellnessScore } from "@/lib/wellness-scoring"
import { SacredGeometryFrame } from "./sacred-geometry-frame"

interface WealthSummaryCardProps {
  wealthProfile: WealthProfile
  wellnessScores: WellnessScore
  overallWellnessScore: number
  archetypeName: string
}

export function WealthSummaryCard({
  wealthProfile,
  wellnessScores,
  overallWellnessScore,
  archetypeName,
}: WealthSummaryCardProps) {
  return (
    <SacredGeometryFrame>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Total Assets */}
          <div className="space-y-1">
            <p className="text-xs text-foreground-muted uppercase tracking-widest">Total Assets</p>
            <p className="text-2xl font-display font-bold text-accent-gold">
              HKD {(wealthProfile.totalAssets / 1000000).toFixed(1)}M
            </p>
          </div>

          {/* Annual Income */}
          <div className="space-y-1">
            <p className="text-xs text-foreground-muted uppercase tracking-widest">Annual Income</p>
            <p className="text-2xl font-display font-bold text-accent-gold">
              HKD {(wealthProfile.annualIncome / 1000).toFixed(0)}K
            </p>
          </div>

          {/* Time Horizon */}
          <div className="space-y-1">
            <p className="text-xs text-foreground-muted uppercase tracking-widest">Time Horizon</p>
            <p className="text-lg font-display font-bold text-foreground capitalize">{wealthProfile.timeHorizon}</p>
          </div>

          {/* Risk Appetite */}
          <div className="space-y-1">
            <p className="text-xs text-foreground-muted uppercase tracking-widest">Risk Appetite</p>
            <p className="text-lg font-display font-bold text-foreground">{wealthProfile.riskAppetite}</p>
          </div>
        </div>

        <div className="border-t border-border-light pt-4 space-y-3">
          <p className="text-sm font-semibold text-foreground-muted uppercase tracking-widest">Your Profile</p>
          <p className="text-lg font-display font-semibold text-foreground">{archetypeName}</p>
          <p className="text-sm text-foreground-muted">
            Wellness Score: <span className="text-accent-gold font-bold">{overallWellnessScore}</span>/100
          </p>
        </div>
      </div>
    </SacredGeometryFrame>
  )
}
